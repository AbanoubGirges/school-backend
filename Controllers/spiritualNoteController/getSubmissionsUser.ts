import express from "express";
import { getSubmissionsForUser } from "../../repo/spiritualNoteQueries.js"; 
import { JwtPayload } from "jsonwebtoken";
const getSubmissionsUser = async (req: express.Request, res: express.Response) => {
  try {
    const {id,role}=req.user as JwtPayload
    let month = req.query.month as string;

    const userId = role==='ADMIN'||role==='SUDO'?req.params.userId as string: id;
    if (!month) {
        month = new Date().getMonth().toString();
    }
    else {
        month = (parseInt(month) - 1).toString();
    }
    const submissions = await getSubmissionsForUser(userId, parseInt(month));
    if (!submissions) {
        res.status(404).json({ error: "NO_SUBMISSIONS_FOUND_FOR_USER" });
        return;
    }
    res.status(200).json({ submissions });
  } catch (err) {
    console.error("Error fetching submissions for user:", err);
    if (err instanceof Error && err.message === "USER_NOT_FOUND") {
      return res.status(404).json({ error: "USER_NOT_FOUND" });
    }
    res.status(500).json({ error: "ERROR_FETCHING_SUBMISSIONS_FOR_USER" });
  }};
export default getSubmissionsUser;