import Review from "../../models/Review.model.js";
import {
  find,
  findById,
  create,
  findByIdAndUpdate,
  findOneAndDelete,
} from "../../db/database.repository.js";
import { ApiError } from "../../utils/ApiError.js";

export const getAllReviews = async () => {
  return await find({
    model: Review,
    options: { sort: { order: 1 }, lean: true },
  });
};

export const getReviewById = async (id) => {
  const review = await findById({ model: Review, id, options: { lean: true } });
  if (!review) throw ApiError.notFound("Review not found.");
  return review;
};

export const createReview = async (data) => {
  return await create({ model: Review, data });
};

export const updateReview = async (id, updates) => {
  const review = await findByIdAndUpdate({ model: Review, id, update: updates });
  if (!review) throw ApiError.notFound("Review not found.");
  return review;
};

export const deleteReview = async (id) => {
  const review = await findOneAndDelete({ model: Review, filter: { _id: id } });
  if (!review) throw ApiError.notFound("Review not found.");
  return review;
};