import { Request, Response } from "express";

export async function signUp(req: Request, res: Response) {
  res.status(200).send("Rota de cadastro");
}

export async function signIn(req: Request, res: Response) {
  res.status(200).send("Rota de login");
}
