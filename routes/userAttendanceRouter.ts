import express from "express";
import getAttendanceController from "../Controllers/userControllers/getAttendanceController.ts";
import { authUser } from "../middleware/authUser.ts";
const userAttendanceRouter = express.Router();
userAttendanceRouter.use(authUser);
userAttendanceRouter.get("/",getAttendanceController);
export default userAttendanceRouter;