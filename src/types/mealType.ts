import { Meals } from "@prisma/client";

export type Meal = Omit<Meals, "id">;

export type CreatingMeal = Omit<Meals, "id" | "date" | "userId">;
