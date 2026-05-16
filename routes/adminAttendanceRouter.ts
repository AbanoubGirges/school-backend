import express from 'express';
import authAdmin from '../middleware/authAdmin.js';
import { createAttendanceController } from '../Controllers/adminControllers/attendanceControllers/createAttendanceController.js';
import getAttendanceController from '../Controllers/adminControllers/attendanceControllers/getAttendanceController.js';
import { body } from "express-validator";
const adminAttendanceRouter = express.Router();
adminAttendanceRouter.use(authAdmin);
// adminAttendanceRouter.get('/attendance', getAttendanceController);
adminAttendanceRouter.post('/', [
  body('id').notEmpty().withMessage('User ID is required'),
  body('status').isIn(['PRESENT', 'ABSENT','EXCUSEDLATE','UNEXCUSEDLATE']).withMessage('Status is required')
], createAttendanceController);
adminAttendanceRouter.get('/:id', getAttendanceController);
export default adminAttendanceRouter;