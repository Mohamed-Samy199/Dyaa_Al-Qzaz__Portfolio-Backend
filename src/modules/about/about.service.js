import AboutSection from "../../models/AboutSection.model.js";
import { findOne, findOneAndUpdate, create } from "../../db/database.repository.js";
import { ApiError } from "../../utils/ApiError.js";

export const getAbout = async () => {
  const about = await findOne({ model: AboutSection, options: { lean: true } });
  if (!about) throw ApiError.notFound("About section not configured yet.");
  return about;
};

export const updateAbout = async (updates) => {
  const existing = await findOne({ model: AboutSection });

  if (!existing) {
    return await create({ model: AboutSection, data: updates });
  }

  return await findOneAndUpdate({
    model: AboutSection,
    filter: { _id: existing._id },
    update: { $set: updates },
  });
};