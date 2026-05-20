import { Router } from "express";
import { AuthService } from "./auth.services";
export const authRouter = Router();
const authService = new AuthService();
authRouter.post("/signup", authService.signup); 
authRouter.post("/signin", authService.signin);
