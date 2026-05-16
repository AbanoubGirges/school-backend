import { Status } from "@prisma/client";
import { prisma } from "../config/prismaConnection.ts";
import { Role } from "@prisma/client";
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
async function updateUserRole(id: string, role: string): Promise<void> {
  await prisma.user.update({
    where: { id },
    data: { role: role.toUpperCase() as Role },
  });
}
export { updateUserStatus, fetchPendingUsers, updateUserRole };
