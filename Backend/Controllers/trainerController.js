import * as trainerService from '../services/trainerService.js';

export const uploadVideo = async (req, res) => {
    try {
        const videoData = {
            From_ID: req.user.ID, // ה-ID של המאמן
            ...req.body
        };
        await trainerService.handleAddVideo(videoData);
        res.status(201).json({ message: 'Video uploaded successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateVideo = async (req, res) => {
    try {
        const videoId = parseInt(req.params.id);
        const { title, video_url } = req.body;
        await trainerService.handleUpdateVideo(videoId, title, video_url);
        res.status(200).json({ message: 'Video updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteVideo = async (req, res) => {
    try {
        const videoId = parseInt(req.params.id);
        await trainerService.handleDeleteVideo(videoId);
        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const trackClient = async (req, res) => {
    try {
        const clientId = parseInt(req.params.clientId);
        const tasks = await trainerService.handleTrackClient(clientId);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const messageData = { from_ID: req.user.ID, ...req.body };
        await trainerService.handleSendMessage(messageData);
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const createBlog = async (req, res) => {
    try {
        const blogData = { User_ID: req.user.ID, ...req.body };
        await trainerService.handleCreateBlog(blogData);
        res.status(201).json({ message: 'Blog created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const assignTask = async (req, res) => {
    try {
        const taskData = {
            manager_ID: req.user.ID, // ה-ID של המאמן המחובר
            ...req.body
        };
        await trainerService.handleAssignTask(taskData);
        res.status(201).json({ message: 'Task assigned to client successfully by trainer' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};