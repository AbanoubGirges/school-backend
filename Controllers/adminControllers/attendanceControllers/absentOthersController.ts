import express, { Request, Response } from "express";
import { markAbsentForUsers } from "../../../repo/attendanceQueries.js";
const markAbsentForUsersController = async (req: Request, res: Response) => {
    try {
        const { userIds } = req.body;
        if (!Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ error: "USER_IDS_ARRAY_REQUIRED" });
        }
        await markAbsentForUsers(userIds);
        res.status(200).json({ message: "Users marked as absent successfully" });
    }catch (error) {
        console.error("Error marking users as absent:", error);
        res.status(500).json({ error: "ERROR_MARKING_USERS_ABSENT" });
    }
}
export default markAbsentForUsersController;