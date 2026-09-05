import {
  getUserPushTokens,
  getUserWebPushSubscriptions,
  saveNotification,
} from "../../repo/notificationQueries.js";

import { NotificationMessage } from "./registrationNotificationService.js";
import axios from "axios";
import { createFailedNotification } from "../../repo/failedNotificationQueries.js";
import dotenv from "dotenv";

dotenv.config();

const newAssignmentNotificationService = async (subject: string) => {
  switch (subject) {
    case "BIBLE":
      subject = "كتاب مقدس";
      break;

    case "SERVICE_TOPICS":
      subject = "موضوعات خدمة";
      break;

    case "DOCTRINE":
      subject = "عقيدة";
      break;

    case "CHURCH_HISTORY":
      subject = "تاريخ كنيسة";
      break;

    case "RITUALS":
      subject = "طقس";
      break;

    default:
      throw new Error("INVALID_SUBJECT_NAME");
  }

  const users = await getUserPushTokens();
  const webUsers = await getUserWebPushSubscriptions();

  const notificationMessages: NotificationMessage[] = [
    // Expo notifications
    ...users.flatMap((token) => {
      const pushNotification = token.pushNotifications;

      if (!pushNotification?.expoToken) {
        return [];
      }

      return [
        {
          type: "expo" as const,
          userId: pushNotification.userId,
          to: pushNotification.expoToken,
          title: "نزل الواجب الجديد",
          body: `واجب ${subject} جديد`,
        },
      ];
    }),

    // Web Push notifications
    ...webUsers.flatMap((user) => {
      const webSubscription = Array.isArray(
        user.webPushSubscriptions
      )
        ? user.webPushSubscriptions[0]
        : user.webPushSubscriptions;

      if (!webSubscription?.endpoint) {
        return [];
      }

      return [
        {
          type: "web" as const,
          userId: webSubscription.userId,
          subscription: {
            endpoint: webSubscription.endpoint,
            keys: {
              p256dh: webSubscription.p256dh,
              auth: webSubscription.auth,
            },
          },
          title: "نزل الواجب الجديد",
          body: `واجب ${subject} جديد`,
        },
      ];
    }),
  ];

  for (const message of notificationMessages) {
    try {
      const { userId, ...queueMessage } = message;

      console.log("Sending notification:", queueMessage);

      await axios.post(
        process.env.QUEUE_URL!,
        { body: queueMessage },
        {
          headers: {
            Authorization: `Bearer ${process.env.QUEUE_AUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Don't save the actual Expo token or Web Push subscription
      await saveNotification({
        userId: message.userId,
        title: message.title,
        body: message.body,
        data: null,
      });

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Axios error:",
          error.response?.data
        );
      } else {
        console.error(
          "Error sending notification:",
          error
        );
      }

      await createFailedNotification(message);
    }
  }
};

export default newAssignmentNotificationService;