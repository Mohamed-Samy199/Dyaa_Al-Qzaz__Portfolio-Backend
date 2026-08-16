import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss";

import errorMiddleware from "./middlewares/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import heroRoutes from "./modules/hero/hero.routes.js";
import aboutRoutes from "./modules/about/about.routes.js";
// import uploadsRoutes from "./modules/uploads/uploads.routes.js";
import skillsRoutes from "./modules/skills/skills.routes.js";
import videosRoutes from "./modules/videos/videos.routes.js";
import reelsRoutes from "./modules/reels/reels.routes.js";
import reviewsRoutes from "./modules/reviews/reviews.routes.js";
import uploadsRoutes from "./modules/uploads/uploads.routes.js";



import { ApiError } from "./utils/ApiError.js";
import { generalLimiter } from "./middlewares/rateLimit.middleware.js";

const app = express();

// ── Security & Parsing Middlewares ────────────────────────────────────────────
app.set("trust proxy", 1);
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"], // مفيش cloudinary أو أي دومين خارجي، كل الصور من السيرفر نفسه
      connectSrc: ["'self'"],
    },
  })
);

// ── XSS Prevention — sanitize body strings ────────────────────────────────────
app.use((req, _res, next) => {
  if (req.body) sanitizeObject(req.body);
  next();
});

const sanitizeObject = (obj) => {
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === "string") {
      obj[key] = xss(obj[key]);
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      sanitizeObject(obj[key]);
    }
  }
};

// ── CORS ──────────────────────────────────────────────────────────────────────
// الشبكة داخلية، لكن بنسيب الميكانيزم زي ما هو عشان لو اتغيرت الأجهزة/الـ ports
const ALLOWED_ORIGINS = [
  process.env.CLIENT_URL, // مثال: http://192.168.1.10:5173 على الشبكة الداخلية
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Postman / server-to-server
      if (ALLOWED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ── NoSQL Injection Prevention ─────────────────────────────────────────────────
app.use(mongoSanitize());

app.use("/api", generalLimiter);

if (process.env.NODE_ENV === process.env.DEVELOPMENT) {
  app.use(morgan("dev"));
}

// ── Routes ────────────────────────────────────────────────────────────────────

app.use("/api/auth", authRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/videos", videosRoutes);
app.use("/api/reels", reelsRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/uploads", uploadsRoutes);


// health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Dyaa Motion API is running." });
});

// catch-all for unknown routes
app.all("*", (req, res, next) => {
  next(ApiError.notFound(`Route ${req.originalUrl} not found.`));
});

// ── Global Error Handler (must be last) ───────────────────────────────────────

app.use(errorMiddleware);

export default app;