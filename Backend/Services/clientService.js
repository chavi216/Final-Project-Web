import * as clientModel from '../models/clientModel.js';
import * as sharedModel from '../models/sharedModel.js'; 
import * as messageModel from '../models/clientModel.js';

export const handleGetClientInfo = async (client_ID) => {
    return await clientModel.getClientInfoFromDB(client_ID);
};

export const handleGetClientVideos = async (client_ID) => {
    return await clientModel.getClientVideosFromDB(client_ID);
};

export const handleGetBlogs = async () => {
    return await clientModel.getAllBlogsFromDB();
};

export const handleGetFoodPlan = async (client_ID) => {
    return await clientModel.getClientFoodPlanFromDB(client_ID);
};

export const handleUpdateTask = async (Task_ID, client_ID, completed) => {
    const result = await clientModel.updateTaskCompletionInDB(Task_ID, client_ID, completed);
    if (result.affectedRows === 0) throw new Error('Task not found or unauthorized');
    return result;
};

export const handleSendMessage = async (messageData) => {
    if (!messageData.to_ID || !messageData.body) {
        throw new Error('Message body and to_ID are required');
    }
    return await sharedModel.createMessageInDB(messageData);
};

export const handleGetMessages = async (clientId, contactId) => {
    // כאן אפשר להוסיף לוגיקה עסקית - למשל, בדיקה אם contactId הוא באמת איש צוות
    return await messageModel.fetchChatHistory(clientId, contactId);
};

export const handleGetProfessionals = async () => {
    return await clientModel.getProfessionalsFromDB();
};

export const handleUpdateTeam = async (client_ID, trainer_id, nutritionist_id) => {
    return await clientModel.updateClientTeamInDB(client_ID, trainer_id, nutritionist_id);
};


// הוספת פונקציה לעדכון תמונת הפרופיל בשירות
export const handleUpdateProfileImage = async (client_ID, imageUrl) => {
    return await clientModel.updateClientProfileImageInDB(client_ID, imageUrl);
};