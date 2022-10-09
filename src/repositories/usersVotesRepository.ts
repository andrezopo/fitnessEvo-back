import prisma from "../config/database";
import { UsersVotes } from "@prisma/client";

type UserVote = Omit<UsersVotes, "id">;

export async function insertUserVote(userVote: UserVote) {
  await prisma.usersVotes.create({ data: userVote });
}
