import express from "express";
import authAdmin from "../middleware/authAdmin.js";
import { authUser } from "../middleware/authUser.js";
import { body } from "express-validator";
import spiritualNoteController from "../Controllers/spiritualNoteController/postNoteController.js";
import getSubmissionsUser from "../Controllers/spiritualNoteController/getSubmissionsUser.js";
import authFather from "../middleware/authFather.js";
import { postNoteControllerFather } from "../Controllers/spiritualNoteController/postNoteController.js";
const spiritualNoteRouter = express.Router();
spiritualNoteRouter.post(
  "/",
  authUser,
  [
    body("submission")
      .isArray({ min: 1 })
      .withMessage("submission must be a non-empty array"),
    body("submission")
      .notEmpty()
      .isIn([
        "MORNINGPRAYER",
        "NOONPRAYER",
        "NIGHTPRAYER",
        "LITURGY",
        "BIBLE",
        "CONFESSION",
      ])
      .withMessage("Submission is required"),
  ],
  spiritualNoteController,
);
spiritualNoteRouter.get("/submissions", authUser, getSubmissionsUser);
spiritualNoteRouter.post(
  "/father",
  authFather,
  body("userId").notEmpty().isString().withMessage("User ID is required"),
  postNoteControllerFather,
);
spiritualNoteRouter.get("/:userId/submissions", authAdmin, getSubmissionsUser);
export default spiritualNoteRouter;
