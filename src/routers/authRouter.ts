import { Router } from "express";
import { signIn, signUp } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/", signIn);

authRouter.post("/sign-up", signUp);

export default authRouter;
