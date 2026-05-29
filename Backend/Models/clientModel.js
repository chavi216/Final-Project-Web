import db from '../config/db.js';

export const getClientInfoFromDB = async (client_ID) => {
    // שולפים את המידע האישי בלי הסיסמה
    const query = `SELECT ID, name, email, role, address, phone_number FROM Users WHERE ID = ?`;
    const [rows] = await db.query(query, [client_ID]);
    return rows[0];
};

export const getClientVideosFromDB = async (client_ID) => {
    // מביא גם סרטונים אישיים וגם כלליים
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
    // אבטחה: מוודאים שהלקוח מעדכן רק משימה ששייכת לו!
    const query = `UPDATE Tasks SET completed = ? WHERE Task_ID = ? AND client_ID = ?`;
    const [result] = await db.query(query, [completed, Task_ID, client_ID]);
    return result;
};