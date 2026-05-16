import express from "express";
import { authUser } from "../middleware/authUser.ts";
import getProfileController from "../Controllers/userControllers/getProfileController.ts";
const userRouter = express.Router();
userRouter.use(authUser);
userRouter.get("/", getProfileController);
export default userRouter;