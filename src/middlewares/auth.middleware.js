import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.model.js";
import {
  BEARER_KEY,
  JWT_SECRET
} from "../config/env.config.js";

/**
 * protect — verifies the JWT and attaches the user to req.user.
 * Must be used before any route that requires authentication.
 */
export const protect = asyncHandler(async (req, _res, next) => {
  // 1) جيب الـ token
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith(`${BEARER_KEY} `)) {
    throw ApiError.unauthorized("Not authenticated.");
  }

  const token = authHeader.split(" ")[1];
  if (!token) throw ApiError.unauthorized("Not authenticated.");

  // 2) Verify
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // فرق بين expired و invalid
    if (err.name === "TokenExpiredError") {
      throw ApiError.unauthorized("Session expired. Please login again.");
    }
    throw ApiError.unauthorized("Invalid token.");
  }

  // 3) تأكد إن الـ user لسه موجود وفعّال
  const user = await User.findById(decoded.id).select("+password");
  if (!user || !user.isActive) {
    throw ApiError.unauthorized("Account not found or deactivated.");
  }

  // مانسيبش الباسورد يتسرب حتى لو select شغال داخليًا
  user.password = undefined;

  req.user = user;
  next();
});

/**
 * restrictTo — role-based access control عام.
 * Usage: router.delete("/users/:id", protect, restrictTo("admin"), ...)
 */
export const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    throw ApiError.forbidden("You do not have permission to perform this action.");
  }
  next();
};


/**
 * socketAuth — نسخة مطابقة للـ protect لكن لـ socket.io handshake
 * (متستخدمش هنا مباشرة، بس متسيبة كمرجع؛ الـ sockets/index.js بيعمل نفس المنطق).
 */
export const socketAuth = async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Unauthorized"));

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) return next(new Error("Unauthorized"));

    socket.user = user;
    next();
  } catch {
    next(new Error("Unauthorized"));
  }
};