import { Log } from '../services/logService.js';

export const testLog = async (req, res, next) => {
    try {
        await Log('backend', 'info', 'logging_middleware', 'Test log endpoint hit');
        res.status(200).json({ status: 'Log sent' });
    } catch (err) {
        next(err);
    }
};
