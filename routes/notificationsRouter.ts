import express from "express";
import { authUser } from "../middleware/authUser.js";
import { body } from "express-validator";
import createPushTokenController from "../Controllers/adminControllers/notificationControllers/createPushTokenController.js";
import { createWebPushSubscription, deletePushToken } from "../repo/notificationQueries.js";
import { getAllNotifications } from "../repo/notificationQueries.js";
import dotenv from "dotenv";
import { deleteWebPushSubscription } from "../repo/notificationQueries.js";
dotenv.config();
const pushNotificationsRouter = express.Router();
pushNotificationsRouter.get('/web/vapid-public-key', (req: express.Request, res: express.Response) => {
  const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
  res.status(200).json({ publicKey: publicVapidKey });
});
pushNotificationsRouter.post('/web/subscribe', authUser, async (req: express.Request, res: express.Response) => {
  const subscription:{ endpoint: string; p256dh: string; auth: string } = req.body;
  const userId = req.user?.id;
  try {
    await createWebPushSubscription(userId, subscription.endpoint, subscription.p256dh, subscription.auth);
    res.status(201).json({ message: 'Subscribed to web push notifications successfully' });
  } catch (error) {
    console.error("Error subscribing to web push notifications:", error);
    res.status(500).json({ error: "FAILED_TO_SUBSCRIBE_TO_WEB_PUSH_NOTIFICATIONS" });
  }
});
pushNotificationsRouter.post(
  "/",
  authUser,
  [body("expoPushToken").notEmpty().withMessage("Push Notification Required")],
  createPushTokenController,
);
pushNotificationsRouter.delete(
  "/",
  authUser,
  async (req: express.Request, res: express.Response) => {
    const userId = req.user?.id;
    try {
      await deletePushToken(userId);
      await deleteWebPushSubscription(userId); 
      res.status(200).json({ message: "token deleted successfully" });
    } catch (error) {
      console.error(`Failed to delete push token: ${error}`);
      res.status(500).json({ error: "FAILED_TO_DELETE_PUSH_TOKEN" });
    }
  },
);
pushNotificationsRouter.get(
  "/",
  authUser,
  async (req: express.Request, res: express.Response) => {
    const userId = req.user?.id;
    try {
      const allNotifications = await getAllNotifications(userId);
      res.status(200).json(allNotifications);
    } catch (error) {
      console.error(`Failed to fetch push token: ${error}`);
      res.status(500).json({ error: "FAILED_TO_FETCH_PUSH_TOKEN" });
    }
  },
);
export default pushNotificationsRouter;
