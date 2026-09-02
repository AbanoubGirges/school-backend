import express from 'express';
import { fetchResetPasswordRequests } from '../../../repo/userModQueries.js';
const getResetPasswordRequestsController=async(req:express.Request,res:express.Response)=>{
    try{
        const resetPasswordRequests=await fetchResetPasswordRequests();
        res.status(200).json(resetPasswordRequests);
    }catch(error){
        console.log(`Failed to get reset password requests: ${error}`);
        res.status(500).json({error:'FAILED_TO_GET_RESET_PASSWORD_REQUESTS'});
    }
}
export default getResetPasswordRequestsController;