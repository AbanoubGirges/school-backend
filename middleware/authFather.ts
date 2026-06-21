import express from "express";
import {validateToken} from "../utils/jwt.js";
const authFather = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "ACCESS_DENIED" });
        }
        const {isValid,decoded} = validateToken(token);
        if (!isValid || !decoded) {
            return res.status(401).json({ error: "INVALID_TOKEN" });
        }
        if (decoded.role !== "FATHER") {
            return res.status(403).json({ error: "INSUFFICIENT_PERMISSIONS" });
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "INVALID_TOKEN" });
    }
};
export default authFather;