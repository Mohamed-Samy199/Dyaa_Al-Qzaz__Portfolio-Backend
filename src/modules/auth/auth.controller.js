import * as authService from "./auth.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

// POST /api/auth/login — Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.loginUser({ email, password });
  return ApiResponse.ok(res, "تم تسجيل الدخول بنجاح.", { user, token });
});

// POST /api/auth/logout — Protected
export const logout = asyncHandler(async (req, res) => {
  return ApiResponse.ok(res, "تم تسجيل الخروج بنجاح.");
});

// GET /api/auth/me — Protected
export const me = asyncHandler(async (req, res) => {
  const user = await authService.getMe(req.user._id);
  return ApiResponse.ok(res, "تم جلب بيانات المستخدم.", { user });
});

// PATCH /api/auth/change-password — Protected
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await authService.changePassword(req.user._id, { currentPassword, newPassword });
  return ApiResponse.ok(res, "تم تغيير كلمة السر بنجاح.", { user });
});