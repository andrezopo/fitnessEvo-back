import prisma from "../config/database";
import { Meal } from "../types/mealType";
import { Meals } from "@prisma/client";

export async function insertMeal(meal: Omit<Meal, "date">) {
  return await prisma.meals.create({ data: meal });
}

export async function getTodayMeals(userId: number) {
  return await prisma.$queryRaw`
    SELECT f.name, m.amount, f.calories, f.protein, f.carbohydrate, f.fat FROM meals as m JOIN foods f ON m."foodId" = f."id" WHERE m."userId" = ${userId} AND TO_CHAR(m."date", 'dd/mm/yyyy') = TO_CHAR(NOW()::date, 'dd/mm/yyyy')
    `;
}
