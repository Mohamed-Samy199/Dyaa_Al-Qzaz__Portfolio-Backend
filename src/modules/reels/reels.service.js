import Reel from "../../models/Reel.model.js";
import {
  find,
  findById,
  create,
  findByIdAndUpdate,
  findOneAndDelete,
} from "../../db/database.repository.js";
import { ApiError } from "../../utils/ApiError.js";

export const getAllReels = async () => {
  return await find({
    model: Reel,
    options: { sort: { order: 1 }, lean: true },
  });
};

export const getReelById = async (id) => {
  const reel = await findById({ model: Reel, id, options: { lean: true } });
  if (!reel) throw ApiError.notFound("Reel not found.");
  return reel;
};

export const createReel = async (data) => {
  return await create({ model: Reel, data });
};

export const updateReel = async (id, updates) => {
  const reel = await findByIdAndUpdate({ model: Reel, id, update: updates });
  if (!reel) throw ApiError.notFound("Reel not found.");
  return reel;
};

export const deleteReel = async (id) => {
  const reel = await findOneAndDelete({ model: Reel, filter: { _id: id } });
  if (!reel) throw ApiError.notFound("Reel not found.");
  return reel;
};