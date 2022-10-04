import { Users } from "@prisma/client";

export type User = Omit<Users, "id">;

export type SignInUser = Omit<User, "name">;
