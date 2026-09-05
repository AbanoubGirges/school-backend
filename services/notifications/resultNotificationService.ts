import {
  getOnePushToken,
  getOneWebPushSubscription,
  saveNotification,
} from "../../repo/notificationQueries.js";

import { NotificationMessage } from "./registrationNotificationService.js";
import axios from "axios";
import { createFailedNotification } from "../../repo/failedNotificationQueries.js";
import dotenv from "dotenv";

dotenv.config();

const resultNotificationService = async (
  userId: string,
  subjects: { subjectName: string; score: number }[],
) => {
  const webSubscription = await getOneWebPushSubscription(userId);

  const pushToken = await getOnePushToken(userId);

  for (const subject of subjects) {
    let subjectName: string;

    switch (subject.subjectName) {
      case "BIBLE":
        subjectName = "كتاب مقدس";
        break;

      case "SERVICE_TOPICS":
        subjectName = "موضوعات خدمة";
        break;

      case "DOCTRINE":
        subjectName = "عقيدة";
        break;

      case "CHURCH_HISTORY":
        subjectName = "تاريخ كنيسة";
        break;

      case "RITUALS":
        subjectName = "طقس";
        break;

      case "SPIRITUAL_NOTES":
        subjectName = "نوتة روحية";
        break;

      default:
        subjectName = subject.subjectName;
    }

    const notificationMessages: NotificationMessage[] = [];

    // Expo
    if (pushToken?.expoToken) {
      notificationMessages.push({
        type: "expo",
        to: pushToken.expoToken,
        title: "ظهرت النتيجة!",
        body: `خش شوف نتيجتك في مادة ${subjectName}`,
        data: {
          subjectName: subject.subjectName,
          score: subject.score,
        },
        userId,
      });
    }

    // Web Push

    if (webSubscription) {
      notificationMessages.push({
        type: "web",
        subscription: {
          endpoint: webSubscription.endpoint,
          keys: {
            p256dh: webSubscription.p256dh,
            auth: webSubscription.auth,
          },
        },
        title: "ظهرت النتيجة!",
        body: `خش شوف نتيجتك في مادة ${subjectName}`,
        userId,
      });
    }
    // Send notifications
    for (const message of notificationMessages) {
      try {
        const { userId: _, ...queueMessage } = message;

        await axios.post(
          process.env.QUEUE_URL!,
          { body: queueMessage },
          {
            headers: {
              Authorization: `Bearer ${process.env.QUEUE_AUTH_TOKEN}`,
              "Content-Type": "application/json",
            },
          },
        );

        // Save notification history without delivery-specific data
        await saveNotification({
          userId: message.userId,
          title: message.title,
          body: message.body,
          data: message.data ?? null,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(`axios error: ${JSON.stringify(error.response?.data)}`);
        } else {
          console.error(`Error Sending Notification: ${error}`);
        }

        await createFailedNotification(message);
      }
    }
  }
};

export default resultNotificationService;
