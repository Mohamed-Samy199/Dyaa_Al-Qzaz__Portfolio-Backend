import { Router } from "express";
import * as authController from "./auth.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { loginSchema, changePasswordSchema } from "./auth.validation.js";

const router = Router();

// ── Public ──────────────────────────────────────────────────
router.post("/login", validate(loginSchema), authController.login);

// ── Protected ───────────────────────────────────────────────
router.use(protect);
router.post("/logout", authController.logout);
router.get("/me", authController.me);
router.patch("/change-password", validate(changePasswordSchema), authController.changePassword);

export default router;