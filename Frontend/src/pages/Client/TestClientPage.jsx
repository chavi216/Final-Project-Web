import React, { useEffect, useState } from 'react';
import { apiService } from '../../services/api';
import ClientProfileCard from '../../components/client/ClientProfileCard';
import ClientTaskRow from '../../components/client/ClientTaskRow';
import FoodPlanDayTable from '../../components/client/FoodPlanDayTable';

const TestClientPage = () => {
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [foodLogs, setFoodLogs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        // פנייה לפונקציות ה-apiService שבנינו
        const profileData = await apiService.client.getInfo();
        const tasksData = await apiService.client.getTasks();
        const foodData = await apiService.client.getFoodPlan();

        setProfile(profileData);
        setTasks(tasksData);
        setFoodLogs(foodData);
      } catch (err) {
        setError(err.message || 'נכשלה טעינת הנתונים מהשרת');
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  const handleToggleTask = async (taskId, currentStatus) => {
    try {
      // עדכון הסטטוס בשרת
      await apiService.client.toggleTask(taskId, currentStatus);
      
      // עדכון הסטייט המקומי ב-React כדי שהמסך יתעדכן ויזואלית מיד
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.Task_ID === taskId ? { ...task, completed: currentStatus } : task
        )
      );
    } catch (err) {
      alert('עדכון המשימה נכשל: ' + err.message);
    }
  };

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>טוען נתונים מהשרת...</div>;
  if (error) return <div style={{ color: 'red', padding: '20px' }}>שגיאת תקשורת: {error}</div>;

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🛠️ סביבת בדיקת קומפוננטות לקוח</h2>
      <hr />
      
      <div style={{ marginTop: '20px' }}>
        <ClientProfileCard clientInfo={profile} />
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>המשימות והאימונים שלי</h3>
        {tasks.length === 0 ? <p>אין משימות פתוחות</p> : 
          tasks.map(task => (
            <ClientTaskRow 
              key={task.Task_ID} 
              task={task} 
              onToggleComplete={handleToggleTask} 
            />
          ))
        }
      </div>

      <div style={{ marginTop: '30px' }}>
        <FoodPlanDayTable foodLogs={foodLogs} />
      </div>
    </div>
  );
};

export default TestClientPage;