import express from 'express';
import {validationResult} from 'express-validator';
import {makeAdmin} from '../../../repo/editAdminsQueries.js';
import {removeAdmin} from '../../../repo/editAdminsQueries.js';
import { fetchUserByUsername } from '../../../repo/authQueries.js';
import bcrypt from 'bcryptjs';
import { fetchUserNameAndPassword } from '../../../repo/userDataQueries.js';
const createAdminController= async (req:express.Request,res:express.Response)=>{
    try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {userId}= req.body;
    const adminId:string=req.user?.id;
    const user = await fetchUserNameAndPassword(adminId);
    if (!user) {
      res.status(401).json({ error: "USER_NOT_FOUND" });
      return;
    }
    const [_,password]=user;
    const isPasswordValid = await bcrypt.compare(req.body.password, password);
        if (!isPasswordValid) {
          res.status(404).json({ error: "INVALID_CREDENTIALS" });
          return;
        }

        makeAdmin(userId);
        return res.status(200).json({ message: 'USER_MADE_ADMIN_SUCCESSFULLY' });
    } catch (error) {
        console.error('Error making user an admin:', error);
        return res.status(500).json({ error: 'FAILED_TO_MAKE_ADMIN' });
    }
}
const removeAdminController = async (req:express.Request,res:express.Response)=>{
    try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {userId}= req.body;
    const user = await fetchUserByUsername(req.user?.userName);
        if (!user) {
          res.status(401).json({ error: "User not found" });
          return;
        }
        const [_,password]=user;
        const isPasswordValid = await bcrypt.compare(req.body.password, password);
            if (!isPasswordValid) {
              res.status(404).json({ error: "INVALID_CREDENTIALS" });
              return;
            }
    
        // Assuming you have a function to remove admin privileges in your database
        removeAdmin(userId);
        return res.status(200).json({ error: 'ADMIN_PRIVILEGES_REMOVED_SUCCESSFULLY' });
    } catch (error) {
        console.error('Error removing admin privileges:', error);
        return res.status(500).json({ error: 'FAILED_TO_REMOVE_ADMIN' });
    }
}
export {createAdminController, removeAdminController};