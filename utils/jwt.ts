import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { IUser } from "../models/userData.js";
import { Role } from "@prisma/client";

/**
 *
 * @param payload
 * @returns
 */
const toJWT = (payload: IUser) => {
  return jwt.sign({ ...payload }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

const validateToken = (token: string) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;
    return { isValid: true, decoded };
  } catch (error) {
    return { isValid: false, decoded: null };
  }
};

export { toJWT, validateToken };
