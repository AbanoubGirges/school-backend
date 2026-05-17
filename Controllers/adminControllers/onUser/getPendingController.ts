import express from "express";
import { fetchPendingUsers } from "../../../repo/userModQueries.js";
const getPendingController=async(req:express.Request,res:express.Response)=>{
    try{
        const pendingUsers: { id: string; name: string }[] = await fetchPendingUsers();
        res.status(200).json({ users: pendingUsers });
    } catch (err) {
        console.error("Error fetching pending users:", err);
        res.status(500).json({ error: "ERROR_FETCHING_PENDING_USERS" });
    }
}
export {getPendingController};