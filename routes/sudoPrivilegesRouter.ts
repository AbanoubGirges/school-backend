import express from "express";
import { authSUDO } from "../middleware/authSUDO.js";
import { body } from "express-validator";
import resetTermController from "../Controllers/adminControllers/termControllers/resetTermController.js";
import {
  createAdminController,
  removeAdminController,
} from "../Controllers/adminControllers/onUser/onAdminsController.js";
import createTermController from "../Controllers/adminControllers/termControllers/createTermController.js";
const sudoPrivilegesRouter = express.Router();
sudoPrivilegesRouter.use(authSUDO);
sudoPrivilegesRouter.post(
  "/term/reset",
  [
    body("termName").notEmpty().withMessage("Term name is required"),
    body("startDateStr")
      .notEmpty()
      .withMessage("Start date is required")
      .isISO8601()
      .toDate()
      .withMessage("Start date must be a valid date"),
    body("endDateStr")
      .notEmpty()
      .withMessage("End date is required")
      .isISO8601()
      .toDate()
      .withMessage("End date must be a valid date"),
  ],
  resetTermController,
);
sudoPrivilegesRouter.post(
  "/term/create",
  [
    body("termName").notEmpty().withMessage("Term Name Required"),
    body("endDate")
      .notEmpty()
      .withMessage("End Date required")
      .isISO8601()
      .toDate()
      .withMessage("Must be a valid date"),
    body("startDate")
      .notEmpty()
      .withMessage("End Date required")
      .isISO8601()
      .toDate()
      .withMessage("Must be a valid date"),
  ],
  createTermController,
);
sudoPrivilegesRouter.patch(
  "/admins/add",
  [body("userId").notEmpty().withMessage("User ID is required")],
  createAdminController,
);
sudoPrivilegesRouter.delete(
  "/admins/remove",
  [body("userId").notEmpty().withMessage("User ID is required")],
  removeAdminController,
);
export default sudoPrivilegesRouter;
