import * as clientModel from '../models/clientModel.js';
import * as sharedModel from '../models/sharedModel.js'; 

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