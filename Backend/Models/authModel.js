import db from '../config/db.js';

export const getUserByEmailFromDB = async (email) => {
    const query = `SELECT * FROM Users WHERE email = ?`;
    const [rows] = await db.query(query, [email]);
    return rows[0]; // מחזיר את המשתמש הראשון (אם יש) או undefined
};