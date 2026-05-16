import express from "express";
import { validateToken } from "../utils/jwt.ts";
const authAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "AUTH_HEADER_MISSING" });
      return;
    }
    const token = authHeader.split(" ")[1];
    const { isValid, decoded } = validateToken(token);
    if (!isValid || !decoded) {
      res.status(401).json({ message: "INVALID_TOKEN" });
      return;
    }
    
    if (decoded.role !== "ADMIN"||decoded.role !== "SUDO") {
      res.status(403).json({ message: "ACCESS_DENIED" });
      return;
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error validating admin token:", error);
    res.status(401).json({ message: "AUTHENTICATION_FAILED" });
  }
};
export default authAdmin;
