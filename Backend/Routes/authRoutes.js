import express from 'express';
import { login, registerUser} from '../controllers/authController.js';

const router = express.Router();

// נתיב ההתחברות
router.post('/login', login);

// נתיב הרישום
router.post('/register', registerUser);

export default router;

