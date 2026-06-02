// import * as clientService from '../services/clientService.js';

// export const getInfo = async (req, res) => {
//     try {
//         const info = await clientService.handleGetClientInfo(req.user.ID);
//         res.status(200).json(info);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// export const getVideos = async (req, res) => {
//     try {
//         const videos = await clientService.handleGetClientVideos(req.user.ID);
//         res.status(200).json(videos);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// export const getBlogs = async (req, res) => {
//     try {
//         const blogs = await clientService.handleGetBlogs();
//         res.status(200).json(blogs);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// export const getFoodPlan = async (req, res) => {
//     try {
//         const plan = await clientService.handleGetFoodPlan(req.user.ID);
//         res.status(200).json(plan);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// export const updateTask = async (req, res) => {
//     try {
//         const taskId = parseInt(req.params.id);
//         const { completed } = req.body;
//         await clientService.handleUpdateTask(taskId, req.user.ID, completed);
//         res.status(200).json({ message: 'Task status updated successfully' });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// export const sendMessage = async (req, res) => {
//     try {
//         const messageData = { from_ID: req.user.ID, ...req.body };
//         await clientService.handleSendMessage(messageData);
//         res.status(201).json({ message: 'Message sent successfully' });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };



import * as clientService from '../services/clientService.js';
import db from '../config/db.js'; // 1. הזזנו את השורה לכאן - בראש הקובץ!

// מזהה לקוח קבוע לצורך בדיקות ה-UI ללא שלב הלוגין
const TEST_CLIENT_ID = 999;

// 1. שליפת מידע אישי מה-DB עבור לקוח 999
export const getInfo = async (req, res) => {
    try {
        const info = await clientService.handleGetClientInfo(TEST_CLIENT_ID);
        if (!info) {
            return res.status(404).json({ message: "המשתמש לא נמצא במסד הנתונים" });
        }
        res.status(200).json(info);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 2. שליפת משימות מה-DB עבור לקוח 999
export const getTasks = async (req, res) => {
    try {
        // ביצענו קריאה נקייה וישירה ל-DB (בלי ה-import הלא חוקי שהיה כאן בפנים)
        const [rows] = await db.query(`SELECT * FROM Tasks WHERE client_ID = ?`, [TEST_CLIENT_ID]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 3. שליפת תוכנית תזונה מה-DB עבור לקוח 999
export const getFoodPlan = async (req, res) => {
    try {
        const plan = await clientService.handleGetFoodPlan(TEST_CLIENT_ID);
        res.status(200).json(plan);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 4. עדכון סטטוס משימה ב-DB (בלחיצה על ה-Checkbox)
export const updateTask = async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const { completed } = req.body;
        
        await clientService.handleUpdateTask(taskId, TEST_CLIENT_ID, completed);
        res.status(200).json({ message: 'Task status updated successfully in DB' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// פונקציות מעטפת נוספות למניעת שגיאות הרצה
export const getVideos = async (req, res) => {
    try {
        const videos = await clientService.handleGetClientVideos(TEST_CLIENT_ID);
        res.status(200).json(videos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// סגירת שאר הפונקציות המוגדרות בסרבר
export const getBlogs = async (req, res) => {
    try {
        const blogs = await clientService.handleGetBlogs();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const messageData = { from_ID: TEST_CLIENT_ID, ...req.body };
        await clientService.handleSendMessage(messageData);
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};