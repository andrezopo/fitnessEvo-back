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

export async function searchFoodById(id: number) {
  return await prisma.foods.findUnique({ where: { id } });
}

export async function upvoteById(foodId: number) {
  await prisma.foods.update({
    where: { id: foodId },
    data: { votes: { increment: 1 } },
  });
}

export async function downvoteById(foodId: number) {
  await prisma.foods.update({
    where: { id: foodId },
    data: { votes: { decrement: 1 } },
  });
}
