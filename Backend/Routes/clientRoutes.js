import express from 'express';
import {verifyToken, isClient } from '../Middleware/authMiddleware.js';
import { 
    getInfo, 
    getVideos, 
    getBlogs, 
    getFoodPlan, 
    getTasks,
    getMessages,
    updateTask, 
    sendMessage,
    getProfessionals, 
    updateTeam 
} from '../controllers/clientController.js';

const router = express.Router();

// מפעילים את ההגנה - רק לקוחות עוברים
router.use(verifyToken);
router.use(isClient); 

router.get('/info', getInfo);
router.get('/videos', getVideos);
router.get('/blogs', getBlogs);
router.get('/food-plan', getFoodPlan);
router.get('/tasks', getTasks); 

router.put('/tasks/:id', updateTask);

router.get('/professionals', getProfessionals);
router.put('/team', updateTeam);

router.post('/messages', sendMessage);
router.get('/messages/:contactId', getMessages);

export default router;