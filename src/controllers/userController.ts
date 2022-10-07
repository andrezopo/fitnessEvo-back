import { Request, Response } from "express";
import { UserAdditionalInfos } from "../types/userType";
import * as userService from "../services/userService";

export async function insertUserInfos(req: Request, res: Response) {
  const userInfos: UserAdditionalInfos = req.body;
  const userId: number = Number(res.locals.userId);

  const result = await userService.insertUserInfos(userInfos, userId);
  res.status(201).send(result);
}
