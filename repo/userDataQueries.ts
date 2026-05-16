import { prisma } from "../config/prismaConnection.js";
import type { IUserDetails } from "../models/userData.ts";

async function fetchUserData(id: string): Promise<Partial<Omit<IUserDetails, 'password'>> | null> {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  const {password, ...userData} = user || {};
  return userData;
}
export { fetchUserData };
