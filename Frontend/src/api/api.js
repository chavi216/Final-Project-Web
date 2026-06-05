
const BASE_URL = 'http://localhost:3000/api'; 

const fetchWithErrorHandling = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`; 
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || `שגיאת שרת: ${response.status}`);
  }

  return response.json();
};

export const apiService = {
  auth: {
    login: (credentials) => fetchWithErrorHandling('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
    
    register: (userData) => fetchWithErrorHandling('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  },

  client: {
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
    getContacts: () => fetchWithErrorHandling('/client/contacts'),
  },
};