import express from 'express';
import registerController from '../Controllers/auth/registerController.ts'
import loginController from '../Controllers/auth/loginController.ts';
const authRouter=express.Router();

authRouter.post("/register",registerController)
authRouter.post("/login",loginController)
export default authRouter;