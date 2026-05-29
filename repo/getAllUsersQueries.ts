import {prisma} from "../config/prismaConnection.js";
import { Role } from "@prisma/client";
import {Status} from "@prisma/client";
async function getAllUsers(): Promise<{ id: string; name: string; servantPrepYear: string; status: string }[]> {
    const users = await prisma.user.findMany({
        where: {
            role: Role.USER,
            status: Status.APPROVED
        },
        select: {
            id: true,
            name: true,
            servantPrepYear: true,
            status: true,
        },
    });
    return users;
}
export { getAllUsers };