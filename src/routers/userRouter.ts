import { Router } from "express";
import {
  getUserinfos,
  insertUserInfos,
  updateUserInfos,
} from "../controllers/userController";
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

userRouter.get("/infos", validateToken, getUserinfos);

userRouter.put(
  "/infos",
  validateSchema(additionalInfoSchema),
  validateToken,
  updateUserInfos
);

export default userRouter;
