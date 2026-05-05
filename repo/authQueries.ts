import { prisma } from "../prisma/config/prismaConnection.ts";
import type { IUserDetails } from "../models/userData.ts";
import type { IUser } from "../models/userData.ts";
import type { Prisma } from "@prisma/client";
import { Role, Status, Gender } from "@prisma/client";
async function insertUser(user: IUserDetails): Promise<IUser> {
  const insertedUser: Prisma.UserCreateInput = {
    ...user,
    role: Role.USER,
    status: Status.PENDING,
    gender: user.gender.toUpperCase() as Gender,
  };
  const { id, name, role, gender, servantPrepYear } = await prisma.user.create({
    data: insertedUser,
  });
  return { id, name, role, gender, servantPrepYear };
}

async function fetchUserByUsername(
  username: string,
): Promise<[IUser, string] | null> {
  const result = await prisma.user.findUnique({
    where: { userName: username },
    select: {
      id: true,
      name: true,
      role: true,
      gender: true,
      servantPrepYear: true,
      status: true,
      password: true,
    },
  });
  if (!result) return null;

  const { password, ...user } = result;
  return [user as IUser, password];
}
export { insertUser, fetchUserByUsername };
