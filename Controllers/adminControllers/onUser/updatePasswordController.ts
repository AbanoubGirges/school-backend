import express from "express";
import { updatePassword } from "../../../repo/userModQueries.js";
const updatePasswordController=async(req:express.Request,res:express.Response)=>{
    const {newPassword,requestId}=req.body;
    try{
        await updatePassword(requestId,newPassword);
        res.status(200).json({message:'PASSWORD_UPDATED_SUCCESSFULLY'});
    }catch(error){
        console.log(`Failed to update password: ${error}`);
        res.status(500).json({error:'FAILED_TO_UPDATE_PASSWORD'});
    }}
export default updatePasswordController;