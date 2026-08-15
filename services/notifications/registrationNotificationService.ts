import {getAdminPushTokens} from '../../repo/notificationQueries.js';
import dotenv from 'dotenv';
import axios from 'axios';
import { createFailedNotification } from '../../repo/failedNotificationQueries.js';
dotenv.config();
export default interface NotificationMessage {
  to: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
}

const registrationNotificationService = async (name:string)=>{
    const adminPushTokens = await getAdminPushTokens();
    const notificationMessages: NotificationMessage[] = adminPushTokens.map((token) => ({
        to: token.expoToken,
        title: 'New User Registration',
        body: `A new user has registered: ${name}`
    }));
    for (const message of notificationMessages) {
        try {
            await axios.post(`${process.env.LOCAL_QUEUE_URL}`, message, {
                headers: {
                    'Authorization': `Bearer ${process.env.QUEUE_AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Error sending notification:', error);    
            await createFailedNotification(message);
        }
    }
};
export { registrationNotificationService };