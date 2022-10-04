import joi from "joi";
import { SignInUser } from "../types/userType";

const userRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const signInSchema = joi.object<SignInUser>({
  email: joi.string().email().required(),
  password: joi.string().pattern(userRegex).required(),
});
