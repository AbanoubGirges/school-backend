import { prisma } from "../config/prismaConnection.js";
import { Role } from "@prisma/client";
import { Status } from "@prisma/client";
async function getUsersDidNotAttend(): Promise<{ id: string; name: string; servantPrepYear: string }[]> {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(startOfDay);
  endOfDay.setHours(23, 59, 59, 999);
  const usersDidNotAttend = await prisma.user.findMany({
    where: {
      role: Role.USER,
      status: Status.APPROVED,
      attendances: {
        none: {
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      },
    },
    select: { 
      id: true,
      name: true,
      servantPrepYear: true,
    },
  });
  return usersDidNotAttend;
}
export { getUsersDidNotAttend };
