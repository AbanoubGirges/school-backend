import express from "express";
import multerInstance from "../middleware/multer.js";
import uploadLecturesController from "../Controllers/adminControllers/lectureControllers/uploadLecturesController.js";
import getLecturesController from "../Controllers/adminControllers/lectureControllers/getLecturesController.js";
import authAdmin from "../middleware/authAdmin.js";
import { authUser } from "../middleware/authUser.js";
const lecturesRouter = express.Router();
lecturesRouter.post(
  "/",
  multerInstance.single("file"),
  authAdmin,
  uploadLecturesController,
);
lecturesRouter.get("/:subject", authUser, getLecturesController);
export default lecturesRouter;
