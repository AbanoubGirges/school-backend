import express from "express";
import authAdmin from "../middleware/authAdmin.js";
import { body } from "express-validator";
import createAssignmentController from "../Controllers/adminControllers/assignmentControllers/createAssignmentController.js";
import sendAssignmentResultController from "../Controllers/adminControllers/assignmentControllers/sendAssignmentResultsController.js";
const adminAssignmentRouter = express.Router();
adminAssignmentRouter.use(authAdmin);
adminAssignmentRouter.post(
  "/create",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("subject")
      .notEmpty()
      .isIn([
        "BIBLE",
        "SERVICE_TOPICS",
        "DOCTRINE",
        "CHURCH_HISTORY",
        "RITUALS",
        "HYMNS",
      ])
      .withMessage("Invalid subject"),
    body("endDate")
      .notEmpty()
      .withMessage("End date is required")
      .isISO8601()
      .toDate()
      .withMessage("End date must be a valid date"),
    body("questions")
      .isArray({ min: 1 })
      .withMessage("At least one question is required"),
    body("questions.*.name")
      .notEmpty()
      .withMessage("Question text is required"),
    body("questions.*.answers")
      .isArray({ min: 1 })
      .withMessage("At least one option is required for each question"),
    body("questions.*.answers.*.text")
      .notEmpty()
      .withMessage("answers text is required"),

    body("questions.*.answers.*.isCorrect")
      .isBoolean()
      .withMessage("isCorrect must be a boolean"),
  ],
  createAssignmentController,
);
adminAssignmentRouter.post('/notify',[body('assignmentTitle').notEmpty().withMessage('Assignment title is required'),body("assignmentId").notEmpty().withMessage('Assignment ID is required')],sendAssignmentResultController);

export default adminAssignmentRouter;
