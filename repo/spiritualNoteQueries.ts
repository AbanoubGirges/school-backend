import { prisma } from "../config/prismaConnection.js";
import { SpiritualNoteSubmission } from "@prisma/client";
const postSpiritualNote = async (
  userId: string,
  submission: string,
  date: Date,
) => {
  let submissionEnum: SpiritualNoteSubmission;
  submission = submission.toUpperCase();
  switch (submission) {
    case "MORNINGPRAYER":
      submissionEnum = SpiritualNoteSubmission.MORNINGPRAYER;
      break;
    case "NOONPRAYER":
      submissionEnum = SpiritualNoteSubmission.NOONPRAYER;
      break;
    case "NIGHTPRAYER":
      submissionEnum = SpiritualNoteSubmission.NIGHTPRAYER;
      break;
    case "BIBLE":
      submissionEnum = SpiritualNoteSubmission.BIBLE;
      break;
    case "LITURGY":
      submissionEnum = SpiritualNoteSubmission.LITURGY;
      break;
    case "CONFESSION":
      submissionEnum = SpiritualNoteSubmission.CONFESSION;
      break;
    default:
      throw new Error("INVALID_SUBMISSION");
  }
  if (await checkNoteExists(userId, submissionEnum, date)) {
    throw new Error("SPIRITUAL_NOTE_ALREADY_EXISTS");
  }
  return await prisma.spiritualNote.create({
    data: {
      userId,
      submission: submissionEnum,
      date,
    },
  });
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
