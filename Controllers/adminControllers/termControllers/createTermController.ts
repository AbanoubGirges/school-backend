import express from "express";
import { validationResult } from "express-validator";
import { newTerm } from "../../../repo/termQueries.js";
import { fetchUserByUsername } from "../../../repo/authQueries.js";
import bcrypt from "bcryptjs";
const createTermController = async (
  req: express.Request,
  res: express.Response,
) => {
  try{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const { termName, startDate, endDate} = req.body;
  
    // Assuming you have a function to create a term in your database
    const user = await fetchUserByUsername(req.user?.userName);
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }
    const [_,password]=user;
    const isPasswordValid = await bcrypt.compare(req.body.password, password);
        if (!isPasswordValid) {
          res.status(404).json({ error: "INVALID_CREDENTIALS" });
          return;
        }
    const term = await newTerm(termName, startDate, endDate);
    res.status(201).json(term);
  } catch (error) {
    res.status(500).json({ error: "Failed to create term" });
  }
};
export default createTermController;
