import express from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { insertUser } from "../../repo/authQueries.ts";
import { toJWT } from "../../utils/jwt.ts";
import type { IUser, IUserDetails } from "../../models/userData.ts";
import { uploadPfp } from "../../services/supabase/uploadPfp.ts";
import { deletePfp } from "../../services/supabase/uploadPfp.ts";
import { v4 as uuidv4 } from "uuid";
import { Prisma } from "@prisma/client";
const registerController = async (
  req: express.Request,
  res: express.Response,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  req.body.id = uuidv4();
  if (req.file) {
    const uploaded = await uploadPfp(req.file.buffer, req.body.id);
    if (uploaded instanceof Error || !uploaded) {
      console.error("Error uploading profile picture:", uploaded);
      res.status(500).json({ message: "ERROR_UPLOADING_PROFILE_PICTURE" });
      return;
    }
    const { pfpUrl } = uploaded;
    req.body.pfpUrl = pfpUrl;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const destructuredBody = {
    id: req.body.id,
    userName: req.body.userName,
    password: hashedPassword,
    name: req.body.name,
    gender: req.body.gender,
    birthdate: new Date(req.body.birthdate),
    address: req.body.address,
    whatsapp: req.body.whatsapp,
    phoneNumber: req.body.phoneNumber,
    homeNumber: req.body.homeNumber,
    schoolName: req.body.schoolName,
    educationType: req.body.educationType,
    educationYear: parseInt(req.body.educationYear, 10),
    confessionFather: req.body.confessionFather,
    liturgyDate: new Date(req.body.liturgyDate),
    servantPrepYear: req.body.servantPrepYear,
    serviceType: req.body.serviceType,
  };
  try {
    const userData: IUser | null = await insertUser(destructuredBody);
    if (userData) {
      const token = toJWT({ ...userData, pfpUrl: req.body.pfpUrl });
      res.status(201).json({ message: "USER_REGISTERED", token });
    }
  } catch (err) {
    const deleteResult = await deletePfp(req.body.id);
    if (deleteResult instanceof Error) {
      console.error(
        "Error deleting profile picture after failed registration:",
        deleteResult,
      );
    }
    console.error("Error registering user:", err);

    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      const field = (err.meta?.target as string[])?.[0];
      res.status(409).json({
        error: `${field.replace(/[\\"]/g, "").toUpperCase()}_ALREADY_EXISTS`,
      });
      return;
    }

    res.status(500).json({ message: "ERROR_REGISTERING_USER" });
  }
};

export default registerController;
