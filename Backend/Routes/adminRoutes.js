import express from 'express';
import { verifyToken, isAdmin } from '../Middleware/authMiddleware.js';
import { 
    registerUserController, 
    deleteUserController, 
    deleteContentController,
    getAllUsersController,     // ייבוא חדש שהיה חסר
    getAllContentController    // ייבוא חדש שהיה חסר
} from '../Controllers/adminController.js';

const router = express.Router(); // קודם כל מגדירים את הראוטר

// כל הנתיבים בקובץ הזה ידרשו הרשאת אדמין (חובה לשים את זה לפני הנתיבים)
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