import express from "express";
import { registerUser, loginUser, getUser, getDashboard } from "../controllers/user.controllers.js";
import { verifyToken } from "../middlewares/token.js";

const router = express.Router();


router.post("/register", registerUser);


router.post("/login", loginUser);


router.get("/user", verifyToken, getUser);


router.get("/dashboard", verifyToken, getDashboard);

export default router;
