import { Router } from "express";
import { insertUserInfos } from "../controllers/userController";
import validateSchema from "../middlewares/validateSchema";
import validateToken from "../middlewares/validateToken";
import additionalInfoSchema from "../schemas/additionalInfoSchema";

const userRouter = Router();

userRouter.post(
  "/infos",
  validateSchema(additionalInfoSchema),
  validateToken,
  insertUserInfos
);

export default userRouter;
