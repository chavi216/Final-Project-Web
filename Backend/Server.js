import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 

import adminRoutes from './Routes/adminRoutes.js';
import nutritionistRoutes from './Routes/nutritionistRoutes.js';
import trainerRoutes from './Routes/trainerRoutes.js';
import clientRoutes from './Routes/clientRoutes.js';
import authRoutes from './Routes/authRoutes.js';

dotenv.config();
const app = express();

app.use(cors()); 
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/admin', adminRoutes);
app.use('/api/nutritionist', nutritionistRoutes);
app.use('/api/trainer', trainerRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});