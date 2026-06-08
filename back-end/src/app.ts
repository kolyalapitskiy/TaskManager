import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import taskRoutes from './routes/task.routes';
import authRoutes from './routes/auth.routes';
import { authenticateToken } from './middlewares/auth.middleware';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'https://front-end-production.up.railway.app',
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', authenticateToken, taskRoutes);

export default app;
