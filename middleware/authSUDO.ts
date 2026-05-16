import express from "express";
import { validateToken } from "../utils/jwt.js";
const authSUDO = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "AUTH_HEADER_MISSING" });
        return;
    }
    const token = authHeader.split(" ")[1];
    const {isValid, decoded} = validateToken(token);
    if (!isValid||!decoded) {
        res.status(401).json({ message: "INVALID_TOKEN" });
        return;
    }
    if (decoded.role !== "SUDO") {
        res.status(403).json({ message: "ACCESS_DENIED" });
        return;
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Error validating token:", err);
    res.status(500).json({ message: "ERROR_VALIDATING_TOKEN"});
  }
};
export { authSUDO };