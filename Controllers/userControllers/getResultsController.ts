import express from 'express';
import {fetchResultsByUserId} from '../../repo/resultsQueries.js';
const getResultsController = async (req: express.Request, res: express.Response) => {
  try {
    const userId =req.user?.role==='ADMIN'||req.user?.role==='SUDO'? req.params.id:req.user?.id; // Assuming the user ID is stored in req.user after authentication
    if (!userId) {
      return res.status(400).json({ message: 'USER_ID_MISSING' });
    }
    const results = await fetchResultsByUserId(userId);
    return res.status(200).json({ results });
    } catch (error) {
    console.error('Error fetching results:', error);
    return res.status(500).json({ message: 'FAILED_TO_FETCH_RESULTS' });
  }
};
export default getResultsController;