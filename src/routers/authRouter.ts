import { Router } from "express";
import { signIn, signUp } from "../controllers/authController";
import validateSchema from "../middlewares/validateSchema";
import signInSchema from "../schemas/signInSchema";
import signUpSchema from "../schemas/signUpSchema";

const authRouter = Router();

authRouter.post("/sign-in", validateSchema(signInSchema), signIn);

authRouter.post("/sign-up", validateSchema(signUpSchema), signUp);

export default authRouter;
