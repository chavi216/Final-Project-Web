import express from 'express';
import { verifyToken, isAdmin } from '../Middleware/authMiddleware.js';
import { 
    registerUserController, 
    deleteUserController, 
    deleteContentController,
    getAllUsersController,     
    getAllContentController    
} from '../Controllers/adminController.js';
console.log("ADMIN ROUTES LOADED");
const router = express.Router(); 

router.use(verifyToken);
router.use(isAdmin); 

// נתיבי שליפת נתונים לאדמין
router.get('/users', getAllUsersController);
router.get('/content/:type', getAllContentController);

// נתיבי יצירה ומחיקה
router.post('/users/register', registerUserController);
router.delete('/users/:id', deleteUserController);
router.delete('/content/:type/:id', deleteContentController);

export default router;