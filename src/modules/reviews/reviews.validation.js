import Joi from "joi";

export const createReviewSchema = Joi.object({
  order: Joi.number().required(),
  image: Joi.string().uri().required(),
  alt: Joi.string().max(200).required(),
  platform: Joi.string().max(50).required(),
  rating: Joi.number().min(1).max(5).default(5),
});

export const updateReviewSchema = Joi.object({
  order: Joi.number(),
  image: Joi.string().uri(),
  alt: Joi.string().max(200),
  platform: Joi.string().max(50),
  rating: Joi.number().min(1).max(5),
}).min(1);