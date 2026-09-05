import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { IUser } from "../models/userData.js";
import { Role } from "@prisma/client";
import { deletePushToken, deleteWebPushSubscription } from "../repo/notificationQueries.js";

/**
 *
 * @param payload
 * @returns
 */
const toJWT = (payload: IUser) => {
  return jwt.sign({ ...payload }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

const validateToken = async (token: string) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    return {
      isValid: true,
      decoded,
    };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      const decoded = jwt.decode(token) as JwtPayload | null;

      if (decoded?.id) {
        await deletePushToken(decoded.id);
        await deleteWebPushSubscription(decoded.id);
      }
    }

    return {
      isValid: false,
      decoded: null,
    };
  }
};

export { toJWT, validateToken };
