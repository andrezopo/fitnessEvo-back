import prisma from "../config/database";
import { CreatingUserInfos } from "../types/userType";

export async function insertInfos(userInfos: CreatingUserInfos) {
  await prisma.userInfos.create({ data: userInfos });
}
