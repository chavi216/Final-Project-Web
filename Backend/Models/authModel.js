// import db from '../config/db.js';

// export const getUserByEmailFromDB = async (email) => {
//     const query = `SELECT * FROM Users WHERE email = ?`;
//     const [rows] = await db.query(query, [email]);
//     return rows[0]; // מחזיר את המשתמש הראשון (אם יש) או undefined
// };

import db from '../config/db.js';

// 1. שליפת משתמש לפי כתובת אימייל
export const getUserByEmail = async (email) => {
    const query = `SELECT * FROM Users WHERE email = ?`;
    const [rows] = await db.query(query, [email]);
    return rows[0]; // מחזיר את המשתמש הראשון (אם יש) או undefined
};

// 2. יצירת משתמש חדש בבסיס הנתונים (עבור ההרשמה)
export const createUser = async (userData) => {
    const query = `
        INSERT INTO Users (ID, name, email, password, address, phone_number, role)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
        userData.ID,
        userData.name,
        userData.email,
        userData.password,
        userData.address,
        userData.phone_number,
        userData.role || 'client' // אם לא נשלח תפקיד, ברירת המחדל היא לקוח
    ];

    const [result] = await db.query(query, values);
    return result; // מחזיר אובייקט המכיל את ה-insertId של השורה החדשה
};