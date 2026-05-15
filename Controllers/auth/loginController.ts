import express from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { fetchUserByUsername } from "../../repo/authQueries.ts";
import { toJWT } from "../../utils/jwt.ts";
import { getPfpUrl } from "../../services/supabase/uploadPfp.ts";
const loginController = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  try {
    const result = await fetchUserByUsername(req.body.userName);
    if (!result) {
      res.status(404).json({ message: "USER_NOT_FOUND" });
      return;
    }
    const [userData, password] = result;
    const isPasswordValid = await bcrypt.compare(req.body.password, password);
    if (!isPasswordValid) {
      res.status(404).json({ message: "INVALID_CREDENTIALS" });
      return;
    } else if (userData.status === "PENDING") {
      res.status(403).json({ message: `ACCOUNT_PENDING` });
      return;
    }else if (userData.status === "REJECTED") {
      res.status(403).json({ message: `ACCOUNT_REJECTED` });
      return;
    }
    const pfpUrl = await getPfpUrl(userData.id);
    if (pfpUrl instanceof Error) {
      console.error("Error fetching profile picture URL:", pfpUrl);
      res.status(500).json({ message: "ERROR_FETCHING_PROFILE_PICTURE" });
      return;
    }
    const token = toJWT(userData);
    res.status(200).json({ message: "USER_LOGGED_IN", token ,pfpUrl});
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "ERROR_LOGGING_IN" });
  }
};
export default loginController;
