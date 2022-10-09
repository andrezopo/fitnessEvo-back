import joi from "joi";
import { CreatingMeal } from "../types/mealType";

const mealSchema = joi.object<CreatingMeal>({
  foodId: joi.number().integer().required(),
  amount: joi.number().integer().required(),
});

export default mealSchema;
