import { prisma } from "../config/prismaConnection.js";
import { Subject } from "@prisma/client";
import DurationExceededError from "../utils/DurationExceededError.js";
interface AssignmentAnswer {
  text: string;
  isCorrect: boolean;
}

interface AssignmentQuestion {
  name: string;
  answers: AssignmentAnswer[];
}

interface CreateAssignmentData {
  title: string;
  subject: Subject;
  endDate: Date;
  termId: string;
  questions: AssignmentQuestion[];
}
const createAssignment = async (
  title: string,
  subject: string,
  endDate: Date,
  questions: any[],
) => {
  let subjectEnum: Subject;
  switch (subject) {
    case "BIBLE":
      subjectEnum = Subject.BIBLE;
      break;
    case "SERVICE_TOPICS":
      subjectEnum = Subject.SERVICE_TOPICS;
      break;
    case "DOCTRINE":
      subjectEnum = Subject.DOCTRINE;
      break;
    case "CHURCH_HISTORY":
      subjectEnum = Subject.CHURCH_HISTORY;
      break;
    case "RITUALS":
      subjectEnum = Subject.RITUALS;
      break;
    default:
      throw new Error(`INVALID_SUBJECT_NAME`);
  }
  const assignment = await prisma.assignment.create({
    data: {
      title,
      subject: subjectEnum,
      endDate,
      termId: (
        (await prisma.term.findFirst({
          where: {
            startDate: { lte: new Date() },
            endDate: { gte: new Date() },
          },
        })) || {
          id: (() => {
            throw new Error("NO_ACTIVE_TERM");
          })(),
        }
      ).id,
      questions: {
        create: questions.map((question: AssignmentQuestion) => ({
          name: question.name,
          answers: {
            create: question.answers.map((answer: AssignmentAnswer) => ({
              name: answer.text,
              isCorrect: answer.isCorrect,
            })),
          },
        })),
      },
    },
  });
  return assignment;
};
const getAllAssignments = async () => {
  const assignments = await prisma.assignment.findMany({
    where: {
      endDate: { gte: new Date() },
      term: {
        startDate: { lte: new Date() },
        endDate: { gte: new Date() },
      },
    },
  });
  return assignments;
};
const getAssignmentById = async (id: string) => {
  const assignment = await prisma.assignment.findUnique({
    where: {
      id: id,
      term: {
        startDate: { lte: new Date() },
        endDate: { gte: new Date() },
      },
    },
    select: {
      questions: true,
      answers: {
        select: {
          id: true,
          name: true,
          questionId: true,
        },
      },
    },
  });
  return assignment;
};
const postAssignment = async (
  assignmentId: string,
  userId: string,
  answers: { questionId: string; answerId: string }[],
) => {
  const assignment = await prisma.assignment.findUnique({
    where: { id: assignmentId },
  });
  if (!assignment) {
    throw new Error("ASSIGNMENT_DOES_NOT_EXIST");
  } else if (new Date() > assignment.endDate) {
    throw new DurationExceededError();
  }
  await prisma.assignmentAttempt.create({
    data: {
      assignmentId: assignmentId,
      userId: userId,
      answers: {
        create: answers.map((answer) => ({
          questionId: answer.questionId,
          answerId: answer.answerId,
        })),
      },
    },
    include: {
      answers: true,
    },
  });
};
const assignmentResult = async (
  userId: string,
  assignmentId: string
) => {
  return await prisma.assignment.findFirst({
    where: {
      id: assignmentId,
      term: {
        startDate: { lte: new Date() },
        endDate: { gte: new Date() },
      },
    },
    select: {
      id: true,
      title: true,

      questions: {
        select: {
          id: true,
          name: true,

          answers: {
            select: {
              id: true,
              name: true,
              isCorrect: true,
            },
          },

          studentAnswers: {
            where: {
              attempt: {
                userId,
              },
            },
            select: {
              answerId: true,
            },
          },
        },
      },

      attempts: {
        where: {
          userId,
        },
        select: {
          id: true,
          answers: {
            select: {
              questionId: true,
              answerId: true,
            },
          },
        },
      },
    },
  });
};
export {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  postAssignment,
  assignmentResult,
};
