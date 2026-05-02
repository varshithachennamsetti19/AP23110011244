import express from 'express';
import {
    createNotification,
    getAllNotifications,
    getStudentNotifications,
    markAsRead,
    deleteNotification
} from '../controllers/notificationController.js';

const router = express.Router();

router.post('/', createNotification);
router.get('/', getAllNotifications);
router.get('/:studentId', getStudentNotifications);
router.put('/:id/read', markAsRead);
router.delete('/:id', deleteNotification);

export default router;
