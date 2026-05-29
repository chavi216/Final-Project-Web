import bcrypt from 'bcrypt';
import * as adminModel from '../Models/userModel.js';

export const registerUser = async (userData) => {
    // 1. בדיקת תפקיד
    const validRoles = ['client', 'admin', 'trainer', 'nutritionist'];
    if (!validRoles.includes(userData.role)) {
        throw new Error('Invalid user role provided');
    }

    // 2. מוודאים שיש סיסמה
    if (!userData.password) {
        throw new Error('Password is required');
    }

    // 3. הצפנת הסיסמה! (החלק שהיה חסר)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // 4. יצירת אובייקט חדש שהסיסמה בו היא מוצפנת
    const securedUserData = {
        ...userData,
        password: hashedPassword
    };
    
    // 5. שליחה למסד הנתונים של האובייקט המאובטח
    return await adminModel.createUserInDB(securedUserData);
};

export const removeUser = async (userId, currentAdminId) => {
    if (userId === currentAdminId) {
        throw new Error('Admin cannot delete their own account');
    }

    const result = await adminModel.deleteUserFromDB(userId);
    if (result.affectedRows === 0) {
        throw new Error('User not found');
    }
    return result;
};

export const removeContent = async (contentType, contentId) => {
    let result;
    
    if (contentType === 'blog') {
        result = await adminModel.deleteBlogFromDB(contentId);
    } else if (contentType === 'video') {
        result = await adminModel.deleteVideoFromDB(contentId);
    } else {
        throw new Error('Invalid content type');
    }

    if (result.affectedRows === 0) {
        throw new Error('Content not found');
    }
    return result;
};