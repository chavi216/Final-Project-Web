const BASE_URL = 'http://localhost:3000/api'; // שנו את הפורט בהתאם לפורט של שרת ה-Node.js שלכם

// פונקציית עזר להוצאת בקשות חלקה עם כפתור אימות (Token)
const fetchWithErrorHandling = async (endpoint, options = {}) => {
  // שליפת הטוקן השמור מה-localStorage (שנשמר בזמן הלוגין)
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`; // הזרקת ה-Token לטובת ה-authMiddleware בשרת
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `שגיאת שרת: ${response.status}`);
  }

  return response.json();
};

// ריכוז כל קריאות ה-API של האפליקציה
export const apiService = {
  // אימות משתמשים
  auth: {
    login: (credentials) => fetchWithErrorHandling('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  },

  // קריאות ייעודיות ללקוח (Client)
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
  },

};