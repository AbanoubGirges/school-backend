import { uploadLectures } from "../../../services/supabase/uploadLectures.js";
import { v4 as uuidv4 } from "uuid";
import { insertLecture } from "../../../repo/lecturesQueries.js";
const uploadLecturesController = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "NO_FILE_UPLOADED" });
            return;
        }
        const { title, subject, date, } = req.body;
        if (!title || !subject || !date) {
            res.status(400).json({ message: "MISSING_REQUIRED_FIELDS" });
            return;
        }
        const lectureId = uuidv4();
        const result = await uploadLectures(req.file.buffer, req.file.mimetype, lectureId, subject.toUpperCase());
        if (result instanceof Error || !result) {
            console.error("Error uploading lecture:", result);
            res.status(500).json({ message: "ERROR_UPLOADING_LECTURE" });
            return;
        }
        const dbResult = await insertLecture({
            id: lectureId,
            title,
            subject: subject.toUpperCase(),
            type: req.file.mimetype.split("/")[0],
            date: new Date(date),
            path: result.lecturePath,
        });
        res.status(201).json(dbResult);
    }
    catch (err) {
        console.error("Error uploading lecture:", err);
        res.status(500).json({ message: "ERROR_UPLOADING_LECTURE" });
    }
};
export default uploadLecturesController;
