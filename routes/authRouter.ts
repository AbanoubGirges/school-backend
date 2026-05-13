import express from "express";
import registerController from "../Controllers/auth/registerController.ts";
import loginController from "../Controllers/auth/loginController.ts";
import multerInstance from "../middleware/multer.ts";
const authRouter = express.Router();

authRouter.post("/register", multerInstance.single("pfp"), registerController);
authRouter.post("/login", loginController);
export default authRouter;
