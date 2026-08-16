import Skill from "../../models/Skill.model.js";
import {
  find,
  findById,
  create,
  findByIdAndUpdate,
  findOneAndDelete,
} from "../../db/database.repository.js";
import { ApiError } from "../../utils/ApiError.js";

// Public — كل الكاتيجوريز مرتبة
export const getAllSkills = async () => {
  return await find({
    model: Skill,
    options: { sort: { order: 1 }, lean: true },
  });
};

// Public — كاتيجوري واحدة
export const getSkillById = async (id) => {
  const skill = await findById({ model: Skill, id, options: { lean: true } });
  if (!skill) throw ApiError.notFound("Skill category not found.");
  return skill;
};

// Protected — إنشاء كاتيجوري جديدة
export const createSkill = async (data) => {
  return await create({ model: Skill, data });
};

// Protected — تحديث كاتيجوري (بيانات أساسية أو الـ works كاملة)
export const updateSkill = async (id, updates) => {
  const skill = await findByIdAndUpdate({ model: Skill, id, update: updates });
  if (!skill) throw ApiError.notFound("Skill category not found.");
  return skill;
};

// Protected — حذف كاتيجوري
export const deleteSkill = async (id) => {
  const skill = await findOneAndDelete({ model: Skill, filter: { _id: id } });
  if (!skill) throw ApiError.notFound("Skill category not found.");
  return skill;
};