import { getAdminPushTokens } from "../../repo/notificationQueries.js";
import dotenv from "dotenv";
import axios from "axios";
import { createFailedNotification } from "../../repo/failedNotificationQueries.js";
dotenv.config();
export interface WebPushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export type NotificationMessage =
  | {
      type: "expo";
      to: string;
      title: string;
      body: string;
      data?: Record<string, unknown>;
      userId: string;
    }
  | {
      type: "web";
      subscription: WebPushSubscription;
      title: string;
      body: string;
      data?: Record<string, unknown>;
      userId: string;
    };
const registrationNotificationService = async (name: string) => {
  const adminPushTokens = await getAdminPushTokens();
  const notificationMessages = adminPushTokens.flatMap((token) => {
    const pushNotification = token.pushNotifications;

    if (!pushNotification?.expoToken) {
      return [];
    }

    return [
      {
        type: "expo" as const,
        userId: pushNotification.userId,
        to: pushNotification.expoToken,
        title: "A New User Registered",
        body: `${name} has just registered`,
      },
    ];
  });
  for (const messageIncludingUserId of notificationMessages) {
    const { userId, ...message } = messageIncludingUserId;
    try {
      console.log("Sending notification:", messageIncludingUserId);
      const response = await axios.post(
        `${process.env.QUEUE_URL}`,
        { body: message },
        {
          headers: {
            Authorization: `Bearer ${process.env.QUEUE_AUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );
      console.log("Queue response:", response.status, response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Axios error:",
          JSON.stringify(error.response?.data, null, 2),
        );
      } else {
        console.error(`Error Sending Notification:${error}`);
      }
      await createFailedNotification(messageIncludingUserId);
    }
  }
};
export { registrationNotificationService };
