import express from 'express';
import { verifyToken, isAdmin } from '../Middleware/authMiddleware.js';
import { 
    registerUserController, 
    deleteUserController, 
    deleteContentController 
} from '../Controllers/adminController.js';


const router = express.Router();

// כל הנתיבים בקובץ הזה ידרשו הרשאת אדמין
// router.use(verifyToken);
// router.use(isAdmin); 

// רישום משתמש (לקוח/מאמן/תזונאי)
router.post('/users/register', registerUserController);

// מחיקת משתמש לפי ID
router.delete('/users/:id', deleteUserController);

// מחיקת תוכן (בלוג או סרטון) לפי סוג ו-ID
// לדוגמה ה-URL ייראה כך: DELETE /api/admin/content/blog/12
router.delete('/content/:type/:id', deleteContentController);

export default router;