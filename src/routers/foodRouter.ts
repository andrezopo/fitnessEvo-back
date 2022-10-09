import { Router } from "express";
import { insertFood } from "../controllers/foodController";
import validateSchema from "../middlewares/validateSchema";
import validateToken from "../middlewares/validateToken";
import foodSchema from "../schemas/foodSchema";

const foodRouter = Router();

foodRouter.post("/", validateSchema(foodSchema), validateToken, insertFood);

export default foodRouter;
