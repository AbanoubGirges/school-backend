import { prisma } from "../config/prismaConnection.js";
import { ResultSubject } from "@prisma/client";
const createResult = async (
  userId: string,
  subject: { subjectName: string; score: number }[],
) => {
    const termId = (
      (await prisma.term.findFirst({
        where: {
          startDate: { lte: new Date() },
          endDate: { gte: new Date() },
        },
      })) || { id: (() => { throw new Error('NO_ACTIVE_TERM'); })() }
    ).id;
  for (const sub of subject) {
    let subjectEnum: ResultSubject;
    switch (sub.subjectName) {
      case "BIBLE":
        subjectEnum = ResultSubject.BIBLE;
        break;
      case "SERVICE_TOPICS":
        subjectEnum = ResultSubject.SERVICE_TOPICS;
        break;
      case "DOCTRINE":
        subjectEnum = ResultSubject.DOCTRINE;
        break;
      case "CHURCH_HISTORY":
        subjectEnum = ResultSubject.CHURCH_HISTORY;
        break;
      case "RITUALS":
        subjectEnum = ResultSubject.RITUALS;
        break;
      case "HYMNS":
        subjectEnum = ResultSubject.HYMNS;
        break;
      case "MEMORIZATION_TEXTS":
        subjectEnum = ResultSubject.MEMORIZATION_TEXTS;
        break;
      case "SPIRITUAL_NOTE":
        subjectEnum = ResultSubject.SPIRITUAL_NOTE;
        break;
      default:
        throw new Error(`INVALID_SUBJECT_NAME`);
    }
    await prisma.result.create({
      data: {
        userId,
        subject: subjectEnum,
        score: sub.score,
        termId: termId,
      }
    });
  }
};
const fetchResultsByUserId = async (userId: string) => {
    const termId = (
      (await prisma.term.findFirst({
        where: {
            startDate: { lte: new Date() },
            endDate: { gte: new Date() },
        },
      })) || { id: (() => { throw new Error('NO_ACTIVE_TERM'); })() }
    ).id;
  const results = await prisma.result.findMany({
    where: { userId },
    select: {
      subject: true,
      score: true,
        date: true,
        term: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });
  return results;
};

export { createResult, fetchResultsByUserId };