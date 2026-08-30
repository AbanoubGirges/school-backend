import express from 'express';
import { validationResult } from 'express-validator';
import { postAssignment } from '../../repo/assignmentQueries.js';
import DurationExceededError from '../../utils/DurationExceededError.js';
const postAssignmentController= async (req:express.Request,res:express.Response)=>{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
    const assignmentId= req.params.id as string;
    const userId=req.user?.id;
    const answers=req.body?.answers;
  try{
    postAssignment(assignmentId,userId,answers);
    res.status(200).json({message:'ASSIGNMENT_POSTED_SUCCESSFULLY'});
  }catch(err){
    if (err instanceof DurationExceededError){
      return res.status(403).json({error:'ASSIGNMENT_DURATION_TIME_EXCEEDED'})
    }
    console.log(`Error posting the assignment: ${err}`);
    res.status(500).json({error:'FAILED_TO_POST_ASSIGNMENT'});
  }

}
export default postAssignmentController;