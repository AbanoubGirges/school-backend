import { prisma } from "../config/prismaConnection.js";

import type { Prisma } from "@prisma/client";

import type { NotificationMessage } from "../services/notifications/registrationNotificationService.js";

const createFailedNotification = async (
  failedNotification: NotificationMessage
) => {
  if (failedNotification.type !== "expo") {
    return;
  }

  return await prisma.failedNotification.create({
    data: {
      type: failedNotification.to,
      title: failedNotification.title,
      body: failedNotification.body,
      data: failedNotification.data
        ? (failedNotification.data as Prisma.InputJsonValue)
        : undefined,
    },
  });
};

export { createFailedNotification };