import { Router } from "express";
import { getTodayMeals, insertMeal } from "../controllers/mealController";
import validateSchema from "../middlewares/validateSchema";
import validateToken from "../middlewares/validateToken";
import mealSchema from "../schemas/mealSchema";

const mealRouter = Router();

mealRouter.post("/", validateSchema(mealSchema), validateToken, insertMeal);

mealRouter.get("/", validateToken, getTodayMeals);

export default mealRouter;
