import prisma from "../config/database";
import { Meal } from "../types/mealType";

export async function insertMeal(meal: Omit<Meal, "date">) {
  return await prisma.meals.create({ data: meal });
}

export async function getTodayMeals(userId: number) {
  return await prisma.$queryRaw`
    SELECT * FROM meals as m WHERE m."userId" = ${userId} AND TO_CHAR(m."date", 'dd/mm/yyyy') = TO_CHAR(NOW()::date, 'dd/mm/yyyy')
    `;
}
