import {
  getUserPushTokens,
  getUserWebPushSubscriptions,
  saveNotification,
} from "../../repo/notificationQueries.js";
import {NotificationMessage} from "./registrationNotificationService.js";
import axios from "axios";
import { createFailedNotification } from "../../repo/failedNotificationQueries.js";
import dotenv from "dotenv";
import _ from "lodash";
dotenv.config();
const assignmentResultNotificationService = async (assignmentTitle: string,assignmentId:string) => {
  console.log("SERVICE STARTED");
  console.log("Getting user tokens");
  const users = await getUserPushTokens();
  const webUsers = await getUserWebPushSubscriptions();
  console.log(users);
  const notificationMessages: NotificationMessage[] = [
  ...users.flatMap((token) => {
    const pushNotification = token.pushNotifications;

    if (!pushNotification?.expoToken) {
      return [];
    }

    return [{
      type: "expo" as const,
      userId: pushNotification.userId,
      to: pushNotification.expoToken,
      title: "نتيجة الواجب ظهرت",
      body: `نتيجة واجب ال${assignmentTitle}ظهرت`,
      data: {
        url: `/api/v2/assignment/result/${assignmentId}`,
      },
    }];
  }),

  ...webUsers.flatMap((subscription) => {
    const webSubscription = Array.isArray(subscription.webPushSubscriptions)
      ? subscription.webPushSubscriptions[0]
      : subscription.webPushSubscriptions;

    if (!webSubscription?.endpoint) {
      return [];
    }

    return [{
      type: "web" as const,
      userId: webSubscription.userId,
      subscription: {
        endpoint: webSubscription.endpoint,
        keys: {
          p256dh: webSubscription.p256dh,
          auth: webSubscription.auth,
        },
      },
      title: "نتيجة الواجب ظهرت",
      body: `نتيجة واجب ال${assignmentTitle}ظهرت`,
      data: {
        url: `/api/v2/assignment/result/${assignmentId}`,
      },
    }];
  }),
];
  for (const messageIncludingUserID of notificationMessages) {
  try {
    const { userId, ...message } = messageIncludingUserID;

    console.log("Sending notification:", message);

    await axios.post(
      process.env.QUEUE_URL!,
      { body: message },
      {
        headers: {
          Authorization: `Bearer ${process.env.QUEUE_AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    const savedNotification =
      messageIncludingUserID.type === "expo"
        ? (() => {
            const { to, ...notification } = messageIncludingUserID;
            return notification;
          })()
        : (() => {
            const { subscription, ...notification } = messageIncludingUserID;
            return notification;
          })();

    await saveNotification({
      ...savedNotification,
      data: null,
    });

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `axios error: ${JSON.stringify(error.response?.data)}`
      );
    } else {
      console.error(`Error Sending Notification: ${error}`);
    }

    await createFailedNotification(messageIncludingUserID);
  }
}
  //  const webNotificationMessages
};
export default assignmentResultNotificationService;
