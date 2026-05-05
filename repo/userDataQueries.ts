import { prisma } from "../prisma/config/prismaConnection.ts";
import type { User } from "@prisma/client";

async function fetchUserData(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
}
export { fetchUserData };