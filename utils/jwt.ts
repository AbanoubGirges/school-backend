import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { IUser } from "../models/userData.ts";
import { Role } from "@prisma/client";

/**
 * 
 * @param payload 
 * @returns 
 */
const toJWT = (payload: IUser) => {
  if (payload.role === Role.ADMIN) {
    return jwt.sign(payload, process.env.ADMIN_JWT_SECRET as string, { expiresIn: '30d' });
  }else
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '30d' });
};

const validateToken = (token: string,isAdmin: boolean) => {
  try {
    if (isAdmin) {
      const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET as string) as JwtPayload;
      return { isValid: true, decoded  };
    }else{
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
      return { isValid: true, decoded  };
    }
  } catch (error) {
    return { isValid: false, decoded: null };
  }
};

export {toJWT, validateToken};