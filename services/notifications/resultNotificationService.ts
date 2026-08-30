import {
  getOnePushToken,
  getUserPushTokens,
  saveNotification,
} from "../../repo/notificationQueries.js";
import type NotificationMessage from "./registrationNotificationService.js";
import axios from "axios";
import { createFailedNotification } from "../../repo/failedNotificationQueries.js";
import dotenv from "dotenv";
dotenv.config();
const resultNotificationService = async (userId: string, subject: string) => {
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
      throw new Error(`INVALID_SUBJECT_NAME`);
  }
  const pushToken=await getOnePushToken(userId);
  if(!pushToken){
    throw new Error('');
  }
  const notification={
    to:pushToken.expoToken,
    title:'ظهرت النتيحة!',
    body:`خش شوف نتيجتك في مادةال${subject}`,
  };
  try {
     await axios.post(
        `${process.env.QUEUE_URL}`,
        { body: notification },
        {
          headers: {
            Authorization: `Bearer ${process.env.QUEUE_AUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );
      const {to,...savedNotification}=notification;
      await saveNotification({userId,data:null,...savedNotification});
  }catch(error){
     if (axios.isAxiosError(error)) {
        console.error(`axios error:${error.response?.data}`);
      } else {
        console.error(`Error Sending Notification:${error}`);
      }
      await createFailedNotification({userId,...notification});
  }
};
export default resultNotificationService;
