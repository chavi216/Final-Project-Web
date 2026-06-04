import * as clientService from '../services/clientService.js';
import db from '../config/db.js';

export const getInfo = async (req, res) => {
    try {
        // כאן אנחנו משתמשים ב-ID האמיתי של המשתמש שהתחבר, שמגיע מהטוקן
        const info = await clientService.handleGetClientInfo(req.user.ID);
        if (!info) {
            return res.status(404).json({ message: "המשתמש לא נמצא במסד הנתונים" });
        }
        res.status(200).json(info);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getTasks = async (req, res) => {
    try {
        // שימוש ב-ID האמיתי
        const [rows] = await db.query(`SELECT * FROM Tasks WHERE client_ID = ?`, [req.user.ID]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getFoodPlan = async (req, res) => {
    try {
        const plan = await clientService.handleGetFoodPlan(req.user.ID);
        res.status(200).json(plan);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const { completed } = req.body;
        
        await clientService.handleUpdateTask(taskId, req.user.ID, completed);
        res.status(200).json({ message: 'Task status updated successfully in DB' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getVideos = async (req, res) => {
    try {
        const videos = await clientService.handleGetClientVideos(req.user.ID);
        res.status(200).json(videos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

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
        const messageData = { from_ID: req.user.ID, ...req.body };
        await clientService.handleSendMessage(messageData);
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};