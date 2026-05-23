import { prisma } from "../config/prismaConnection.js";
import { AttendanceStatus } from "@prisma/client";
async function createAttendanceRecord(userId, date, status, note) {
    const isUserExist = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!isUserExist) {
        throw new Error("USER_NOT_FOUND");
    }
    let statusEnum;
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
        return { present, absent, excusedLate, unexcusedLate };
    };
    return { attendanceRecords, count: count() };
}
const getAttendanceByDate = async (id, date) => {
    const attendanceRecords = await prisma.attendance.findFirst({
        where: {
            userId: id,
            date: {
                gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                lte: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999),
            },
        },
    });
    return attendanceRecords;
};
const markAbsentForUsers = async (userIds) => {
    const absentStatus = AttendanceStatus.ABSENT;
    await prisma.attendance.createMany({
        data: userIds.map((id) => ({
            userId: id,
            status: absentStatus,
        })),
    });
};
export { createAttendanceRecord, getAttendanceByUserId, getAttendanceByDate, markAbsentForUsers, };
