import express from "express";
import { authController } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// http://localhost:3069/api/auth/signup
authRouter.post("/signup", authController.signup);

// http://localhost:3069/api/auth/signin
authRouter.post("/signin", authController.signin);

export default authRouter;