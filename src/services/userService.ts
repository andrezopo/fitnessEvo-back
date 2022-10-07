import { UserAdditionalInfos } from "../types/userType";
import * as userRepository from "../repositories/userRepository";

export async function insertUserInfos(
  userInfos: UserAdditionalInfos,
  userId: number
) {
  let basalMethabolicRate = 0;
  let totalDailyEnergyExpenditure = 0;
  let activityFactor = 1;
  let carbPerKg = 0;
  switch (userInfos.activityLevel) {
    case "sedentary":
      activityFactor = 1.4;
      carbPerKg = 2.5;
      break;
    case "lightly_active":
      activityFactor = 1.6;
      carbPerKg = 3.5;
      break;
    case "active":
      activityFactor = 1.9;
      carbPerKg = 4.0;
      break;
    case "very_active":
      activityFactor = 2.2;
      carbPerKg = 4.5;
      break;
    default:
      activityFactor = 2.5;
      carbPerKg = 6.0;
  }
  if (userInfos.bodyFat === undefined) {
    if (userInfos.sex === "male") {
      basalMethabolicRate =
        userInfos.weight + 6.25 * userInfos.height - 5 * userInfos.age + 5;
    } else {
      basalMethabolicRate =
        userInfos.weight + 6.25 * userInfos.height - 5 * userInfos.age - 161;
    }
  } else {
    basalMethabolicRate =
      370 + 21.6 * (1 - userInfos.bodyFat / 100) * (userInfos.weight / 10);
  }
  totalDailyEnergyExpenditure = basalMethabolicRate * activityFactor;
  let proteinPerKg = 0;
  let calorieGoal = 0;

  switch (userInfos.objective && userInfos.trainingExperience) {
    case "fat_loss" && "athlete":
      proteinPerKg = 3.1;
      calorieGoal = Math.round(0.8 * totalDailyEnergyExpenditure);
      break;
    case "fat_loss" && "advanced":
      proteinPerKg = 2.8;
      calorieGoal = Math.round(0.8 * totalDailyEnergyExpenditure);
      break;
    case "fat_loss" && "intermediate":
      proteinPerKg = 2.5;
      calorieGoal = Math.round(0.8 * totalDailyEnergyExpenditure);
      break;
    case "fat_loss" && "beginner":
      proteinPerKg = 2.3;
      calorieGoal = Math.round(0.8 * totalDailyEnergyExpenditure);
      break;
    case "mass_gain" && "athlete":
      proteinPerKg = 2.4;
      calorieGoal = Math.round(1.4 * totalDailyEnergyExpenditure);
      break;
    case "mass_gain" && "advanced":
      proteinPerKg = 2.2;
      calorieGoal = Math.round(1.4 * totalDailyEnergyExpenditure);
      break;
    case "mass_gain" && "intermediate":
      proteinPerKg = 1.9;
      calorieGoal = Math.round(1.4 * totalDailyEnergyExpenditure);
      break;
    case "mass_gain" && "beginner":
      proteinPerKg = 1.6;
      calorieGoal = Math.round(1.4 * totalDailyEnergyExpenditure);
      break;
    case "maintenance" && "athlete":
      proteinPerKg = 2.0;
      calorieGoal = totalDailyEnergyExpenditure;
      break;
    case "maintenance" && "advanced":
      proteinPerKg = 1.8;
      calorieGoal = totalDailyEnergyExpenditure;
      break;
    case "maintenance" && "intermediate":
      proteinPerKg = 1.6;
      calorieGoal = totalDailyEnergyExpenditure;
      break;
    case "maintenance" && "beginner":
      proteinPerKg = 1.4;
      calorieGoal = totalDailyEnergyExpenditure;
      break;
  }

  const proteinGoal = Math.round(
    Number(((userInfos.weight / 10) * proteinPerKg).toFixed(2))
  );

  const carbohydrateGoal = Math.round(
    Number(((userInfos.weight / 10) * carbPerKg).toFixed(2))
  );

  const fatGoal = Math.round(
    Number(
      ((calorieGoal - (proteinGoal + carbohydrateGoal) * 4) / 9).toFixed(2)
    )
  );

  const userCompleteInfos = {
    userId,
    ...userInfos,
    calorieGoal,
    proteinGoal,
    carbohydrateGoal,
    fatGoal,
  };
  console.log(userCompleteInfos);

  await userRepository.insertInfos(userCompleteInfos);

  return userCompleteInfos;
}
