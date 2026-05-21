import {prisma} from "../config/prismaConnection.js";
async function getAllUsers(): Promise<{ id: string; name: string; servantPrepYear: string; status: string }[]> {
    const users = await prisma.user.findMany({
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