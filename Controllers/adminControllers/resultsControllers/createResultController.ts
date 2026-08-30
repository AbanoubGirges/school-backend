import express from 'express';
import { fetchUserData } from '../../../repo/userDataQueries.js';
import { validationResult } from 'express-validator';
import { createResult } from '../../../repo/resultsQueries.js';
const createResultController = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    const { userId, subject } = req.body;
  try {
    const user = await fetchUserData(userId);
    if (!user) {
      return res.status(404).json({ message: 'USER_NOT_FOUND' });
    }
    await createResult(userId, subject);
    res.status(201).json({ message: 'RESULT_CREATED_SUCCESSFULLY' });
  }catch (error) {
    res.status(500).json({ error: 'FAILED_TO_CREATE_RESULT' });
  }
}
export default createResultController;