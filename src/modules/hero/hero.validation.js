import Joi from "joi";

export const updateHeroSchema = Joi.object({
  heroImage: Joi.string().uri().messages({ "string.uri": "Hero image must be a valid URL" }),
  cvUrl: Joi.string().uri().messages({ "string.uri": "CV must be a valid URL" }),
  showreelVideoUrl: Joi.string().uri().messages({ "string.uri": "Showreel video must be a valid URL" }),
  isAvailable: Joi.boolean(),
  badgeText: Joi.string().max(100).allow(""),
  description: Joi.string().max(500).allow(""),
}).min(1);