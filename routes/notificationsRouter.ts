import express from "express";
import { authUser } from "../middleware/authUser.js";
import { body } from "express-validator";
import createPushTokenController from "../Controllers/adminControllers/notificationControllers/createPushTokenController.js";
import { deletePushToken } from "../repo/notificationQueries.js";
import { getAllNotifications } from "../repo/notificationQueries.js";
const pushNotificationsRouter = express.Router();
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
