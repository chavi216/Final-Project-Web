// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import * as authModel from '../models/authModel.js';

// export const authenticateUser = async (email, password) => {
//     const user = await authModel.getUserByEmailFromDB(email);
//     if (!user) {
//         throw new Error('User not found');
//     }

//     // 🕵️‍♀️ שורת הריגול - מדפיסה לטרמינל את מה שהיא קיבלה מ-Postman ואת מה שיש במסד הנתונים
//     console.log("=== DEBUG INFO ===");
//     console.log("Password from Postman:", password);
//     console.log("Password from DB:", user.password);
//     console.log("==================");

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         throw new Error('Invalid credentials');
//     }

//     const token = jwt.sign(
//         { ID: user.ID, role: user.role },
//         process.env.JWT_SECRET,
//         { expiresIn: '2h' }
//     );

//     return { token, role: user.role };
// };

import * as authModel from '../models/authModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// 1. פונקציית הלוגין הקיימת שלך (נשארת ללא שינוי)
export const authenticateUser = async (email, password) => {
    const user = await authModel.findUserByEmail(email);
    if (!user) {
        throw new Error('משתמש זה אינו קיים במערכת');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('סיסמה שגויה, נסה שנית');
    }

    // יצירת Token חתום המכיל את ה-ID והתפקיד של המשתמש
    const token = jwt.sign(
        { id: user.ID, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { token, role: user.role };
};

// 🌟 2. הפונקציה החדשה שהייתה חסרה וגרמה לשגיאה!
export const register = async (userData) => {
    // א. בדיקה האם האימייל כבר תפוס במערכת
    const existingUser = await authModel.getUserByEmail(userData.email);
    if (existingUser) {
        throw new Error('כתובת האימייל הזו כבר רשומה במערכת');
    }

    // ב. הצפנת הסיסמה לפני שמירה במסד הנתונים
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // ג. הכנת האובייקט הסופי לשליחה למודל
    const finalUserData = {
        ...userData,
        password: hashedPassword // החלפת הסיסמה הגולמית בסיסמה המוצפנת
    };

    // ד. קריאה למודל שיבצע את ה-INSERT לתוך טבלת Users
    return await authModel.register(finalUserData);
};