import express from "express";
import {validationResult} from "express-validator";
import { createAssignment } from "../../../repo/assignmentQueries.js";
const createAssignmentController = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
  const { title, subject, endDate, questions } = req.body;
  try {
    const assignment = await createAssignment(title, subject, endDate, questions);
    res.status(201).json({ message: "Assignment created successfully", assignment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export default createAssignmentController;