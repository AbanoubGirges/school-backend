import { PushNotification } from "@prisma/client";
import { prisma } from "../config/prismaConnection.js";
const createPushToken = async (
  userId: string,
  expoToken: string,
): Promise<PushNotification> => {
  return await prisma.pushNotification.create({
    data: {
      userId,
      expoToken,
    },
  });
};
const deletePushToken=async (
  userId:string,
)=>{
  return await prisma.pushNotification.delete({
    where:{
      userId,
    }
  });
};
const getAdminPushTokens = async (): Promise<{ id: string; pushNotifications: PushNotification | null }[]> => {
  return await prisma.user.findMany({
    where: {
        role: { in: ["ADMIN", "SUDO"] },
    },
    select: {
      id: true,
      pushNotifications: true,
    },
  });
};
const getUserPushTokens = async (): Promise<
  { id: string; pushNotifications: PushNotification | null }[]
> => {
  return await prisma.user.findMany({
    where: {
      role: "USER",
    },
    select: {
      id: true,
      pushNotifications: true,
    },
  });
};
const saveNotification =async(notification:{userId:string,title:string,body:string,data:null|object})=>{
  await prisma.allNotifications.create({
    data:{
      userId:notification.userId,
      title:notification.title,
      body:notification.body,
      data:notification.data || undefined
    }
  });

}
export { createPushToken, getAdminPushTokens,getUserPushTokens,saveNotification,deletePushToken };
