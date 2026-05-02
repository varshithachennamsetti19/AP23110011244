import express from 'express';
import dotenv from 'dotenv';
import { loggerMiddleware, errorLoggerMiddleware } from './middleware/requestMiddleware.js';
import vehicleRoutes from './routes/vehicleRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use(loggerMiddleware);
app.use('/api', vehicleRoutes);
app.use(errorLoggerMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    process.stdout.write(`Server running on port ${PORT}\n`);
});
