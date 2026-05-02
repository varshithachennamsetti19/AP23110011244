import express from 'express';
import dotenv from 'dotenv';
import { loggerMiddleware, errorLoggerMiddleware } from './middleware/loggerMiddleware.js';
import logRoutes from './routes/logRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use(loggerMiddleware);
app.use('/api/logs', logRoutes);
app.use(errorLoggerMiddleware);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
});
