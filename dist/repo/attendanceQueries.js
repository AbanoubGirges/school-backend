import { prisma } from "../config/prismaConnection.js";
import { AttendanceStatus } from "@prisma/client";
async function createAttendanceRecord(userId, date, status, note) {
    let statusEnum;
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
async function getAttendanceByUserId(userId) {
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
