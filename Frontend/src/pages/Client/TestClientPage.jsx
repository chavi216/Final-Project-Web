import React, { useEffect, useState } from 'react';
import { apiService } from '../../api/api'; // ודאי נתיב
import ClientProfileCard from '../../components/client/ClientProfileCard';
import ClientTaskRow from '../../components/client/ClientTaskRow';
import FoodPlanDayTable from '../../components/client/FoodPlanDayTable';
import VideoPlayer from '../../components/common/VideoPlayer'; // ייבוא נגן הוידאו שלך!

const TestClientPage = () => {
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [foodLogs, setFoodLogs] = useState([]);
  
  // 1. סטייטים חדשים לוידאו ולבלוגים
  const [videos, setVideos] = useState([]);
  const [blogs, setBlogs] = useState([]);
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        // 2. משיכת כל הנתונים במקביל! סופר מהיר ויעיל
        const [profileData, tasksData, foodData, videosData, blogsData] = await Promise.all([
          apiService.client.getInfo(),
          apiService.client.getTasks(),
          apiService.client.getFoodPlan(),
          apiService.client.getVideos(),
          apiService.client.getBlogs()
        ]);

        setProfile(profileData);
        setTasks(tasksData);
        setFoodLogs(foodData);
        setVideos(videosData);
        setBlogs(blogsData);
        
      } catch (err) {
        setError(err.message || 'נכשלה טעינת הנתונים מהשרת');
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  const handleToggleTask = async (taskId, currentStatus) => {
    // ... (אותו קוד שהיה לך פה למשימות - לא לגעת)
  };

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>טוען נתונים מהשרת...</div>;
  if (error) return <div style={{ color: 'red', padding: '20px' }}>שגיאת תקשורת: {error}</div>;

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🛠️ סביבת בדיקת קומפוננטות לקוח</h2>
      <hr />
      
      {/* אזור הפרופיל */}
      <div style={{ marginTop: '20px' }}>
        <ClientProfileCard clientInfo={profile} />
      </div>

      {/* אזור המשימות */}
      <div style={{ marginTop: '30px' }}>
        <h3>המשימות והאימונים שלי</h3>
        {tasks.length === 0 ? <p>אין משימות פתוחות</p> : 
          tasks.map(task => (
            <ClientTaskRow key={task.Task_ID} task={task} onToggleComplete={handleToggleTask} />
          ))
        }
      </div>

      {/* אזור התזונה */}
      <div style={{ marginTop: '30px' }}>
        <FoodPlanDayTable foodLogs={foodLogs} />
      </div>

{/* --- אזור סרטוני כושר --- */}
      <div style={{ marginTop: '40px' }}>
        <h3>🎥 סרטוני הכושר שלי</h3>
        {videos.length === 0 ? <p>אין סרטונים זמינים כרגע.</p> : 
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {videos.map(video => (
              // עדכנו את url ל-video_url בדיוק כמו בטבלה
              <VideoPlayer key={video.video_ID} url={video.video_url} title={video.title} />
            ))}
          </div>
        }
      </div>

      {/* --- אזור בלוגים ומאמרים --- */}
      <div style={{ marginTop: '40px' }}>
        <h3>📖 מאמרים מומלצים</h3>
        {blogs.length === 0 ? <p>אין מאמרים זמינים כרגע.</p> : 
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {blogs.map(blog => (
              <div key={blog.blog_ID} style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
                {/* עדכנו ל-Title (גדולה) ול-body בדיוק כמו בטבלה */}
                <h4>{blog.Title}</h4>
                <p style={{ color: '#555', fontSize: '14px' }}>{blog.body}</p>
              </div>
            ))}
          </div>
        }
      </div>

    </div>
  );
};

export default TestClientPage;