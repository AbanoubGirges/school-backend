import express from "express";
import registerController from "../Controllers/auth/registerController.ts";
import loginController from "../Controllers/auth/loginController.ts";
import multerInstance from "../middleware/multer.ts";
import registerValidator from "../utils/registerValidator.ts";
import { loginValidator } from "../utils/registerValidator.ts";
const authRouter = express.Router();

authRouter.post(
  "/register",
  multerInstance.single("pfp"),
  registerValidator,
  registerController,
);
authRouter.post("/login", loginValidator, loginController);
export default authRouter;
