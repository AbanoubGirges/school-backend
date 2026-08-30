import {
  getUserPushTokens,
  saveNotification,
} from "../../repo/notificationQueries.js";
import type NotificationMessage from "./registrationNotificationService.js";
import axios from "axios";
import { createFailedNotification } from "../../repo/failedNotificationQueries.js";
import dotenv from "dotenv";
dotenv.config();
const newAssignmentNotificationService=async(subject:string)=>{
    switch (subject) {
        case "BIBLE":
            subject='كتاب مقدس';
          break;
        case "SERVICE_TOPICS":
            subject='موضوعات خدمة';
          break;
        case "DOCTRINE":
            subject='عقيدة';
          break;
        case "CHURCH_HISTORY":
            subject='تاريخ كنيسة';
          break;
        case "RITUALS":
            subject='طقس';
          break;
        default:
          throw new Error(`INVALID_SUBJECT_NAME`);
      }
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
        title: "نزل الواجب الجديد",
        body: `واجب ${subject} جديد`,
      },
    ];
  });
  for (const messageIncludingUserID of notificationMessages) {
    try {
      const { userId, ...message } = messageIncludingUserID;
      console.log("Sending notification:", message);
      await axios.post(
        `${process.env.LOCAL_QUEUE_URL}`,
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
      
}
export default newAssignmentNotificationService;