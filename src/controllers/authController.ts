import { Request, Response } from "express";
import { User, SignInUser } from "../types/userType";
import * as authService from "../services/authService";

export async function signUp(req: Request, res: Response) {
  const user: User = req.body;
  await authService.signUp(user);
  res.status(201).send("User created successfully");
}

export async function signIn(req: Request, res: Response) {
  const user: SignInUser = req.body;
  const { token, name } = await authService.signIn(user);

  res.status(200).send({ email: user.email, token, name });
}
