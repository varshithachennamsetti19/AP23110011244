import express from 'express';
import { testLog } from '../controllers/logController.js';

const router = express.Router();

router.get('/test', testLog);

export default router;
