import { Router } from "express";
import { insertMeal } from "../controllers/mealController";
import validateSchema from "../middlewares/validateSchema";
import validateToken from "../middlewares/validateToken";
import mealSchema from "../schemas/mealSchema";

const mealRouter = Router();

mealRouter.post("/", validateSchema(mealSchema), validateToken, insertMeal);

export default mealRouter;
