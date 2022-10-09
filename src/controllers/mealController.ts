import { Request, Response } from "express";
import { CreatingMeal } from "../types/mealType";
import * as mealService from "../services/mealService";

export async function insertMeal(req: Request, res: Response) {
  const meal: CreatingMeal = req.body;
  const userId: number = Number(res.locals.userId);

  const createdMeal = await mealService.insertMeal(meal, userId);

  res.status(201).send(createdMeal);
}
