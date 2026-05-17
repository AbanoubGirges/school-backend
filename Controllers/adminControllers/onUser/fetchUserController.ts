import express from "express";
import { fetchUserData } from "../../../repo/userDataQueries.js";
import { getPfpUrl } from "../../../services/supabase/uploadPfp.js";
const fetchUserController = async (req: express.Request, res: express.Response) => {
  try {
    const userId = req.params.id as string;
    const userData = await fetchUserData(userId);
    if (!userData) {
      res.status(404).json({ error: "USER_NOT_FOUND" });
      return;
    }
    const pfpUrl = await getPfpUrl(userId);
    if (!pfpUrl) {
      res.status(404).json({ error: "PROFILE_PICTURE_NOT_FOUND" });
      return;
    }
    res.json({ ...userData, pfpUrl });
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ error: "ERROR_FETCHING_USER_DATA" });
  }
};
export { fetchUserController };
