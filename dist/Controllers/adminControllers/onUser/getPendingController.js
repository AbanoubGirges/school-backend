import { fetchPendingUsers } from "../../../repo/userModQueries.js";
import { getPfpUrl } from "../../../services/supabase/uploadPfp.js";
const getPendingController = async (req, res) => {
    try {
        const pendingUsers = await fetchPendingUsers();
        const formattedUsers = await Promise.all(pendingUsers.map(async (user) => ({
            id: user.id,
            name: user.name,
            registerDate: user.registerDate.toISOString(),
            pfpUrl: await getPfpUrl(user.id)
        })));
        res.status(200).json({ users: formattedUsers });
    }
    catch (err) {
        console.error("Error fetching pending users:", err);
        res.status(500).json({ error: "ERROR_FETCHING_PENDING_USERS" });
    }
};
export { getPendingController };
