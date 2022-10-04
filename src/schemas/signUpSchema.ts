import joi from "joi";
import { User } from "../types/userType";

const userRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const signUpSchema = joi.object<User>({
  email: joi.string().email().required(),
  password: joi.string().pattern(userRegex).required(),
  name: joi.string().required(),
});

export default signUpSchema;
