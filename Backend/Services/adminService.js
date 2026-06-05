import bcrypt from 'bcrypt';
import * as adminModel from '../Models/userModel.js';

export const registerUser = async (userData) => {
    const validRoles = ['client', 'admin', 'trainer', 'nutritionist'];
    if (!validRoles.includes(userData.role)) {
        throw new Error('Invalid user role provided');
    }

    if (!userData.password) {
        throw new Error('Password is required');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const securedUserData = {
        ...userData,
        password: hashedPassword
    };
    
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