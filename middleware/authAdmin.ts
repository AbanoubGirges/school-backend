import express from "express";
import { validateToken } from "../utils/jwt.js";
const authAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "AUTH_HEADER_MISSING" });
      return;
    }
    const token = authHeader.split(" ")[1];
    const { isValid, decoded } = validateToken(token);
    if (!isValid || !decoded) {
      res.status(401).json({ error: "INVALID_TOKEN" });
      return;
    }

    if (decoded.role !== "ADMIN"||decoded.role !== "SUDO") {
      res.status(403).json({ error: "ACCESS_DENIED" });
      return;
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error validating admin token:", error);
    res.status(401).json({ error: "AUTHENTICATION_FAILED" });
  }
};
export default authAdmin;
