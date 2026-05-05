import { Status } from "@prisma/client";
import { prisma } from "../prisma/config/prismaConnection.ts";
async function updateUserStatus(id: string, status: string): Promise<void> {
  await prisma.user.update({
    where: { id },
    data: { status: status.toUpperCase() as Status },
  });
}
async function fetchPendingUsers(): Promise<{ id: string; name: string }[]> {
  const pendingUsers = await prisma.user.findMany({
    where: { status: Status.PENDING },
    select: { id: true, name: true },
  });
  return pendingUsers;
}

export { updateUserStatus, fetchPendingUsers };
