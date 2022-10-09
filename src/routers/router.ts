import { Router } from "express";
import authRouter from "./authRouter";
import foodRouter from "./foodRouter";
import mealRouter from "./mealRouter";
import userRouter from "./userRouter";

const router = Router();

router.use("/", authRouter);

router.use("/users", userRouter);

router.use("/foods", foodRouter);

router.use("/meals", mealRouter);

export default router;
