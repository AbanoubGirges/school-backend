import express from "express";
import multerInstance from "../middleware/multer.ts";
import uploadLecturesController from "../Controllers/adminControllers/lectureControllers/uploadLecturesController.ts";
import getLecturesController from "../Controllers/adminControllers/lectureControllers/getLecturesController.ts";
import authAdmin from "../middleware/authAdmin.ts";
import authAdminOrUser from "../middleware/authAdminOrUser.ts";
const lecturesRouter = express.Router();
lecturesRouter.post(
  "/",
  multerInstance.single("file"),
  authAdmin,
  uploadLecturesController,
);
lecturesRouter.get("/:subject", authAdminOrUser, getLecturesController);
export default lecturesRouter;
