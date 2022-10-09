import prisma from "../config/database";
import { Food } from "../types/foodType";

export async function insertFood(food: Food) {
  return await prisma.foods.create({ data: food });
}
