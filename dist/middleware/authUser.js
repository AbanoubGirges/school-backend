import { validateToken } from "../utils/jwt.js";
const authUser = (req, res, next) => {
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
        req.user = decoded;
        next();
    }
    catch (err) {
        console.error("Error validating token:", err);
        res.status(500).json({ error: "ERROR_VALIDATING_TOKEN" });
    }
};
export { authUser };
