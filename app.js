// app.js
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import viagemRoutes from './routes/viagemRoutes.js';

import atividadeRoutes from './routes/atividadeRoutes.js';

import cors from 'cors';

const app = express();

// Configurar CORS
app.use(cors({
    origin: "http://localhost:3001", // Permite apenas essa origem
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true // Se estiver usando autenticação com cookies
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/', viagemRoutes);

app.use('/api/', atividadeRoutes);


export default app;