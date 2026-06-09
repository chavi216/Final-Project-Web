import React, { useEffect, useState } from 'react';
import { apiService } from '../../api/api'; 
import VideoPlayer from '../../components/common/VideoPlayer'; 

// מגדירים את הכתובת של השרת (Backend) שלנו
const BASE_URL = 'http://localhost:3000';

const ClientVideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiService.client.getVideos();
        setVideos(data);
      } catch (err) {
        setError(err.message || 'שגיאה בטעינת סרטונים');
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>טוען סרטונים...</div>;
  if (error) return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>סרטוני הכושר שלי 🎥</h2>
      <hr />
      {videos.length === 0 ? <p>אין סרטונים זמינים כרגע.</p> : 
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
          {videos.map(video => (
            <VideoPlayer 
              key={video.video_ID} 
              url={`${BASE_URL}/${video.video_url}`} 
              title={video.title} 
            />
          ))}
        </div>
      }
    </div>
  );
};

export default ClientVideosPage;