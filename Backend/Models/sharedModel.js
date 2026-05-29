import db from '../config/db.js';

// הודעות: from_ID, to_ID, body, is_read
export const createMessageInDB = async (messageData) => {
    const { from_ID, to_ID, body } = messageData;
    // שמתי כברירת מחדל false (0) ל-is_read כי ההודעה עדיין לא נקראה
    const query = `INSERT INTO Messages (from_ID, to_ID, body, is_read) VALUES (?, ?, ?, ?)`;
    const [result] = await db.query(query, [from_ID, to_ID, body, false]);
    return result;
};

// בלוגים: blog_ID, User_ID, Title, body
export const createBlogInDB = async (blogData) => {
    const { blog_ID, User_ID, Title, body } = blogData;
    const query = `INSERT INTO Blogs (blog_ID, User_ID, Title, body) VALUES (?, ?, ?, ?)`;
    const [result] = await db.query(query, [blog_ID, User_ID, Title, body]);
    return result;
};
// יצירת משימה חדשה ללקוח (משותף למאמן ותזונאי)
export const createTaskInDB = async (taskData) => {
    const { Body, Title, manager_ID, client_ID } = taskData;
    // completed מקבל אוטומטית false (0) כי המשימה רק נוצרה ועוד לא בוצעה
    const query = `INSERT INTO Tasks (Body, Title, manager_ID, client_ID, completed) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await db.query(query, [Body, Title, manager_ID, client_ID, false]);
    return result;
};