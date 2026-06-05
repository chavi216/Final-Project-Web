import express from 'express';
import {verifyToken, isTrainer } from '../Middleware/authMiddleware.js';
import { 
    uploadVideo, 
    updateVideo, 
    deleteVideo, 
    trackClient, 
    sendMessage, 
    assignTask,
    createBlog 
} from '../controllers/trainerController.js';

const router = express.Router();
    
router.use(verifyToken);
router.use(isTrainer); // הגנה - רק מאמנים נכנסים

router.post('/videos', uploadVideo);
router.put('/videos/:id', updateVideo);
router.delete('/videos/:id', deleteVideo);

router.get('/track/:clientId', trackClient);

router.post('/messages', sendMessage);
router.post('/blogs', createBlog);
router.post('/tasks', assignTask);

export default router;