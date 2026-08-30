import express from 'express';
import { validationResult } from 'express-validator';
import assignmentResultNotificationService from '../../../services/notifications/assignmentResultNotificationService.js';
const sendAssignmentResultController=async(req:express.Request,res:express.Response)=>{
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const assignmentTitle=req.body.assignmentTitle;
    try{
        console.log("A️⃣ CONTROLLER BEFORE SERVICE");
    await assignmentResultNotificationService(assignmentTitle);
    console.log("B️⃣ CONTROLLER AFTER SERVICE");
    res.status(200).json({message:'notification sent successfully'});
    }catch(error){
        console.log(`Error notifying assignmnt result: ${error}`);
        res.status(500).json({error:'FAILED_TO_NOTIFY_ASSIGNMENT_RESULT'});
    }
}
export default sendAssignmentResultController;