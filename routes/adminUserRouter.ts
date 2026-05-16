import express from "express";
import authAdmin from "../middleware/authAdmin.ts";
import { updateStatusController } from "../Controllers/adminControllers/onUser/updateStatusController.ts";
import { getPendingController } from "../Controllers/adminControllers/onUser/getPendingController.ts";
import { fetchUserController } from "../Controllers/adminControllers/onUser/fetchUserController.ts";
import { body } from "express-validator";
import updateRoleController from "../Controllers/adminControllers/onUser/updateRoleController.ts";
import { authSUDO } from "../middleware/authSUDO.ts";
const adminUserRouter = express.Router();
adminUserRouter.patch("/:id/status",authAdmin,[body("status").isIn(["APPROVED", "REJECTED", "PENDING"])], updateStatusController);
adminUserRouter.get("/pending", authAdmin, getPendingController);
adminUserRouter.get("/:id", authAdmin, fetchUserController);
adminUserRouter.patch("/:id/role", authSUDO, [body("role").isIn(["SUDO", "ADMIN", "USER", "FATHER"])], updateRoleController);

export default adminUserRouter;
