import { prisma } from "../config/prismaConnection.ts";
import type { Lecture } from "@prisma/client";
import { Subject } from "@prisma/client";

async function insertLecture(lecture: {
  id: string;
  title: string;
  subject: string;
  type: string;
  date: Date;
  path: string;
}): Promise<Lecture> {

  const subject = Subject[lecture.subject as keyof typeof Subject];

  if (!subject) {
    throw new Error("Invalid subject");
  }

  return await prisma.lecture.create({
    data: {
      ...lecture,
      subject,
    },
  });
}
async function getLectures(subject: string): Promise<Lecture[]> {

  return await prisma.lecture.findMany({
    where: {
      subject: Subject[subject as keyof typeof Subject],
    },
  });
}
async function getLectureById(id: string): Promise<Lecture | null> {
  return await prisma.lecture.findUnique({
    where: { id },
  });
}

export { insertLecture, getLectures, getLectureById };