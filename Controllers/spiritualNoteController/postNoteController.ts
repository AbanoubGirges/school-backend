import express from "express";
import { postSpiritualNote } from "../../repo/spiritualNoteQueries.js";
import { validationResult } from "express-validator";

const postNoteController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = {
      userId: req.user?.id as string,
      submission: req.body.submission,
      date: new Date().toISOString().split("T")[0],
    };

    const createdNote = await postSpiritualNote(
      note.userId,
      note.submission,
      new Date(note.date),
    );

    if (!createdNote || createdNote.length === 0) {
      return res.status(400).json({ error: "FAILED_TO_CREATE_SPIRITUAL_NOTE" });
    }

    res.status(201).json({ message: "SPIRITUAL_NOTE_CREATED" });
  } catch (err) {
    if (
      err instanceof Error &&
      err.message === "SPIRITUAL_NOTE_ALREADY_EXISTS"
    ) {
      return res.status(409).json({ error: "SPIRITUAL_NOTE_ALREADY_EXISTS" });
    }
    console.error("Error creating spiritual note:", err);
    res.status(500).json({ error: "ERROR_CREATING_SPIRITUAL_NOTE" });
  }
};
const postNoteControllerFather = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = {
      userId: req.body.userId as string,
      date: new Date().toISOString().split("T")[0],
    };

    const createdNote = await postSpiritualNote(
      note.userId,
      ["CONFESSION"],
      new Date(note.date),
    );

    if (!createdNote || createdNote.length === 0) {
      return res.status(400).json({ error: "FAILED_TO_CREATE_CONFESSION" });
    }

    res.status(201).json({ message: "CONFESSION_CREATED" });
  } catch (err) {
    if (
      err instanceof Error &&
      err.message === "CONFESSION_ALREADY_EXISTS"
    ) {
      return res.status(409).json({ error: "CONFESSION_ALREADY_EXISTS" });
    }
    console.error("Error creating spiritual note:", err);
    res.status(500).json({ error: "ERROR_CREATING_CONFESSION" });
  }
};
export default postNoteController;
export { postNoteControllerFather };
