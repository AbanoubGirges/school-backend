import express from "express";
import { authUser } from "../middleware/authUser.js";
import {body} from "express-validator";
import createPushTokenController from "../Controllers/adminControllers/notificationControllers/createPushTokenController.js";
const pushNotificationsRouter=express.Router();
pushNotificationsRouter.post("/",authUser,[body("expoPushToken").notEmpty().withMessage("Push Notification Required")],createPushTokenController);
export default pushNotificationsRouter;