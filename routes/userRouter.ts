import express from "express";
import getProfileController from "../Controllers/userControllers/getProfileController.ts";
import { authUser } from "../middleware/authUser.ts";
const userRouter = express.Router();
userRouter.use(authUser);
userRouter.get("/", getProfileController);
export default userRouter;