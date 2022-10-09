import { Request, Response } from "express";
import * as foodService from "../services/foodService";
import { CreatingFood } from "../types/foodType";

export async function insertFood(req: Request, res: Response) {
  const creatingFood: CreatingFood = req.body;

  const createdFood = await foodService.insertFood(creatingFood);

  res.status(201).send(createdFood);
}

export async function searchFood(req: Request, res: Response) {
  const foodString = req.params.foodString;

  const foods = await foodService.searchFood(foodString);

  res.status(200).send(foods);
}
