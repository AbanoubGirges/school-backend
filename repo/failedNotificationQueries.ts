import {prisma} from '../config/prismaConnection.js';
import type { FailedNotification, Prisma } from '@prisma/client';
import type NotificationMessage from '../services/notifications/registrationNotificationService.js';
const createFailedNotification = async (
    failedNotification: NotificationMessage
) => {
  return await prisma.failedNotification.create({
    data: {
      expoPushToken: failedNotification.to,
      title: failedNotification.title,
      body: failedNotification.body,
      data: failedNotification.data as Prisma.InputJsonValue | undefined,
    }
  });
};
export { createFailedNotification };