import express from "express";
import { validateToken } from "../utils/jwt.ts";

const authAdminOrUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "AUTH_HEADER_MISSING" });
      return;
    }
    const token = authHeader.split(" ")[1];

    // Try admin token first
    let { isValid, decoded } = validateToken(token, true);

    // If not valid as admin, try user token
    if (!isValid) {
      ({ isValid, decoded } = validateToken(token, false));
    }

    if (!isValid || !decoded) {
      res.status(401).json({ message: "INVALID_TOKEN" });
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error validating token:", error);
    res.status(401).json({ message: "AUTHENTICATION_FAILED" });
  }
};

export default authAdminOrUser;
