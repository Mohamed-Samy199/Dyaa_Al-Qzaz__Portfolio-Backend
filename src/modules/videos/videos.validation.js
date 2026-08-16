import Joi from "joi";

export const createProjectSchema = Joi.object({
  order: Joi.number().required(),
  title: Joi.string().max(150).required(),
  category: Joi.string().max(100).required(),
  image: Joi.string().uri().required(),
  video: Joi.string().uri().required(),
  tags: Joi.array().items(Joi.string().max(30)).max(6).default([]),
  year: Joi.string().max(4).required(),
});

export const updateProjectSchema = Joi.object({
  order: Joi.number(),
  title: Joi.string().max(150),
  category: Joi.string().max(100),
  image: Joi.string().uri(),
  video: Joi.string().uri(),
  tags: Joi.array().items(Joi.string().max(30)).max(6),
  year: Joi.string().max(4),
}).min(1);