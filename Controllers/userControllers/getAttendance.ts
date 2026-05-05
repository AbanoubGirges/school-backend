import express from "express";
import { getAttendanceByUserId } from "../../repo/attendanceQueries.ts";
const getAttendanceController = async (req: express.Request, res: express.Response) => {
  try {
    const userId = req.user.id as string;
    const attendanceRecords = await getAttendanceByUserId(userId);
    res.json(attendanceRecords);
  } catch (err) {
    console.error("Error fetching attendance records:", err);
    res.status(500).json({ message: "ERROR_GETTING_ATTENDANCE" });
  }
};
export default getAttendanceController;
