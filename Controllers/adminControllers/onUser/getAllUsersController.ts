import express from "express";
import { getUsersDidNotAttend } from "../../../repo/usersDidNotAttendQueries.js";
import { getAllUsers } from "../../../repo/getAllUsersQueries.js";
const getAllUsersController = async (req: express.Request, res: express.Response) => {
    try{
        const isDidNotAttend = req.query.notAttend === "true";
        if(isDidNotAttend){
            const usersDidNotAttend = await getUsersDidNotAttend();
            if(usersDidNotAttend.length === 0){
                return res.status(404).json({message: "No users found who did not attend today"});
            }
            res.json(usersDidNotAttend);
        }else{
            const users = await getAllUsers();
            res.json(users);
        }
    }catch(error){
        console.log("Error fetching users:", error);
        res.status(500).json({message: "Error fetching users"});
    }
}
export default getAllUsersController;