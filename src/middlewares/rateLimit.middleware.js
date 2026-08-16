import rateLimit from "express-rate-limit";

export const generalLimiter = rateLimit({
  windowMs: 60 * 1000, // 
  max: 1000, // 
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "عدد الطلبات كبير جدًا، حاول تاني بعد قليل.",
  },
});   