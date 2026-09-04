import { PushNotification } from "@prisma/client";
import { prisma } from "../config/prismaConnection.js";
import { Prisma } from "@prisma/client";
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
const deletePushToken = async (userId: string) => {
  const existingToken = await prisma.pushNotification.findUnique({
    where: {
      userId,
    },
  });
  if (existingToken) {
    return await prisma.pushNotification.delete({
      where: {
        userId,
      },
    });
  }
};
const getAdminPushTokens = async (): Promise<
  { id: string; pushNotifications: PushNotification | null }[]
> => {
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
const getOnePushToken = async (
  userId: string,
): Promise<PushNotification | null> => {
  return await prisma.pushNotification.findUnique({
    where: {
      userId: userId,
    },
  });
};
const saveNotification = async (notification: {
  userId: string;
  title: string;
  body: string;
  data: null | object;
}) => {
  await prisma.allNotifications.create({
    data: {
      userId: notification.userId,
      title: notification.title,
      body: notification.body,
      data: notification.data || undefined,
    },
  });
};
const getAllNotifications = async (
  userId: string,
): Promise<Prisma.AllNotificationsGetPayload<{}>[]> => {
  return await prisma.allNotifications.findMany({
    where: {
      userId,
    },
  });
};
export {
  createPushToken,
  getAdminPushTokens,
  getUserPushTokens,
  saveNotification,
  deletePushToken,
  getOnePushToken,
  getAllNotifications,
};
