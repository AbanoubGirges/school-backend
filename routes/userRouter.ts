import express from "express";
import getProfileController from "../Controllers/userControllers/getProfileController.js";
import { authUser } from "../middleware/authUser.js";
const userRouter = express.Router();
userRouter.use(authUser);
userRouter.get("/", getProfileController);
export default userRouter;