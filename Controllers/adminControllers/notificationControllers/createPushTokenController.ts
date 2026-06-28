import express from "express";
import { validationResult } from "express-validator";
import { createPushToken } from "../../../repo/notificationQueries.js";
const createPushTokenController=(req:express.Request,res:express.Response)=>{
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
    try{
        const userId:string=req.user?.id;
    const {expoPushToken}=req.body;
    if (!userId){
        res.status(400).json({'error':'EXPECTED_USER_ID'})
    }
    const created=createPushToken(userId,expoPushToken);
    if (!created){
        res.status(500).json({'error':'FAILED_TO_SAVE_TOKEN'})
    }
    res.status(201).json({'message':'CREATED_PUSH_TOKEN'})
    }catch(err){
        console.log('error creating push token:',err)
        res.status(500).json({'error':'FAILED_TO_CREATE_PUSH_TOKEN'})
    }
};
export default createPushTokenController;