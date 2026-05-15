import express from "express";
import { createAttendanceRecord } from "../../../repo/attendanceQueries.ts";
import { validationResult } from "express-validator";
const createAttendanceController = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  try {
    const { id, note, status } = req.body;
    if (!id || !status) {
      res.status(400).json({ message: "MISSING_REQUIRED_FIELDS" });
      return;
    }
    const attendanceRecord = await createAttendanceRecord(
      id,
      new Date(),
      status.toUpperCase(),
      note || undefined
    );
    res
      .status(201)
      .json({ message: "ATTENDANCE_RECORD_CREATED", data: attendanceRecord });
  } catch (err) {
    console.error("Error creating attendance record:", err);
    res.status(500).json({ message: "ERROR_CREATING_ATTENDANCE"});
  }
};
export { createAttendanceController };
