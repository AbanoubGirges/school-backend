import { prisma } from "../config/prismaConnection.js";
async function fetchUserData(id) {
    const user = await prisma.user.findUnique({
        where: { id },
    });
    const { password, ...userData } = user || {};
    return userData;
}
export { fetchUserData };
