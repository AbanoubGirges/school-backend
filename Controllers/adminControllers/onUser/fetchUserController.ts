import express from "express";
import { fetchUserData } from "../../../repo/userDataQueries.ts";
const fetchUserController = async (req: express.Request, res: express.Response) => {
  try {
    const userId = req.params.id as string;
    const userData = await fetchUserData(userId);
    if (!userData) {
      res.status(404).json({ message: "USER_NOT_FOUND" });
      return;
    }
    res.json(userData);
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ message: "ERROR_FETCHING_USER_DATA" });
  }
};
export { fetchUserController };
