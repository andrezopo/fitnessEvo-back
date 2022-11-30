import { Users, UserInfos } from "@prisma/client";

export type User = Omit<Users, "id">;

export type SignInUser = Omit<User, "name">;

export type UserAdditionalInfos = Omit<
  UserInfos,
  | "id"
  | "userId"
  | "calorieGoal"
  | "proteinGoal"
  | "fatGoal"
  | "carbohydrateGoal"
>;

export type CreatingUserInfos = Omit<UserInfos, "id">;

export type UserGoals = {
  calorieGoal: number;
  proteinGoal: number;
  carbohydrateGoal: number;
  fatGoal: number;
};
