import Joi from "joi";

export const createReelSchema = Joi.object({
  order: Joi.number().required(),
  title: Joi.string().max(150).required(),
  category: Joi.string().max(100).required(),
  videoUrl: Joi.string().uri().required(),
  duration: Joi.string().max(10).required(),
});

export const updateReelSchema = Joi.object({
  order: Joi.number(),
  title: Joi.string().max(150),
  category: Joi.string().max(100),
  videoUrl: Joi.string().uri(),
  duration: Joi.string().max(10),
}).min(1);