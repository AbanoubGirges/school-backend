import express from "express";
import { getUsersDidNotAttend } from "../../../repo/usersDidNotAttendQueries.js";
import { getAllUsers } from "../../../repo/getAllUsersQueries.js";
const getAllUsersController = async (req: express.Request, res: express.Response) => {
    try{
        const isDidNotAttend = req.query.notAttend === "true";
        if(isDidNotAttend){
            const usersDidNotAttend = await getUsersDidNotAttend();
            if(usersDidNotAttend.length === 0){
                return res.status(200).json([]);
            }
            res.json(usersDidNotAttend);
        }else{
            const users = await getAllUsers();
            res.json(users);
        }
    }catch(error){
        console.log("Error fetching users:", error);
        res.status(500).json({error: "ERROR_FETCHING_USERS" });
    }
}
export default getAllUsersController;