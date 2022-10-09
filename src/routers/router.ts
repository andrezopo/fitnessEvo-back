import { Router } from "express";
import authRouter from "./authRouter";
import foodRouter from "./foodRouter";
import userRouter from "./userRouter";

const router = Router();

router.use("/", authRouter);

router.use("/users", userRouter);

router.use("/foods", foodRouter);

export default router;
