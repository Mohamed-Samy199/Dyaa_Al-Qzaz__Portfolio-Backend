import * as skillsService from "./skills.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

// GET /api/skills — Public
export const getAllSkills = asyncHandler(async (req, res) => {
  const skills = await skillsService.getAllSkills();
  return ApiResponse.ok(res, "Skills fetched successfully.", { skills });
});

// GET /api/skills/:id — Public
export const getSkillById = asyncHandler(async (req, res) => {
  const skill = await skillsService.getSkillById(req.params.id);
  return ApiResponse.ok(res, "Skill fetched successfully.", { skill });
});

// POST /api/skills — Protected
export const createSkill = asyncHandler(async (req, res) => {
  const skill = await skillsService.createSkill(req.body);
  return ApiResponse.created(res, "Skill category created successfully.", { skill });
});

// PATCH /api/skills/:id — Protected
export const updateSkill = asyncHandler(async (req, res) => {
  const skill = await skillsService.updateSkill(req.params.id, req.body);
  return ApiResponse.ok(res, "Skill category updated successfully.", { skill });
});

// DELETE /api/skills/:id — Protected
export const deleteSkill = asyncHandler(async (req, res) => {
  await skillsService.deleteSkill(req.params.id);
  return ApiResponse.noContent(res, "Skill category deleted successfully.");
});