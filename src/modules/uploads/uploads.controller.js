import * as uploadsService from "./uploads.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";

// POST /api/uploads — Protected — field name: "file"
export const uploadSingleFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw ApiError.badRequest("No file was uploaded.");
  }

  const result = await uploadsService.uploadToCloudinary(req.file);
  return ApiResponse.created(res, "File uploaded successfully.", result);
});