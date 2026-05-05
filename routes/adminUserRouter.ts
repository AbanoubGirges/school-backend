import express from "express";
import authAdmin from "../middleware/authAdmin.ts";
import { updateStatusController } from "../Controllers/adminControllers/onUser/updateStatusController.ts";
import { getPendingController } from "../Controllers/adminControllers/onUser/getPendingController.ts";
import { fetchUserController } from "../Controllers/adminControllers/onUser/fetchUserController.ts";
const adminUserRouter = express.Router();
adminUserRouter.use(authAdmin);
adminUserRouter.patch("/:id/status", updateStatusController);
adminUserRouter.get("/pending", getPendingController);
adminUserRouter.get("/:id", fetchUserController);

export default adminUserRouter;
