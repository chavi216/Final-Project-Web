import db from '../config/db.js';

export const createMessageInDB = async (messageData) => {
    const { from_ID, to_ID, body } = messageData;
    const query = `INSERT INTO Messages (from_ID, to_ID, body, is_read) VALUES (?, ?, ?, ?)`;
    const [result] = await db.query(query, [from_ID, to_ID, body, false]);
    return result;
};

export const createBlogInDB = async (blogData) => {
    const { blog_ID, User_ID, Title, body } = blogData;
    const query = `INSERT INTO Blogs (blog_ID, User_ID, Title, body) VALUES (?, ?, ?, ?)`;
    const [result] = await db.query(query, [blog_ID, User_ID, Title, body]);
    return result;
};

export const createTaskInDB = async (taskData) => {
    const { Body, Title, manager_ID, client_ID } = taskData;
    const query = `INSERT INTO Tasks (Body, Title, manager_ID, client_ID, completed) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await db.query(query, [Body, Title, manager_ID, client_ID, false]);
    return result;
};