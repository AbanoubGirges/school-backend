import { prisma } from "../config/prismaConnection.js";
import { Role, Status } from "@prisma/client";
async function insertUser(user) {
    const insertedUser = {
        ...user,
        role: Role.USER,
        status: Status.PENDING,
        gender: user.gender.toUpperCase(),
    };
    const { id, name, role, gender, servantPrepYear } = await prisma.user.create({
        data: insertedUser,
    });
    return { id, name, role, gender, servantPrepYear };
}
async function fetchUserByUsername(username) {
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
    if (!result)
        return null;
    const { password, ...user } = result;
    return [user, password];
}
export { insertUser, fetchUserByUsername };
