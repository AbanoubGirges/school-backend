import express from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { insertUser } from "../../repo/authQueries.ts";
import {toJWT} from "../../utils/jwt.ts";
import type {IUser,IUserDetails} from "../../models/userData.ts";
const registerController = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const destructuredBody ={
    "id": req.body.id,
    "userName": req.body.userName,
    "password": req.body.password,
    "name": req.body.name,
    "gender": req.body.gender,
    "birthdate": req.body.birthdate,
    "address": req.body.address,
    "whatsapp": req.body.whatsapp,
    "phoneNumber": req.body.phoneNumber,
    "homeNumber": req.body.homeNumber,
    "schoolName": req.body.schoolName,
    "eductaionType": req.body.eductaionType,
    "educationYear": req.body.educationYear,
    "confessionFather": req.body.confessionFather,
    "litrugyDate": req.body.litrugyDate,
    "servantPrepYear": req.body.servantPrepYear,
    "serviceType": req.body.serviceType,
    "profilePicturePath": req.body.profilePicturePath
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;

  try {
    const userData: IUser | null = await insertUser(destructuredBody);
    if (userData) {
      const token = toJWT(userData);
      res.status(201).json({ message: "USER_REGISTERED", token });
    }
  } catch (err) {
    console.error("Error registering user:", err);
    res
      .status(500)
      .json({ message: "ERROR_REGISTERING_USER" });
  }
};

export default registerController;
