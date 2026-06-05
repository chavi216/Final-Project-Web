// import * as authService from '../services/authService.js';

// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         // מעבירים את העבודה הקשה לסרוויס
//         const loginData = await authService.authenticateUser(email, password);

//         res.status(200).json({
//             message: 'Login successful',
//             token: loginData.token,
//             role: loginData.role
//         });
//     } catch (error) {
//         res.status(401).json({ error: error.message });
//     }
// };

// export const registerUser = async (req, res) => {
//     try {
//         const userData = req.body;
//         // קריאה ל-Service שמבצע הצפנת סיסמה והכנסה ל-DB
//         const newUser = await authService.registerUser(userData);

//         res.status(201).json({
//             message: 'User registered successfully',
//             userId: newUser.insertId
//         });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };


import * as authService from '../services/authService.js';

// 1. פונקציית התחברות (נשארת ללא שינוי)
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
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

// 2. פונקציית רישום משתמש חדש - מתוקנת!
export const registerUser = async (req, res) => {
    try {
        const userData = req.body;
        
        // 🌟 שינוי מ-authService.registerUser ל-authService.register כדי להתאים לסרוויס שלך!
        const newUser = await authService.register(userData);
        
        res.status(201).json({
            message: 'User registered successfully',
            userId: newUser.insertId
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};