// /routes/blog.routes.js

import express from "express";
import { createBlogPost, getBlogPosts, getProjectById, updateBlogPost, deleteBlogPost } from "../controllers/blog.controllers.js";
import authenicateJWT from "../middlewares/token.js";


const router = express.Router();

router.get("/", getBlogPosts);

router.get("/:id", getProjectById);

router.post("/", authenicateJWT, createBlogPost);

router.put("/:id", authenicateJWT, updateBlogPost);

router.delete("/:id", authenicateJWT, deleteBlogPost);

export default router;
