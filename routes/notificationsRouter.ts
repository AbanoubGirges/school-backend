import express from "express";
import { authUser } from "../middleware/authUser.js";
import {body} from "express-validator";
const pushNotificationsRouter=express.Router();
pushNotificationsRouter.post("/",authUser,[body("expoPushToken").notEmpty().withMessage("Push Notification Required")],);
export default pushNotificationsRouter;