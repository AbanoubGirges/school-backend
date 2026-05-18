import express from "express";
import { fetchUserData } from "../../repo/userDataQueries.js";
import { getPfpUrl } from "../../services/supabase/uploadPfp.js";
const getProfileController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const user = await fetchUserData(req.user?.id as string);
    if (!user) {
      res.status(404).json({ error: "USER_NOT_FOUND" });
      return;
    }
    const pfpUrl = await getPfpUrl(req.user?.id as string);
    if (!pfpUrl) {
      res.status(404).json({ error: "PROFILE_PICTURE_NOT_FOUND" });
      return;
    }
    
    res.json({ ...user, pfpUrl });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ error: "ERROR_GETTING_PROFILE" });
  }
};
export default getProfileController;