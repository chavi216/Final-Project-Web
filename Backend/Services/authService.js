import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as authModel from '../models/authModel.js';

export const authenticateUser = async (email, password) => {
    const user = await authModel.getUserByEmailFromDB(email);
    if (!user) {
        throw new Error('User not found');
    }

    // 🕵️‍♀️ שורת הריגול - מדפיסה לטרמינל את מה שהיא קיבלה מ-Postman ואת מה שיש במסד הנתונים
    console.log("=== DEBUG INFO ===");
    console.log("Password from Postman:", password);
    console.log("Password from DB:", user.password);
    console.log("==================");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
        { ID: user.ID, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );

    return { token, role: user.role };
};