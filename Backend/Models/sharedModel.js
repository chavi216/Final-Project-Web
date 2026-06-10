import db from '../config/db.js';

// --- הודעות ---
export const createMessageInDB = async (messageData) => {
    const { from_ID, to_ID, body } = messageData;
    const query = `INSERT INTO Messages (from_ID, to_ID, body, is_read) VALUES (?, ?, ?, ?)`;
    const [result] = await db.query(query, [from_ID, to_ID, body, false]);
    return result;
};

// --- משימות ---
export const createTaskInDB = async (taskData) => {
    const { Body, Title, manager_ID, client_ID } = taskData;
    const query = `INSERT INTO Tasks (Body, Title, manager_ID, client_ID, completed) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await db.query(query, [Body, Title, manager_ID, client_ID, false]);
    return result;
};

// שליפת משימות של לקוח ספציפי שנוצרו על ידי איש צוות ספציפי (מאמן/תזונאי)
export const getManagerTasksFromDB = async (manager_ID, client_ID) => {
    const query = `SELECT * FROM Tasks WHERE manager_ID = ? AND client_ID = ? ORDER BY Task_ID DESC`;
    const [rows] = await db.query(query, [manager_ID, client_ID]);
    return rows;
};

// עדכון תוכן משימה
export const updateTaskDetailsInDB = async (Task_ID, Title, Body) => {
    const query = `UPDATE Tasks SET Title = ?, Body = ? WHERE Task_ID = ?`;
    const [result] = await db.query(query, [Title, Body, Task_ID]);
    return result;
};

// מחיקת משימה
export const deleteTaskFromDB = async (Task_ID) => {
    const query = `DELETE FROM Tasks WHERE Task_ID = ?`;
    const [result] = await db.query(query, [Task_ID]);
    return result;
};

export const getAllManagerTasksFromDB = async (manager_ID) => {
    const query = `
        SELECT *
        FROM Tasks
        WHERE manager_ID = ?
        ORDER BY Task_ID DESC
    `;

    const [rows] = await db.query(query, [manager_ID]);
    return rows;
};
// --- בלוגים (מעודכן עם תמיכה בקהל יעד) ---

// יצירת בלוג עם תמיכה בקהל יעד (כולם / לקוחות שלי / לקוח ספציפי)
export const createBlogInDB = async (blogData) => {
    const { User_ID, Title, body, audience_type, recipient_client_id } = blogData;
    const query = `INSERT INTO Blogs (User_ID, Title, body, audience_type, recipient_client_id) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await db.query(query, [User_ID, Title, body, audience_type, recipient_client_id || null]);
    return result;
};

// שליפת כל הבלוגים שכתב מנהל ספציפי (מאמן או תזונאי)
export const getManagerBlogsFromDB = async (userId) => {
    const query = `SELECT * FROM Blogs WHERE User_ID = ? ORDER BY blog_ID DESC`;
    const [rows] = await db.query(query, [userId]);
    return rows;
};

// עדכון בלוג קיים
export const updateBlogInDB = async (blog_ID, Title, body, audience_type, recipient_client_id) => {
    const query = `UPDATE Blogs SET Title = ?, body = ?, audience_type = ?, recipient_client_id = ? WHERE blog_ID = ?`;
    const [result] = await db.query(query, [Title, body, audience_type, recipient_client_id || null, blog_ID]);
    return result;
};

// מחיקת בלוג
export const deleteBlogFromDB = async (blog_ID) => {
    const query = `DELETE FROM Blogs WHERE blog_ID = ?`;
    const [result] = await db.query(query, [blog_ID]);
    return result;
};