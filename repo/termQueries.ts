import { prisma } from "../config/prismaConnection.js";
import { AttendanceStatus } from "@prisma/client";
import { ResultSubject } from "@prisma/client";
const resetTerm = async () => {
  const currentTerm = await prisma.term.findFirst({
    where: {
      startDate: { lte: new Date() },
      endDate: { gte: new Date() },
    },
  });
  if (!currentTerm) {
    throw new Error("NO_ACTIVE_TERM");
  }

  const result=await prisma.attendance.groupBy({
    by: ['userId', 'status'],
    _count: {
      _all: true
    }
  });
  const stats = Object.values(
    result.reduce(
      (acc, record) => {
        const userStats = (acc[record.userId] ??= {
          userId: record.userId,
          early: 0,
          late: 0,
          absent: 0,
        });

        const statusKey =
          record.status === AttendanceStatus.ABSENT
            ? "absent"
            : record.status === AttendanceStatus.PRESENT||record.status === AttendanceStatus.EXCUSEDLATE
              ? "early"
              : "late";

        userStats[statusKey] += record._count._all;

        return acc;
      },
      {} as Record<string, {
        userId: string;
        early: number;
        late: number;
        absent: number;
      }>,
    ),
  );
  for (const stat of stats) {
    const total = stat.early + stat.late + stat.absent;

const attendanceScore =
  total === 0
    ? 0
    : (stat.early + stat.late * 0.5) / total;
    await prisma.result.create({
      data: {
        userId: stat.userId,
        subject: ResultSubject.ATTENDANCE_GRADE, // Replace with actual subject
        score: attendanceScore, // Replace with actual score
        date: new Date(), // Replace with actual date
        termId: currentTerm.id,
      },
    });
  }
  
}
const newTerm = async (termName: string, startDate: Date, endDate: Date) => {
  const term = await prisma.term.create({
    data: {
      name: termName,
      startDate: startDate,
      endDate: endDate,
    },
  });
  return term;
}
export {
  resetTerm,
  newTerm
};