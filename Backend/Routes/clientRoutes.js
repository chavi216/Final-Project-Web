import express from 'express';
import {verifyToken, isClient } from '../Middleware/authMiddleware.js';
import { 
    getInfo, 
    getVideos, 
    getBlogs, 
    getFoodPlan, 
    getTasks, // <-- הוספנו את הייבוא של פונקציית שליפת המשימות
    updateTask, 
    sendMessage 
} from '../controllers/clientController.js';

const router = express.Router();

// מפעילים את ההגנה - רק לקוחות עוברים
router.use(verifyToken);
router.use(isClient); 

// בקשות GET לשליפת נתונים לקריאה
router.get('/info', getInfo);
router.get('/videos', getVideos);
router.get('/blogs', getBlogs);
router.get('/food-plan', getFoodPlan);
router.get('/tasks', getTasks); // <-- התוספת החשובה! בלעדיה הפרונטאנד יקרוס ויחזיר 404 על המשימות

// בקשת PUT לעדכון משימה (סיום אימון)
router.put('/tasks/:id', updateTask);

// בקשת POST לשליחת הודעה למאמן או לתזונאי
router.post('/messages', sendMessage);

export default router;