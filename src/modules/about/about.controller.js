import * as aboutService from "./about.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getAbout = asyncHandler(async (req, res) => {
  const about = await aboutService.getAbout();
  return ApiResponse.ok(res, "About section fetched successfully.", { about });
});

export const updateAbout = asyncHandler(async (req, res) => {
  const about = await aboutService.updateAbout(req.body);
  return ApiResponse.ok(res, "About section updated successfully.", { about });
});