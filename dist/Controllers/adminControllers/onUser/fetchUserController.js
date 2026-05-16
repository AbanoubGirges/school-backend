import { fetchUserData } from "../../../repo/userDataQueries.js";
import { getPfpUrl } from "../../../services/supabase/uploadPfp.js";
const fetchUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = await fetchUserData(userId);
        if (!userData) {
            res.status(404).json({ message: "USER_NOT_FOUND" });
            return;
        }
        const pfpUrl = await getPfpUrl(userId);
        if (!pfpUrl) {
            res.status(404).json({ message: "PROFILE_PICTURE_NOT_FOUND" });
            return;
        }
        res.json({ ...userData, pfpUrl });
    }
    catch (err) {
        console.error("Error fetching user data:", err);
        res.status(500).json({ message: "ERROR_FETCHING_USER_DATA" });
    }
};
export { fetchUserController };
