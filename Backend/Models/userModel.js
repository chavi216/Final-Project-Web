import db from '../config/db.js';

export const createUserInDB = async (userData) => {
    const { ID, name, email, password, role, address, phone_number } = userData;
    const query = `INSERT INTO Users (ID, name, email, password, role, address, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await db.query(query, [ID, name, email, password, role, address, phone_number]);
    return result;
};

export const deleteUserFromDB = async (userId) => {
    const query = `DELETE FROM Users WHERE ID = ?`;
    const [result] = await db.query(query, [userId]);
    return result;
};

export const deleteBlogFromDB = async (blogId) => {
    const query = `DELETE FROM Blogs WHERE blog_ID = ?`;
    const [result] = await db.query(query, [blogId]);
    return result;
};

export const deleteVideoFromDB = async (videoId) => {
    const query = `DELETE FROM FitnessVideos WHERE video_ID = ?`;
    const [result] = await db.query(query, [videoId]);
    return result;
};