import express from "express";
import { getUsersDidNotAttend } from "../../../repo/usersDidNotAttendQueries.js";
import { getAllUsers } from "../../../repo/getAllUsersQueries.js";
const getAllUsersController = (req: express.Request, res: express.Response) => {
    try{
        const isDidNotAttend = req.query.notAttend === "true";
        if(isDidNotAttend){
            const usersDidNotAttend = getUsersDidNotAttend();
            res.json(usersDidNotAttend);
        }else{
            const users = getAllUsers();
            res.json(users);
        }
    }catch(error){
        console.log("Error fetching users:", error);
        res.status(500).json({message: "Error fetching users"});
    }
}
export default getAllUsersController;