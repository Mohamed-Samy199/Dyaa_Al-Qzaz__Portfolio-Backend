import * as reviewsService from "./reviews.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await reviewsService.getAllReviews();
  return ApiResponse.ok(res, "Reviews fetched successfully.", { reviews });
});

export const getReviewById = asyncHandler(async (req, res) => {
  const review = await reviewsService.getReviewById(req.params.id);
  return ApiResponse.ok(res, "Review fetched successfully.", { review });
});

export const createReview = asyncHandler(async (req, res) => {
  const review = await reviewsService.createReview(req.body);
  return ApiResponse.created(res, "Review created successfully.", { review });
});

export const updateReview = asyncHandler(async (req, res) => {
  const review = await reviewsService.updateReview(req.params.id, req.body);
  return ApiResponse.ok(res, "Review updated successfully.", { review });
});

export const deleteReview = asyncHandler(async (req, res) => {
  await reviewsService.deleteReview(req.params.id);
  return ApiResponse.noContent(res, "Review deleted successfully.");
});