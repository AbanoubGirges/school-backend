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
    case "EXCUSEDLATE":
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
async function getAttendanceByUserId(userId: string): Promise<{ attendanceRecords: Attendance[]; count: { present: number; absent: number; excusedLate: number; unexcusedLate: number } }> {
  const isUserExist = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!isUserExist) {
    throw new Error("USER_NOT_FOUND");
  }
  const attendanceRecords = await prisma.attendance.findMany({
    where: { userId },
  });
  const count = () => {
    let present = 0;
    let absent = 0;
    let excusedLate = 0;
    let unexcusedLate = 0;
    attendanceRecords.forEach((record) => {
      switch (record.status) {
        case AttendanceStatus.PRESENT:
          present++;
          break;
        case AttendanceStatus.ABSENT:
          absent++;
          break;
        case AttendanceStatus.EXCUSEDLATE:
          excusedLate++;
          break;
        case AttendanceStatus.UNEXCUSEDLATE:
          unexcusedLate++;
          break;
      }
    });
    return  { present, absent, excusedLate, unexcusedLate };
  };

  return {attendanceRecords, count: count()};
}
export { createAttendanceRecord, getAttendanceByUserId };
