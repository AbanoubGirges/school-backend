import {prisma} from "../config/prismaConnection.js";
import {Role} from "@prisma/client";
const makeAdmin = async (userId: string) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { role: Role.ADMIN },
  });
}
const removeAdmin = async (userId: string) => {
    await prisma.user.delete({
        where: { id: userId },
    });
}
export {makeAdmin, removeAdmin};