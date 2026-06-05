import express from 'express';
import { verifyToken, isAdmin } from '../Middleware/authMiddleware.js';
import { 
    registerUserController, 
    deleteUserController, 
    deleteContentController 
} from '../Controllers/adminController.js';


const router = express.Router();

// כל הנתיבים בקובץ הזה ידרשו הרשאת אדמין
router.use(verifyToken);
router.use(isAdmin); 

router.post('/users/register', registerUserController);

router.delete('/users/:id', deleteUserController);

router.delete('/content/:type/:id', deleteContentController);

export default router;