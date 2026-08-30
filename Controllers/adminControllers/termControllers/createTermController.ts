import express from "express";
import { validationResult } from "express-validator";
import { newTerm } from "../../../repo/termQueries.js";
const createTermController = async (
  req: express.Request,
  res: express.Response,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const { termName, startDate, endDate } = req.body;
  try {
    // Assuming you have a function to create a term in your database
    const term = await newTerm(termName, startDate, endDate);
    res.status(201).json(term);
  } catch (error) {
    res.status(500).json({ error: "Failed to create term" });
  }
};
export default createTermController;
