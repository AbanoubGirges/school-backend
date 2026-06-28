import { prisma } from "../config/prismaConnection.js";
import { SpiritualNoteSubmission } from "@prisma/client";
const postSpiritualNote = async (
  userId: string,
  submission: string[],
  date: Date,
): Promise<Array<Awaited<ReturnType<typeof prisma.spiritualNote.create>>>> => {
  let submissionEnum: SpiritualNoteSubmission[] = submission.map(
    (submission) => {
      switch (submission) {
        case "MORNINGPRAYER":
          return SpiritualNoteSubmission.MORNINGPRAYER;
        case "NOONPRAYER":
          return SpiritualNoteSubmission.NOONPRAYER;
        case "NIGHTPRAYER":
          return SpiritualNoteSubmission.NIGHTPRAYER;
        case "BIBLE":
          return SpiritualNoteSubmission.BIBLE;
        case "LITURGY":
          return SpiritualNoteSubmission.LITURGY;
        case "CONFESSION":
          return SpiritualNoteSubmission.CONFESSION;
        default:
          throw new Error("INVALID_SUBMISSION");
      }
    },
  );
  const created: Array<Awaited<ReturnType<typeof prisma.spiritualNote.create>>> = [];
  for (let i in submissionEnum) {
    if (await checkNoteExists(userId, submissionEnum[i], date)) {
      throw new Error("SPIRITUAL_NOTE_ALREADY_EXISTS");
    }
    created[i]=await prisma.spiritualNote.create({
      data: {
        userId,
        submission: submissionEnum[i],
        date,
      },
    });
  }
  return created;
};
const checkNoteExists = async (
  userId: string,
  submission: SpiritualNoteSubmission,
  date: Date,
) => {
  return await prisma.spiritualNote.findUnique({
    where: {
      userId_date_submission: {
        userId,
        submission: submission,
        date: date,
      },
    },
  });
};
const getSubmissionsForUser = async (userId: string, month: number) => {
  const userExists = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!userExists) {
    throw new Error("USER_NOT_FOUND");
  }
  return await prisma.spiritualNote.findMany({
    where: {
      userId,
      date: {
        gte: new Date(new Date().getFullYear(), month, 1),
        lt: new Date(new Date().getFullYear(), month + 1, 1),
      },
    },
  });
};
export { postSpiritualNote, checkNoteExists, getSubmissionsForUser };
