import express from 'express';
import {validationResult} from 'express-validator';
import {makeAdmin} from '../../../repo/editAdminsQueries.js';
import {removeAdmin} from '../../../repo/editAdminsQueries.js';
const createAdminController= async (req:express.Request,res:express.Response)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {userId}= req.body;
    try {
        makeAdmin(userId);
        return res.status(200).json({ message: 'USER_MADE_ADMIN_SUCCESSFULLY' });
    } catch (error) {
        console.error('Error making user an admin:', error);
        return res.status(500).json({ error: 'FAILED_TO_MAKE_ADMIN' });
    }
}
const removeAdminController = async (req:express.Request,res:express.Response)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {userId}= req.body;
    try {
        // Assuming you have a function to remove admin privileges in your database
        removeAdmin(userId);
        return res.status(200).json({ error: 'ADMIN_PRIVILEGES_REMOVED_SUCCESSFULLY' });
    } catch (error) {
        console.error('Error removing admin privileges:', error);
        return res.status(500).json({ error: 'FAILED_TO_REMOVE_ADMIN' });
    }
}
export {createAdminController, removeAdminController};