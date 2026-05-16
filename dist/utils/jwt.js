import jwt from "jsonwebtoken";
/**
 *
 * @param payload
 * @returns
 */
const toJWT = (payload) => {
    return jwt.sign({ ...payload }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
const validateToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return { isValid: true, decoded };
    }
    catch (error) {
        return { isValid: false, decoded: null };
    }
};
export { toJWT, validateToken };
