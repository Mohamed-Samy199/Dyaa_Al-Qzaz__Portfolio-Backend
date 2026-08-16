import * as heroService from "./hero.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

// GET /api/hero — Public
export const getHero = asyncHandler(async (req, res) => {
  const hero = await heroService.getHero();
  return ApiResponse.ok(res, "Hero section fetched successfully.", { hero });
});

// PATCH /api/hero — Protected
export const updateHero = asyncHandler(async (req, res) => {
  const hero = await heroService.updateHero(req.body);
  return ApiResponse.ok(res, "Hero section updated successfully.", { hero });
});