import * as videosService from "./videos.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await videosService.getAllProjects();
  return ApiResponse.ok(res, "Projects fetched successfully.", { projects });
});

export const getProjectById = asyncHandler(async (req, res) => {
  const project = await videosService.getProjectById(req.params.id);
  return ApiResponse.ok(res, "Project fetched successfully.", { project });
});

export const createProject = asyncHandler(async (req, res) => {
  const project = await videosService.createProject(req.body);
  return ApiResponse.created(res, "Project created successfully.", { project });
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await videosService.updateProject(req.params.id, req.body);
  return ApiResponse.ok(res, "Project updated successfully.", { project });
});

export const deleteProject = asyncHandler(async (req, res) => {
  await videosService.deleteProject(req.params.id);
  return ApiResponse.noContent(res, "Project deleted successfully.");
});