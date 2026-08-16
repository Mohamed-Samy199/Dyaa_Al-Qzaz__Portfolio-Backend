import Joi from "joi";
import { ALLOWED_ICONS } from "../../models/AboutSection.model.js";

const skillSchema = Joi.object({
  icon: Joi.string().valid(...ALLOWED_ICONS).required(),
  title: Joi.string().max(60).required(),
  description: Joi.string().max(200).required(),
});

export const updateAboutSchema = Joi.object({
  label: Joi.string().max(60).allow(""),
  headingLine1: Joi.string().max(100).allow(""),
  headingHighlight: Joi.string().max(100).allow(""),
  bio: Joi.string().max(800),
  skills: Joi.array().items(skillSchema).max(6),
}).min(1);