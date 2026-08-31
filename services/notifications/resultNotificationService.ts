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
const resultNotificationService = async (userId: string, subjects: { subjectName: string; score: number }[]) => {
  for (let subject of subjects){
  switch (subject.subjectName) {
    case "BIBLE":
      subject.subjectName = "كتاب مقدس";
      break;
    case "SERVICE_TOPICS":
      subject.subjectName = "موضوعات خدمة";
      break;
    case "DOCTRINE":
      subject.subjectName = "عقيدة";
      break;
    case "CHURCH_HISTORY":
      subject.subjectName = "تاريخ كنيسة";
      break;
    case "RITUALS":
      subject.subjectName = "طقس";
      break;

  }
  const pushToken=await getOnePushToken(userId);
  if(!pushToken){
    throw new Error('Error:pushToken is null');
  }
  const notification={
    to:pushToken.expoToken,
    title:'ظهرت النتيحة!',
    body:`خش شوف نتيجتك في مادةال${subject.subjectName}`,
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
  }}
};
export default resultNotificationService;
