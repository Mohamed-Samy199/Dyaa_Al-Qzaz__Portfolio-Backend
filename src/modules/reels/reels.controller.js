import * as reelsService from "./reels.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getAllReels = asyncHandler(async (req, res) => {
  const reels = await reelsService.getAllReels();
  return ApiResponse.ok(res, "Reels fetched successfully.", { reels });
});

export const getReelById = asyncHandler(async (req, res) => {
  const reel = await reelsService.getReelById(req.params.id);
  return ApiResponse.ok(res, "Reel fetched successfully.", { reel });
});

export const createReel = asyncHandler(async (req, res) => {
  const reel = await reelsService.createReel(req.body);
  return ApiResponse.created(res, "Reel created successfully.", { reel });
});

export const updateReel = asyncHandler(async (req, res) => {
  const reel = await reelsService.updateReel(req.params.id, req.body);
  return ApiResponse.ok(res, "Reel updated successfully.", { reel });
});

export const deleteReel = asyncHandler(async (req, res) => {
  await reelsService.deleteReel(req.params.id);
  return ApiResponse.noContent(res, "Reel deleted successfully.");
});