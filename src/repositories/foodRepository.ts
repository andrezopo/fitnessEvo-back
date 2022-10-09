import prisma from "../config/database";
import { Food } from "../types/foodType";

export async function insertFood(food: Food) {
  return await prisma.foods.create({ data: food });
}

export async function searchFood(searchString: string) {
  return await prisma.foods.findMany({
    where: { name: { contains: searchString, mode: "insensitive" } },
    orderBy: { votes: "desc" },
  });
}
