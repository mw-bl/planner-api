
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import viagemRoutes from './routes/viagemRoutes.js';
import userViagemRoutes from './routes/userViagemRoutes.js'

import atividadeRoutes from './routes/atividadeRoutes.js';

import cors from 'cors';

const app = express();

app.use(cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true 
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/', viagemRoutes);
app.use('/api/', userViagemRoutes);
app.use('/api/', atividadeRoutes);


export default app;
