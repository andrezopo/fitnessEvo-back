import { Router } from "express";
import {
  insertFood,
  searchFood,
  upvoteFood,
} from "../controllers/foodController";
import validateSchema from "../middlewares/validateSchema";
import validateToken from "../middlewares/validateToken";
import foodSchema from "../schemas/foodSchema";

const foodRouter = Router();

foodRouter.post("/", validateSchema(foodSchema), validateToken, insertFood);

foodRouter.get("/:foodString", validateToken, searchFood);

foodRouter.post("/upvote/:id", validateToken, upvoteFood);

export default foodRouter;
