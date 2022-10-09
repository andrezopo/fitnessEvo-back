import { Foods } from "@prisma/client";

export type Food = Omit<Foods, "id" | "votes">;

export type CreatingFood = {
  name: string;
  portionAmount: number;
  calories: number;
  protein: number;
  carbohydrate: number;
  fat: number;
};
