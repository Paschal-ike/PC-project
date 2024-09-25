import express from "express";
import { getProjects, getProjectById, createProject, updateProject, deleteProject } from "../controllers/portfolio.controllers.js";
import authenicateJWT  from "../middlewares/token.js";

const router = express.Router();

// Get portfolio data (projects, personal info, skills, etc.)
router.get("/", getProjects);  // Public route

// Get portfolio data (projects, personal info, skills, etc.)
router.get("/:id", getProjectById);  // Public route

// Add a new project (protected route for admin or user)
router.post("/project", authenicateJWT, createProject);

// Update an existing project (protected route for admin or user)
router.put("/project/:id", authenicateJWT, updateProject);

// Delete a project (protected route for admin or user)
router.delete("/project/:id", authenicateJWT, deleteProject);

export default router;
