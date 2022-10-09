import prisma from "../config/database";
import { CreatingUserInfos } from "../types/userType";

export async function insertInfos(userInfos: CreatingUserInfos) {
  await prisma.userInfos.create({ data: userInfos });
}

export async function getInfos(userId: number) {
  return await prisma.userInfos.findUnique({ where: { userId } });
}

export async function updateInfos(userInfos: CreatingUserInfos) {
  const {
    calorieGoal,
    weight,
    activityLevel,
    objective,
    bodyFat,
    trainingExperience,
    proteinGoal,
    carbohydrateGoal,
    fatGoal,
  } = userInfos;
  await prisma.userInfos.update({
    where: { userId: userInfos.userId },
    data: {
      calorieGoal,
      proteinGoal,
      carbohydrateGoal,
      fatGoal,
      weight,
      activityLevel,
      objective,
      bodyFat,
      trainingExperience,
    },
  });
}
