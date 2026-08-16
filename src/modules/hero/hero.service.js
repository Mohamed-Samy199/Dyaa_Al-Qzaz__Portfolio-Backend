import HeroSection from "../../models/HeroSection.model.js";
import { findOne, findOneAndUpdate, create } from "../../db/database.repository.js";
import { ApiError } from "../../utils/ApiError.js";

// Public — بيانات الهيرو للموقع نفسه
export const getHero = async () => {
  const hero = await findOne({ model: HeroSection, options: { lean: true } });
  if (!hero) throw ApiError.notFound("Hero section not configured yet.");
  return hero;
};

// Protected — تحديث، أو إنشاء لو أول مرة (singleton)
export const updateHero = async (updates) => {
  const existing = await findOne({ model: HeroSection });

  if (!existing) {
    return await create({ model: HeroSection, data: updates });
  }

  return await findOneAndUpdate({
    model: HeroSection,
    filter: { _id: existing._id },
    update: { $set: updates },
  });
};