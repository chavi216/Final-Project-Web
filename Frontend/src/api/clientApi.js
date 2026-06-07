import { fetchWithErrorHandling } from './apiConfig';

export const clientApi = {
  getInfo: () => fetchWithErrorHandling('/client/info'),
  getTasks: () => fetchWithErrorHandling('/client/tasks'),
  toggleTask: (taskId, completed) => fetchWithErrorHandling(`/client/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify({ completed }),
  }),
  getFoodPlan: () => fetchWithErrorHandling('/client/food-plan'),
  getVideos: () => fetchWithErrorHandling('/client/videos'),
  getBlogs: () => fetchWithErrorHandling('/client/blogs'),
  sendMessage: (messageData) => fetchWithErrorHandling('/client/messages', {
    method: 'POST',
    body: JSON.stringify(messageData),
  }),
  getMessages: (contactId) => fetchWithErrorHandling(`/client/messages/${contactId}`),
  getContacts: () => fetchWithErrorHandling('/client/contacts'),
};