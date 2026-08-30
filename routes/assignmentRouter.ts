import express from "express";
import { authUser } from "../middleware/authUser.js";
import { getAllAssignments ,getAssignmentById} from "../repo/assignmentQueries.js";
import {body} from 'express-validator';
import postAssignmentController from "../Controllers/assignmentControllers/postAssignmentController.js";
const assignmentRouter = express.Router();
assignmentRouter.use(authUser);
assignmentRouter.get("/", async (req, res) => {
  try {
    const assignments=await getAllAssignments();
    res.status(200).json(assignments);
  } catch (err) {
    console.log(`Error getting assignments: ${err}`)
    res.status(500).json({error:'FAILED_TO_GET_ASSIGNMENTS'})
  }
});
assignmentRouter.get('/:id',async (req,res)=>{
    const assignmentId=req.params.id;
    try{
        const assignment=await getAssignmentById(assignmentId);
        if(!assignment){
            res.status(404).json({error:'ASSIGNMENT_NOT_FOUND'});
        }
        res.status(200).json(assignment);
    }catch(err){
        console.log(`Error getting assignment: ${err}`);
        res.status(500).json({error:'FAILED_TO_GET_ASSIGNMENT'});
    }
});
assignmentRouter.post('/:id',[body('assignmentId').notEmpty().withMessage('Assignment ID is required'),body('answers').isArray({min:1}),body('answers.*.questionId').notEmpty().withMessage('Question Id is required'),body('answers.*.answerId').notEmpty().withMessage('Answer Id is required')],postAssignmentController)
export default assignmentRouter;