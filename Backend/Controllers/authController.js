import * as authService from '../services/authService.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // מעבירים את העבודה הקשה לסרוויס
        const loginData = await authService.authenticateUser(email, password);
        
        res.status(200).json({ 
            message: 'Login successful', 
            token: loginData.token,
            role: loginData.role
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};