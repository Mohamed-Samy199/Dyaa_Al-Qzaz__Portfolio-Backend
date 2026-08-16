import Project from "../../models/Project.model.js";
import {
  find,
  findById,
  create,
  findByIdAndUpdate,
  findOneAndDelete,
} from "../../db/database.repository.js";
import { ApiError } from "../../utils/ApiError.js";

export const getAllProjects = async () => {
  return await find({
    model: Project,
    options: { sort: { order: 1 }, lean: true },
  });
};

export const getProjectById = async (id) => {
  const project = await findById({ model: Project, id, options: { lean: true } });
  if (!project) throw ApiError.notFound("Project not found.");
  return project;
};

export const createProject = async (data) => {
  return await create({ model: Project, data });
};

export const updateProject = async (id, updates) => {
  const project = await findByIdAndUpdate({ model: Project, id, update: updates });
  if (!project) throw ApiError.notFound("Project not found.");
  return project;
};

export const deleteProject = async (id) => {
  const project = await findOneAndDelete({ model: Project, filter: { _id: id } });
  if (!project) throw ApiError.notFound("Project not found.");
  return project;
};