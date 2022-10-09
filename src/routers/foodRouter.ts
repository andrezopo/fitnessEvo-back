import { Router } from "express";
import { insertFood, searchFood } from "../controllers/foodController";
import validateSchema from "../middlewares/validateSchema";
import validateToken from "../middlewares/validateToken";
import foodSchema from "../schemas/foodSchema";

const foodRouter = Router();

foodRouter.post("/", validateSchema(foodSchema), validateToken, insertFood);

foodRouter.get("/:foodString", validateToken, searchFood);

export default foodRouter;
