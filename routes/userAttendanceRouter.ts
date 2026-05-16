import express from "express";
import getAttendanceController from "../Controllers/userControllers/getAttendanceController.js";
import { authUser } from "../middleware/authUser.js";
const userAttendanceRouter = express.Router();
userAttendanceRouter.use(authUser);
userAttendanceRouter.get("/",getAttendanceController);
export default userAttendanceRouter;