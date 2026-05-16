import express from "express";
import getProfileController from "../Controllers/userControllers/getProfileController.ts";
import authAdminOrUser from "../middleware/authAdminOrUser.ts";
const userRouter = express.Router();
userRouter.use(authAdminOrUser);
userRouter.get("/", getProfileController);
export default userRouter;