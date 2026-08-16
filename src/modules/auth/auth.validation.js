import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().required().messages({
    "any.required": "password is required",
  }),
});

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    "any.required": "current password is required",
  }),
  newPassword: Joi.string().min(6).max(100).required().messages({
    "any.required": "new password is required",
    "string.min": "new password must be at least 6 characters long",
  }),
  confirmNewPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "new password and confirmation do not match",
    }),
});