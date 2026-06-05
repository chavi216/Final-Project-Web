import * as clientService from '../services/clientService.js';
import db from '../config/db.js';

export const getInfo = async (req, res) => {
    try {
        const info = await clientService.handleGetClientInfo(req.user.id);
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
        const [rows] = await db.query(`SELECT * FROM Tasks WHERE client_ID = ?`, [req.user.id]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getFoodPlan = async (req, res) => {
    try {
        const plan = await clientService.handleGetFoodPlan(req.user.id);
        res.status(200).json(plan);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const { completed } = req.body;
        await clientService.handleUpdateTask(taskId, req.user.id, completed);
        res.status(200).json({ message: 'Task status updated successfully in DB' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getVideos = async (req, res) => {
    try {
        const videos = await clientService.handleGetClientVideos(req.user.id);
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
        const messageData = { from_ID: req.user.id, ...req.body };
        await clientService.handleSendMessage(messageData);
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};