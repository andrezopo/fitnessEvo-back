import { CreatingFood } from "../types/foodType";
import * as foodRepository from "../repositories/foodRepository";

export async function insertFood(food: CreatingFood) {
  const foodMacros = calculateMacrosPer100g(food);
  return await foodRepository.insertFood(foodMacros);
}

function calculateMacrosPer100g(food: CreatingFood) {
  const divisionFactor = food.portionAmount / 100;

  const proteinPer100g = food.protein / divisionFactor;
  const carbohydratePer100g = food.carbohydrate / divisionFactor;
  const fatPer100g = food.fat / divisionFactor;

  const caloriesPer100g = Math.round(
    (proteinPer100g + carbohydratePer100g) * 4 + fatPer100g * 9
  );

  const foodMacros = {
    ...food,
    calories: caloriesPer100g,
    protein: proteinPer100g,
    carbohydrate: carbohydratePer100g,
    fat: fatPer100g,
  };

  delete foodMacros.portionAmount;

  return foodMacros;
}
