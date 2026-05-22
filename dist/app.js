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
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const apiV1 = express.Router();
apiV1.use("/auth", authRouter);
apiV1.use("/admin/user", adminUserRouter);
apiV1.use("/user", userRouter);
// app.use("/", );
apiV1.use("/attendance/admin", adminAttendanceRouter);
apiV1.use("/attendance", userAttendanceRouter);
apiV1.use("/lectures", lecturesRouter);
app.use("/api/v1", apiV1);
app.use((err, req, res, next) => {
    // multer-specific errors
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            error: err.message,
        });
    }
    next();
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: "Internal Server Error",
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
