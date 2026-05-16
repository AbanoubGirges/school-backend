import { prisma } from "../config/prismaConnection.js";
import { Subject } from "@prisma/client";
async function insertLecture(lecture) {
    const subject = Subject[lecture.subject];
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
async function getLectures(subject) {
    return await prisma.lecture.findMany({
        where: {
            subject: Subject[subject],
        },
    });
}
async function getLectureById(id) {
    return await prisma.lecture.findUnique({
        where: { id },
    });
}
export { insertLecture, getLectures, getLectureById };
