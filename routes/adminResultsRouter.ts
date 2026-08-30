import express from "express";
import authAdmin from "../middleware/authAdmin.js";
import { body } from "express-validator";
import createResultController from "../Controllers/adminControllers/resultsControllers/createResultController.js";
import getResultsController from "../Controllers/userControllers/getResultsController.js";
const adminResultsRouter = express.Router();
adminResultsRouter.use(authAdmin);
adminResultsRouter.post(
  "/",
  [
    body("userId").notEmpty().withMessage("User ID is required"),
    body("subject").isArray().withMessage("Subject is required"),
    body("subject.*.subjectName")
      .isIn([
        "BIBLE",
        "SERVICE_TOPICS",
        "DOCTRINE",
        "CHURCH_HISTORY",
        "RITUALS",
        "HYMNS",
        "MEMORIZATION_TEXTS",
        "SPIRITUAL_NOTE",
      ])
      .withMessage("Invalid subject"),
    body("subject.*.score")
      .isFloat({ gt: 0 })
      .withMessage("Score must be a positive number"),
  ],
  createResultController,
);
adminResultsRouter.get('/:id',getResultsController);
export default adminResultsRouter;
