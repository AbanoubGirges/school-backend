import express from 'express';
import {authUser} from '../middleware/authUser.js';
import getResultsController from '../Controllers/userControllers/getResultsController.js';
const resultsRouter = express.Router();
resultsRouter.get('/', authUser, getResultsController);
export default resultsRouter;