import joi from "joi";
import { CreatingFood } from "../types/foodType";

const foodSchema = joi.object<CreatingFood>({
  name: joi.string().required(),
  portionAmount: joi.number().integer().min(1).required(),
  calories: joi.number().integer().min(0).required(),
  protein: joi.number().min(0).required(),
  carbohydrate: joi.number().min(0).required(),
  fat: joi.number().min(0).required(),
});

export default foodSchema;
