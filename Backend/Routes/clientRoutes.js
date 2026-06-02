import express from 'express';
import {verifyToken, isClient } from '../Middleware/authMiddleware.js';
import { 
    getInfo, 
    getVideos, 
    getBlogs, 
    getFoodPlan, 
    updateTask, 
    sendMessage 
} from '../controllers/clientController.js';

const router = express.Router();

// מפעילים את ההגנה - רק לקוחות עוברים
// router.use(verifyToken);
// router.use(isClient); 

// בקשות GET לשליפת נתונים לקריאה
router.get('/info', getInfo);
router.get('/videos', getVideos);
router.get('/blogs', getBlogs);
router.get('/food-plan', getFoodPlan);

// בקשת PUT לעדכון משימה (סיום אימון)
router.put('/tasks/:id', updateTask);

// בקשת POST לשליחת הודעה למאמן או לתזונאי
router.post('/messages', sendMessage);

export default router;