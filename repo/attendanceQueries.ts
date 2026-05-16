import { prisma } from "../config/prismaConnection.js";
import { AttendanceStatus } from "@prisma/client";
import type { Attendance } from "@prisma/client";
async function createAttendanceRecord(
  userId: string,
  date: Date,
  status: string,
  note: string | undefined
): Promise<Attendance> {
  let statusEnum: AttendanceStatus;
  status = status.toUpperCase();
  switch (status) {
    case "PRESENT":
      statusEnum = AttendanceStatus.PRESENT;
      break;
    case "ABSENT":
      statusEnum = AttendanceStatus.ABSENT;
      break;
    case "EXECUSEDLATE":
      statusEnum = AttendanceStatus.EXCUSEDLATE;
      break;
    case "UNEXCUSEDLATE":
      statusEnum = AttendanceStatus.UNEXCUSEDLATE;
      break;
    default:
      throw new Error("INVALID_STATUS");
  }
  const attendanceRecord = await prisma.attendance.create({
    data: {
      userId,
      date,
      status: statusEnum,
      note,
    },
  });
  return attendanceRecord;
}
async function getAttendanceByUserId(userId: string): Promise<Attendance[]> {
  const isUserExist = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!isUserExist) {
    throw new Error("USER_NOT_FOUND");
  }
  const attendanceRecords = await prisma.attendance.findMany({
    where: { userId },
  });
  return attendanceRecords;
}
export { createAttendanceRecord, getAttendanceByUserId };
