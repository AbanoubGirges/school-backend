import { validationResult } from "express-validator";
import { updateUserStatus } from "../../../repo/userModQueries.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
const updateStatusController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const userId = req.params.id;
        const { status } = req.body;
        await updateUserStatus(userId, status);
        res.status(200).json({ message: "Status updated successfully" });
    }
    catch (err) {
        if (err instanceof PrismaClientKnownRequestError && err.code === "P2025") {
            res.status(404).json({ message: "USER_NOT_FOUND" });
            return;
        }
        res.status(500).json({ message: "ERROR_UPDATING_STATUS" });
    }
};
export { updateStatusController };
