import express from "express";
import { updateUserRole } from "../../../repo/userModQueries.ts";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
const updateRoleController = async (req: express.Request, res: express.Response) => {
  try {
    const userId = req.params.id as string;
    const { role } = req.body;
    await updateUserRole(userId, role);
    res.status(200).json({ message: "User role updated successfully" });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2025") {
          res.status(404).json({ message: "USER_NOT_FOUND" });
          return;
        }
    console.error("Error updating user role:", err);
    res.status(500).json({ message: "ERROR_UPDATING_USER_ROLE" });
  }
}
export default updateRoleController;