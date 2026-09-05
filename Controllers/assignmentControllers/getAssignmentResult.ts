import express from 'express';
import { assignmentResult, getAssignmentById } from '../../repo/assignmentQueries.js';
const getAssignmentResultController=async(req:express.Request,res:express.Response)=>{
    const userId =req.user?.role==='ADMIN'||req.user?.role==='SUDO' ?  req.params.userId:req.user?.id;
    const assignmentId:string=req.params.id as string;
    try{
        const endDate=(await getAssignmentById(assignmentId))?.endDate;
        if(!endDate||new Date()<endDate){
            return res.status(403).json({error:'ASSIGNMENT_RESULT_NOT_READY_YET'})
        }
        const results=assignmentResult(userId,assignmentId);
        res.status(200).json(results);
    }catch(error){
        console.log(`Failed to get assignment result: ${error}`);
        res.status(500).json({error:'FAILED_TO_GET_ASSIGNMENT_RESULT'});
    }
}
export default getAssignmentResultController;