import { ApiError } from "../../utils/ApiError.js";
import { generateToken } from "../../utils/generateToken.js";
import User from "../../models/User.model.js";
import { findOne, findById } from "../../db/database.repository.js";

// ── Login ─────────────────────────────────────────────────────────────────
export const loginUser = async ({ email, password }) => {
  const user = await findOne({
    model: User,
    filter: { email },
    select: "+password",
  });

  if (!user) {
    throw ApiError.unauthorized("البريد الإلكتروني أو كلمة السر غير صحيحة.");
  }

  if (!user.isActive) {
    throw ApiError.unauthorized("هذا الحساب معطّل.");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw ApiError.unauthorized("البريد الإلكتروني أو كلمة السر غير صحيحة.");
  }

  const token = generateToken(user._id);
  return { user: user.toSafeObject(), token };
};

// ── Get Current User ─────────────────────────────────────────────────────
export const getMe = async (userId) => {
  const user = await findById({ model: User, id: userId, options: { lean: true } });
  if (!user) throw ApiError.notFound("المستخدم غير موجود.");
  const { password, ...safeUser } = user;
  return safeUser;
};

// ── Change Password ──────────────────────────────────────────────────────
export const changePassword = async (userId, { currentPassword, newPassword }) => {
  const user = await findById({ model: User, id: userId, select: "+password" });
  if (!user) throw ApiError.notFound("المستخدم غير موجود.");

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) throw ApiError.unauthorized("كلمة السر الحالية غير صحيحة.");

  user.password = newPassword;
  await user.save();

  return user.toSafeObject();
};