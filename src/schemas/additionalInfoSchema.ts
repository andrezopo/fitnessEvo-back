import joi from "joi";
import { UserAdditionalInfos } from "../types/userType";

const additionalInfoSchema = joi.object<UserAdditionalInfos>({
  sex: joi.string().valid("male", "female").required(),
  age: joi.number().integer().min(1).required(),
  weight: joi.number().integer().min(1).required(),
  height: joi.number().integer().min(1).required(),
  activityLevel: joi
    .string()
    .valid(
      "sedentary",
      "lightly_active",
      "active",
      "very_active",
      "extremely_active"
    )
    .required(),
  trainingExperience: joi
    .string()
    .valid("beginner", "intermediate", "advanced", "athlete")
    .required(),
  objective: joi
    .string()
    .valid("fat_loss", "maintenance", "mass_gain")
    .required(),
  bodyFat: joi.number().integer().min(1),
});

export default additionalInfoSchema;
