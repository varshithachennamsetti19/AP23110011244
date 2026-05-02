import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import notificationRoutes from './routes/notificationRoutes.js';
import { loggerMiddleware, errorLoggerMiddleware } from './middleware/loggerMiddleware.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use(loggerMiddleware);

app.use('/notifications', notificationRoutes);

app.use(errorLoggerMiddleware);

const PORT = process.env.PORT || 3002;

connectDB().then(() => {
    app.listen(PORT, () => {
        process.stdout.write(`Server running on port ${PORT}\n`);
    });
}).catch(() => {
    process.exit(1);
});
