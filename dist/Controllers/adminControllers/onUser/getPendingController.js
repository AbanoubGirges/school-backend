import { fetchPendingUsers } from "../../../repo/userModQueries.js";
const getPendingController = async (req, res) => {
    try {
        const pendingUsers = await fetchPendingUsers();
        res.status(200).json({ users: pendingUsers });
    }
    catch (err) {
        console.error("Error fetching pending users:", err);
        res.status(500).json({ error: "ERROR_FETCHING_PENDING_USERS" });
    }
};
export { getPendingController };
