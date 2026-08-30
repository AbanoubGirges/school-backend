import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import adminUserRouter from "./routes/adminUserRouter.js";
import adminAttendanceRouter from "./routes/adminAttendanceRouter.js";
import userAttendanceRouter from "./routes/userAttendanceRouter.js";
import dotenv from "dotenv";
import lecturesRouter from "./routes/lectureRoutes.js";
import multer from "multer";
import userRouter from "./routes/userRouter.js";
import spiritualNoteRouter from "./routes/spiritualNoteRouter.js";
import pushNotificationsRouter from "./routes/notificationsRouter.js";
import adminResultsRouter from "./routes/adminResultsRouter.js";
import sudoPrivilegesRouter from "./routes/sudoPrivilegesRouter.js";
import resultsRouter from "./routes/resultsRouter.js";
import adminAssignmentRouter from "./routes/adminAssignmentRouter.js";
import assignmentRouter from "./routes/assignmentRouter.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const apiV1=express.Router();
apiV1.use("/auth", authRouter);
apiV1.use("/admin/user", adminUserRouter);
apiV1.use("/user", userRouter);
// app.use("/", );
apiV1.use("/attendance/admin", adminAttendanceRouter);
apiV1.use("/attendance", userAttendanceRouter);
apiV1.use("/lectures",lecturesRouter)
//apiV2
const apiV2=express.Router();
apiV2.use("/spiritual-note",spiritualNoteRouter );
apiV2.use("/push-notifications",pushNotificationsRouter);
apiV2.use("/admin/results",adminResultsRouter);
apiV2.use("/sudo",sudoPrivilegesRouter);
apiV2.use("/results",resultsRouter);
apiV2.use("/admin/assignment",adminAssignmentRouter);
apiV2.use("/assignment",assignmentRouter);
app.use("/api/v1", apiV1);
app.use("/api/v2", apiV2);
app.use((err: Error|multer.MulterError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // multer-specific errors
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      error: err.message,
    });
  }
  next();
});
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
