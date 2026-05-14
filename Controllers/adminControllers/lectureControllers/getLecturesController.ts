import express from "express";
import { getLectureById, getLectures } from "../../../repo/lecturesQueries.ts";
import { getLectureUrl } from "../../../services/supabase/uploadLectures.ts";
const getLecturesController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const subject = req.params.subject as string;
    if (!subject) {
      res.status(400).json({ message: "MISSING_SUBJECT" });
      return;
    }
    const lecturePath = req.query.lectureId as string;
    if (!lecturePath) {
      const lectures = await getLectures(subject.toUpperCase());
      res.status(200).json(lectures);
    } else {
      const lectureData = await getLectureById(lecturePath);
      if (!lectureData) {
        res.status(404).json({ message: "LECTURE_NOT_FOUND" });
        return;
      }
      const lectureUrl = await getLectureUrl(lectureData.path);
      if (lectureUrl instanceof Error) {
        console.error("Error getting lecture URL:", lectureUrl);
        res.status(500).json({ message: "ERROR_GETTING_LECTURE_URL" });
        return;
      }
      res.status(200).json({ ...lectureData, lectureUrl });
    }
  } catch (err) {
    console.error("Error fetching lectures:", err);
    res.status(500).json({ message: "ERROR_FETCHING_LECTURES" });
  }
};
export default getLecturesController;
