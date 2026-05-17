import express from "express";
import { createAttendanceRecord } from "../../../repo/attendanceQueries.js";
import { validationResult } from "express-validator";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";
const createAttendanceController = async (
  req: express.Request,
  res: express.Response,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  try {
    const { id, note, status } = req.body;
    if (!id || !status) {
      res.status(400).json({ error: "MISSING_REQUIRED_FIELDS" });
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const attendanceRecord = await createAttendanceRecord(
      id,
      today,
      status.toUpperCase(),
      note,
    );
    res
      .status(201)
      .json({ error: "ATTENDANCE_RECORD_CREATED", data: attendanceRecord });
  } catch (err) {
    if (
      err instanceof PrismaClientKnownRequestError &&
      err.message === "USER_NOT_FOUND"
    ) {
      res.status(404).json({ error: "USER_NOT_FOUND" });
      return;
    }
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      res.status(409).json({
        error: `ATTENDANCE_ALREADY_TAKEN_FOR_TODAY`,
      });
      return;
    }
    console.error("Error creating attendance record:", err);
    res.status(500).json({ error: "ERROR_CREATING_ATTENDANCE" });
  }
};
export { createAttendanceController };
