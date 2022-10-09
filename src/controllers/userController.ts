import { Request, Response } from "express";
import { UserAdditionalInfos } from "../types/userType";
import * as userService from "../services/userService";

export async function insertUserInfos(req: Request, res: Response) {
  const userInfos: UserAdditionalInfos = req.body;
  const userId: number = Number(res.locals.userId);

  const result = await userService.insertUserInfos(userInfos, userId);
  res.status(201).send(result);
}

// export async function updateUserInfos(req: Request, res: Response){
//   const userInfos: UserAdditionalInfos = req.body;
//   const userId: number = Number(res.locals.userId);

// }

export async function getUserinfos(req: Request, res: Response) {
  const userId: number = Number(res.locals.userId);

  const userInfos = await userService.getUserinfos(userId);

  res.status(200).send(userInfos);
}
