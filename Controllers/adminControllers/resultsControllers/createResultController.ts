import express from "express";
import { fetchUserData } from "../../../repo/userDataQueries.js";
import { validationResult } from "express-validator";
import { createResult } from "../../../repo/resultsQueries.js";
import emitter from "../../../services/events/eventInstance.js";
import { Prisma } from "@prisma/client";
const createResultController = async (
  req: express.Request,
  res: express.Response,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { userId, subject } = req.body;
  try {
    const user = await fetchUserData(userId);
    if (!user) {
      return res.status(404).json({ message: "USER_NOT_FOUND" });
    }else if(user.role==='ADMIN'||user.role==='SUDO'){
      return res.status(403).json({error:'CANNOT_ADD_RESULTS_TO_ADMINS'})
    }
    await createResult(userId, subject);
    emitter.emit("newResult", userId, subject);
    res.status(201).json({ message: "RESULT_CREATED_SUCCESSFULLY" });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const field = (error.meta?.target as string[])?.[0];

      res.status(409).json({
        error: `${field.replace(/[\\"]/g, "").toUpperCase()}_ALREADY_EXISTS`,
      });
      return;
    }
    res.status(500).json({ error: "FAILED_TO_CREATE_RESULT" });
  }
};
export default createResultController;
