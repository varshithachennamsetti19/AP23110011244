import express from 'express';
import { scheduleVehicles } from '../controllers/vehicleController.js';

const router = express.Router();

router.get('/schedule', scheduleVehicles);

export default router;
