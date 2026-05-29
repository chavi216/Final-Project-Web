import express from 'express';
import dotenv from 'dotenv';

import adminRoutes from './routes/adminRoutes.js'; 
import nutritionistRoutes from './Routes/nutritionistRoutes.js';
import trainerRoutes from './routes/trainerRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import authRoutes from './routes/authRoutes.js';



dotenv.config();
const app = express();
app.use(express.json());

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