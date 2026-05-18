import { getAttendanceByUserId } from "../../../repo/attendanceQueries.js";
const getAttendanceController = async (req, res) => {
    try {
        const userId = req.params.id;
        const attendanceRecords = await getAttendanceByUserId(userId);
        res.json(attendanceRecords);
    }
    catch (err) {
        console.error("Error fetching attendance records:", err);
        res.status(500).json({ error: "ERROR_GETTING_ATTENDANCE" });
    }
};
export default getAttendanceController;
