# Dyaa Al-Qzaz — Portfolio Backend API

A Node.js/Express/MongoDB REST API that powers the [Dyaa Al-Qzaz](#) motion designer portfolio site and its admin dashboard. Every section of the public site — Hero, About, Skills, Videos, AI Generative Reels, and Client Reviews — is fully manageable through this API, with media uploads handled via Cloudinary.

## ✨ Features

- **JWT authentication** for a single admin account (no public registration — the admin is created once via a seed script)
- **Modular, repository-pattern architecture** — each domain (auth, hero, about, skills, videos, reels, reviews, uploads) is a self-contained module with its own controller, service, validation, and routes
- **Full CRUD** for list-based sections (Skills, Videos, Reels, Reviews) with drag-and-drop reorder support
- **Singleton sections** (Hero, About) that store one editable document each
- **Cloudinary media uploads** (images, videos, PDFs) with automatic cleanup of replaced/deleted assets to avoid storage bloat
- **Centralized error handling** with consistent `ApiError` / `ApiResponse` shapes
- **Security hardening**: Helmet, CORS allow-list, rate limiting, Mongo sanitization, XSS sanitization
- **Joi validation** on every write endpoint

## 🧱 Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`) for auth
- Cloudinary (`cloudinary`, `multer`) for media storage
- Joi for request validation
- bcryptjs for password hashing

## 📁 Project Structure

```
src/
├── config/          # env config, cloudinary config
├── db/              # MongoDB connection + generic repository helpers
├── middlewares/      # auth, error handling, rate limiting, validation, uploads
├── models/           # Mongoose schemas (User, HeroSection, AboutSection, Skill, Project, Reel, Review)
├── modules/
│   ├── auth/         # login, logout, me, change-password
│   ├── hero/          # Hero section (singleton)
│   ├── about/         # About section (singleton)
│   ├── skills/         # Skills/services categories (CRUD + reorder)
│   ├── videos/         # Latest Projects carousel (CRUD + reorder)
│   ├── reels/          # AI Generative Film Reels (CRUD + reorder)
│   ├── reviews/        # Client testimonials (CRUD + reorder)
│   └── uploads/        # Cloudinary file upload endpoint
├── utils/            # ApiError, ApiResponse, asyncHandler, cloudinary helpers
├── app.bootstrap.js   # Express app setup
├── seed.js            # Creates the single admin user
└── main.js / index.js # Entry point
```

## 🔌 API Overview

| Module | Base Route | Access |
|---|---|---|
| Auth | `/api/auth` | `login` public; `logout`, `me`, `change-password` protected |
| Hero | `/api/hero` | `GET` public, `PATCH` protected |
| About | `/api/about` | `GET` public, `PATCH` protected |
| Skills | `/api/skills` | `GET` public, `POST`/`PATCH`/`DELETE`/`reorder` protected |
| Videos | `/api/videos` | `GET` public, `POST`/`PATCH`/`DELETE`/`reorder` protected |
| Reels | `/api/reels` | `GET` public, `POST`/`PATCH`/`DELETE`/`reorder` protected |
| Reviews | `/api/reviews` | `GET` public, `POST`/`PATCH`/`DELETE`/`reorder` protected |
| Uploads | `/api/uploads` | `POST` protected (multipart, field `file`) |

All protected routes require `Authorization: Bearer <token>`.

## ⚙️ Setup

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```

2. Create `src/config/.env` with:
   ```
   NODE_ENV=development
   DEVELOPMENT=development
   PORT=4000
   CLIENT_URL=http://localhost:5173

   MONGODB_URI=your-mongodb-connection-string

   JWT_SECRET=your-jwt-secret
   BEARER_KEY=Bearer
   JWT_EXPIRES_IN=7d

   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=choose-a-strong-password
   ```

3. Create the admin account (one-time):
   ```bash
   npm run seed
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:4000/api`, with a health check at `GET /api/health`.

## 🔐 Notes

- There is no public `/register` endpoint by design — this is a single-admin system.
- Media (images, videos, PDFs) is uploaded through `/api/uploads` first, returning a Cloudinary URL, which is then saved on the relevant section via its `PATCH`/`POST` endpoint.