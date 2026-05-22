import { Status } from "@prisma/client";
import { prisma } from "../config/prismaConnection.js";
async function updateUserStatus(id, status) {
    await prisma.user.update({
        where: { id },
        data: { status: status.toUpperCase() },
    });
}
async function fetchPendingUsers() {
    const pendingUsers = await prisma.user.findMany({
        where: { status: Status.PENDING },
        select: { id: true, name: true, registerDate: true },
    });
    return pendingUsers;
}
async function updateUserRole(id, role) {
    await prisma.user.update({
        where: { id },
        data: { role: role.toUpperCase() },
    });
}
export { updateUserStatus, fetchPendingUsers, updateUserRole };
