import { Status } from "@prisma/client";
import { prisma } from "../config/prismaConnection.js";
import { Role } from "@prisma/client";
async function updateUserStatus(id: string, status: string): Promise<void> {
  await prisma.user.update({
    where: { id },
    data: { status: status.toUpperCase() as Status },
  });
}
async function fetchPendingUsers(): Promise<{ id: string; name: string; registerDate: Date }[]> {
  const pendingUsers = await prisma.user.findMany({
    where: { status: Status.PENDING },
    select: { id: true, name: true, registerDate: true },
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
