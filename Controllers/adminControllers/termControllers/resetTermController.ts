import express from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { fetchUserByUsername } from "../../../repo/authQueries.js";
import { resetTerm } from "../../../repo/termQueries.js";
const resetTermAttendanceController = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { password } = req.body;
    const result = await fetchUserByUsername(req.user?.userName.trim());
    if (!result) {
      res.status(404).json({ error: "USER_NOT_FOUND" });
      return;
    }
    const [_, adminPassword] = result;
    const isPasswordValid = await bcrypt.compare(password, adminPassword);
    if (!isPasswordValid) {
      res.status(404).json({ error: "INVALID_CREDENTIALS" });
      return;
    }
    try {
        await resetTerm();
        res.status(200).json({ message: "TERM_ATTENDANCE_RESET_SUCCESS" });
    } catch (err) {
      console.error("Error resetting term attendance:", err);
      res.status(500).json({ error: "ERROR_RESETTING_TERM_ATTENDANCE" });
    }
};

export default resetTermAttendanceController;