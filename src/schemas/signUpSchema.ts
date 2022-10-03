import joi from "joi";
import { Users } from "@prisma/client";

type User = Omit<Users, "id">;

const userRegex = /^abcd$/;

const signUpSchema = joi.object<User>({
  email: joi.string().email().required(),
  password: joi.string().pattern(userRegex).required(),
  name: joi.string().required(),
});
