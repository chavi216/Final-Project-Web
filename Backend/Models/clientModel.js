import db from '../config/db.js';

export const getClientInfoFromDB = async (client_ID) => {
    const query = `SELECT ID, name, email, role, address, phone_number FROM Users WHERE ID = ?`;
    const [rows] = await db.query(query, [client_ID]);
    return rows[0];
};

export const getClientVideosFromDB = async (client_ID) => {
    const query = `SELECT * FROM FitnessVideos WHERE To_ID = ? OR To_ID IS NULL ORDER BY video_ID DESC`;
    const [rows] = await db.query(query, [client_ID]);
    return rows;
};

export const getAllBlogsFromDB = async () => {
    const query = `SELECT * FROM Blogs ORDER BY blog_ID DESC`;
    const [rows] = await db.query(query);
    return rows;
};

export const getClientFoodPlanFromDB = async (client_ID) => {
    const query = `SELECT * FROM FoodLog WHERE To_ID = ? ORDER BY date DESC`;
    const [rows] = await db.query(query, [client_ID]);
    return rows;
};

export const updateTaskCompletionInDB = async (Task_ID, client_ID, completed) => {
    const query = `UPDATE Tasks SET completed = ? WHERE Task_ID = ? AND client_ID = ?`;
    const [result] = await db.query(query, [completed, Task_ID, client_ID]);
    return result;
};

export const fetchChatHistory = async (clientId, contactId) => {
    const [messages] = await db.query(
        `SELECT * FROM Messages 
         WHERE (from_ID = ? AND to_ID = ?) OR (from_ID = ? AND to_ID = ?) 
         ORDER BY created_at ASC`,
        [clientId, contactId, contactId, clientId]
    );
    return messages;
};