import {
  getUserPushTokens,
  saveNotification,
} from "../../repo/notificationQueries.js";
import type NotificationMessage from "./registrationNotificationService.js";
import axios from "axios";
import { createFailedNotification } from "../../repo/failedNotificationQueries.js";
import dotenv from "dotenv";
import _ from "lodash";
dotenv.config();
const assignmentResultNotificationService = async (assignmentTitle: string,assignmentId:string) => {
  console.log("SERVICE STARTED");
  console.log("Getting user tokens");
  const users = await getUserPushTokens();
  console.log(users);
  const notificationMessages: NotificationMessage[] = users.flatMap((token) => {
    const pushNotification = token.pushNotifications;

    if (!pushNotification?.expoToken) {
      return [];
    }

    return [
      {
        userId: pushNotification.userId,
        to: pushNotification.expoToken,
        title: "نتيجة الواجب ظهرت",
        body: `نتيجة واجب ال${assignmentTitle}ظهرت`,
        data:{
          url:`/api/v2/assignment/result/${assignmentId}`
        }
      },
    ];
  });
  for (const messageIncludingUserID of notificationMessages) {
    try {
      const { userId, ...message } = messageIncludingUserID;
      console.log("Sending notification:", message);
      await axios.post(
        `${process.env.QUEUE_URL}`,
        { body: message },
        {
          headers: {
            Authorization: `Bearer ${process.env.QUEUE_AUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );
      const { to, ...savedNotification } = messageIncludingUserID;
      await saveNotification({ ...savedNotification, data: null });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(`axios error:${error.response?.data}`);
      } else {
        console.error(`Error Sending Notification:${error}`);
      }
      await createFailedNotification(messageIncludingUserID);
    }
  }
};
export default assignmentResultNotificationService;
