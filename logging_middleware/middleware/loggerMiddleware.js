import { Log } from '../services/logService.js';

export const loggerMiddleware = (req, res, next) => {
    res.on('finish', async () => {
        const message = `${req.method} ${req.originalUrl} - ${res.statusCode}`;
        const level = res.statusCode >= 400 ? 'error' : 'info';
        try {
            await Log('backend', level, 'logging_middleware', message);
        } catch (err) {
        }
    });
    next();
};

export const errorLoggerMiddleware = async (err, req, res, next) => {
    try {
        await Log('backend', 'error', 'logging_middleware', err.message || 'Internal Server Error');
    } catch (loggingErr) {
    }
    res.status(500).json({ error: 'Internal Server Error' });
};
