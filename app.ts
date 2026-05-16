import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.ts";
import adminUserRouter from "./routes/adminUserRouter.ts";
import adminAttendanceRouter from "./routes/adminAttendanceRouter.ts";
import userAttendanceRouter from "./routes/userAttendanceRouter.ts";
import dotenv from "dotenv";
import lecturesRouter from "./routes/lectureRoutes.ts";
import multer from "multer";
import userRouter from "./routes/userRouter.ts";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRouter);
app.use("/user", adminUserRouter);
app.use("/user", userRouter);
// app.use("/", );
app.use("/attendance/admin", adminAttendanceRouter);
app.use("/attendance", userAttendanceRouter);
app.use("/lectures",lecturesRouter)
app.use((err: Error|multer.MulterError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // multer-specific errors
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: err.message,
    });
  }

  // custom fileFilter errors
  if (err) {
    return res.status(400).json({
      message: err.message,
    });
  }

  next();
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
