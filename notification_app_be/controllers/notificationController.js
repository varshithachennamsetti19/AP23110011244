import Notification from '../models/Notification.js';

export const createNotification = async (req, res, next) => {
    try {
        const { studentId, message, type } = req.body;
        if (!studentId || !message || !type) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const newNotification = new Notification({ studentId, message, type });
        const savedNotification = await newNotification.save();
        res.status(201).json(savedNotification);
    } catch (err) {
        next(err);
    }
};

export const getAllNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (err) {
        next(err);
    }
};

export const getStudentNotifications = async (req, res, next) => {
    try {
        const { studentId } = req.params;
        const notifications = await Notification.find({ studentId });
        res.status(200).json(notifications);
    } catch (err) {
        next(err);
    }
};

export const markAsRead = async (req, res, next) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(
            id,
            { read: true },
            { new: true, runValidators: true }
        );
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        res.status(200).json(notification);
    } catch (err) {
        next(err);
    }
};

export const deleteNotification = async (req, res, next) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndDelete(id);
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (err) {
        next(err);
    }
};
