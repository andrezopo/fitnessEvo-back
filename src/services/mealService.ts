import * as mealRepository from "../repositories/mealRepository";
import { CreatingMeal, Meal } from "../types/mealType";
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
  const meals: any = await mealRepository.getTodayMeals(userId);

  const totalMacros = { calories: 0, protein: 0, carbohydrate: 0, fat: 0 };

  const mealsTotalMacros = meals.reduce(
    (totalMacros: any, currentMeal: any) => {
      console.log(currentMeal);
      return {
        calories:
          totalMacros.calories +
          (currentMeal.calories * currentMeal.amount) / 100,
        protein:
          totalMacros.protein +
          (currentMeal.protein * currentMeal.amount) / 100,
        carbohydrate:
          totalMacros.carbohydrate +
          (currentMeal.carbohydrate * currentMeal.amount) / 100,
        fat: totalMacros.fat + (currentMeal.fat * currentMeal.amount) / 100,
      };
    },
    totalMacros
  );

  return { meals, mealsTotalMacros };
}
