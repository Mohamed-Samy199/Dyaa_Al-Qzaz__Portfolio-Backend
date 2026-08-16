import Joi from "joi";
import { ALLOWED_SKILL_ICONS } from "../../models/Skill.model.js";

const workItemSchema = Joi.object({
  title: Joi.string().max(150).required(),
  thumbnail: Joi.string().uri().required(),
  videoUrl: Joi.string().uri().allow(null, ""),
  videoFile: Joi.string().uri().allow(null, ""),
});

export const createSkillSchema = Joi.object({
  order: Joi.number().required(),
  label: Joi.string().max(60).required(),
  heading: Joi.string().max(60).required(),
  icon: Joi.string().valid(...ALLOWED_SKILL_ICONS).required(),
  works: Joi.array().items(workItemSchema).default([]),
});

export const updateSkillSchema = Joi.object({
  order: Joi.number(),
  label: Joi.string().max(60),
  heading: Joi.string().max(60),
  icon: Joi.string().valid(...ALLOWED_SKILL_ICONS),
  works: Joi.array().items(workItemSchema),
}).min(1);