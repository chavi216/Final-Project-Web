import express from 'express';
import {verifyToken, isNutritionist } from '../Middleware/authMiddleware.js';
import { 
    createFoodPlan, 
    updateFoodPlan, 
    deleteFoodPlan, 
    trackClient, 
    sendMessage, 
    assignTask,
    createBlog 
} from '../controllers/nutritionistController.js';

const router = express.Router();

// נגן על כל הנתיבים - רק תזונאי (או אדמין) מורשה לגשת אליהם
router.use(verifyToken);
router.use(isNutritionist);

// ניהול תוכניות תזונה
router.post('/food-plan', createFoodPlan);
router.put('/food-plan/:id', updateFoodPlan);
router.delete('/food-plan/:id', deleteFoodPlan);

// מעקב לקוח - שליפת נתונים לפי ID של הלקוח
router.get('/track/:clientId', trackClient);

// פעולות משותפות (שימוש במודלים המשותפים)
router.post('/messages', sendMessage);
router.post('/blogs', createBlog);
router.post('/tasks', assignTask);

export default router;