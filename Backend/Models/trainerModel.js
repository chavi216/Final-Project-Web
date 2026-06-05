import db from '../config/db.js';

export const createVideoInDB = async (videoData) => {
    const { From_ID, To_ID, title, video_url } = videoData;
    const query = `INSERT INTO FitnessVideos (From_ID, To_ID, title, video_url) VALUES (?, ?, ?, ?)`;
    const [result] = await db.query(query, [From_ID, To_ID || null, title, video_url]);
    return result;
};

export const updateVideoInDB = async (video_ID, title, video_url) => {
    const query = `UPDATE FitnessVideos SET title = ?, video_url = ? WHERE video_ID = ?`;
    const [result] = await db.query(query, [title, video_url, video_ID]);
    return result;
};

export const deleteVideoFromDB = async (video_ID) => {
    const query = `DELETE FROM FitnessVideos WHERE video_ID = ?`;
    const [result] = await db.query(query, [video_ID]);
    return result;
};

export const getClientTasksFromDB = async (client_ID) => {
    const query = `SELECT * FROM Tasks WHERE client_ID = ?`;
    const [rows] = await db.query(query, [client_ID]);
    return rows;
};