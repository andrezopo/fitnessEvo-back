import { UserAdditionalInfos, UserGoals } from "../types/userType";
import * as userRepository from "../repositories/userRepository";

export async function insertUserInfos(
  userInfos: UserAdditionalInfos,
  userId: number
) {
  const { calorieGoal, proteinGoal, carbohydrateGoal, fatGoal } =
    calculateUserGoals(userInfos);

  const userCompleteInfos = {
    userId,
    ...userInfos,
    calorieGoal,
    proteinGoal,
    carbohydrateGoal,
    fatGoal,
  };

  await userRepository.insertInfos(userCompleteInfos);

  return userCompleteInfos;
}

export async function getUserinfos(userId: number) {
  return await userRepository.getInfos(userId);
}

export async function updateUserInfos(
  userInfos: UserAdditionalInfos,
  userId: number
) {
  const { calorieGoal, proteinGoal, carbohydrateGoal, fatGoal } =
    calculateUserGoals(userInfos);

  const userCompleteInfos = {
    userId,
    ...userInfos,
    calorieGoal,
    proteinGoal,
    carbohydrateGoal,
    fatGoal,
  };

  await userRepository.updateInfos(userCompleteInfos);

  return userCompleteInfos;
}

function calculateUserGoals(userInfos: UserAdditionalInfos) {
  let basalMethabolicRate = 0;
  let totalDailyEnergyExpenditure = 0;
  let activityFactor = 1;
  let carbPerKg = 0;
  switch (userInfos.activityLevel) {
    case "sedentary":
      activityFactor = 1.3;
      carbPerKg = 2.5;
      break;
    case "lightly_active":
      activityFactor = 1.5;
      carbPerKg = 3.5;
      break;
    case "active":
      activityFactor = 1.7;
      carbPerKg = 4.5;
      break;
    case "very_active":
      activityFactor = 1.9;
      carbPerKg = 5.5;
      break;
    default:
      activityFactor = 2.2;
      carbPerKg = 7.0;
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
  switch (userInfos.trainingExperience) {
    case "athlete":
      switch (userInfos.objective) {
        case "fat_loss":
          proteinPerKg = 3.1;
          calorieGoal = Math.round(0.8 * totalDailyEnergyExpenditure);
          break;
        case "mass_gain":
          proteinPerKg = 2.4;
          calorieGoal = Math.round(1.1 * totalDailyEnergyExpenditure);
          break;
        case "maintenance":
          proteinPerKg = 2.0;
          calorieGoal = totalDailyEnergyExpenditure;
          break;
      }
      break;

    case "advanced":
      switch (userInfos.objective) {
        case "fat_loss":
          proteinPerKg = 2.8;
          calorieGoal = Math.round(0.8 * totalDailyEnergyExpenditure);
          break;
        case "mass_gain":
          proteinPerKg = 2.2;
          calorieGoal = Math.round(1.1 * totalDailyEnergyExpenditure);
          break;
        case "maintenance":
          proteinPerKg = 1.8;
          calorieGoal = Math.round(totalDailyEnergyExpenditure);
          break;
      }
      break;
    case "intermediate":
      switch (userInfos.objective) {
        case "fat_loss":
          proteinPerKg = 2.5;
          calorieGoal = Math.round(0.8 * totalDailyEnergyExpenditure);
          break;
        case "mass_gain":
          proteinPerKg = 1.9;
          calorieGoal = Math.round(1.1 * totalDailyEnergyExpenditure);
          break;
        case "maintenance":
          proteinPerKg = 1.6;
          calorieGoal = Math.round(totalDailyEnergyExpenditure);
          break;
      }
    case "beginner":
      switch (userInfos.objective) {
        case "fat_loss":
          proteinPerKg = 2.3;
          calorieGoal = Math.round(0.8 * totalDailyEnergyExpenditure);
          break;
        case "mass_gain":
          proteinPerKg = 1.6;
          calorieGoal = Math.round(1.1 * totalDailyEnergyExpenditure);
          break;
        case "maintenance":
          proteinPerKg = 1.4;
          calorieGoal = Math.round(totalDailyEnergyExpenditure);
          break;
      }
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
  const userGoals: UserGoals = {
    calorieGoal,
    proteinGoal,
    carbohydrateGoal,
    fatGoal,
  };

  if (userGoals.fatGoal <= 0) {
    const minimumFatGoal = 20;
    const caloriesToExchange = userGoals.fatGoal * -1 * 9 + minimumFatGoal * 9;
    userGoals.carbohydrateGoal -= Number((caloriesToExchange / 4).toFixed(2));
    userGoals.fatGoal = minimumFatGoal;
  }

  return userGoals;
}
