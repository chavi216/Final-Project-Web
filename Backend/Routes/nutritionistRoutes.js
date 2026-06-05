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

router.use(verifyToken);
router.use(isNutritionist);

router.post('/food-plan', createFoodPlan);
router.put('/food-plan/:id', updateFoodPlan);
router.delete('/food-plan/:id', deleteFoodPlan);

router.get('/track/:clientId', trackClient);

router.post('/messages', sendMessage);
router.post('/blogs', createBlog);
router.post('/tasks', assignTask);

export default router;