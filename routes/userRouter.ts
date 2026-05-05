import express from "express";
import { authUser } from "../middleware/authUser.ts";
const userRouter = express.Router();
userRouter.use(authUser);
userRouter.get("/",);
