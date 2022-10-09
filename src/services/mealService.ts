import * as mealRepository from "../repositories/mealRepository";
import { CreatingMeal } from "../types/mealType";
import dayjs from "dayjs";

export async function insertMeal(meal: CreatingMeal, userId: number) {
  const date = dayjs().subtract(3, "hours").toDate();
  const completeMeal = {
    ...meal,
    userId,
    date,
  };
  return await mealRepository.insertMeal(completeMeal);
}

export async function getTodayMeals(userId: number) {
  return await mealRepository.getTodayMeals(userId);
}
