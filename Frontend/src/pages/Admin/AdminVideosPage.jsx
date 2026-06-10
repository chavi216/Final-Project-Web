import React, { useState, useEffect } from 'react';
import { apiService } from '../../api/api';
import Button from '../../components/common/Button';

const AdminVideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const data = await apiService.admin.getContent('video');
        setVideos(data);
      } catch (error) {
        setMessage({ text: 'שגיאה בטעינת הסרטונים', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const handleDeleteVideo = async (videoId, title) => {
    if (!window.confirm(`האם אתה בטוח שברצונך למחוק את הסרטון "${title}"?`)) return;

    try {
      await apiService.admin.deleteContent('video', videoId);
      setMessage({ text: 'הסרטון נמחק בהצלחה', type: 'success' });
      setVideos(videos.filter(v => v.video_ID !== videoId));
    } catch (error) {
      setMessage({ text: 'מחיקת הסרטון נכשלה', type: 'error' });
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto', direction: 'rtl' }}>
      <h1 style={{ marginBottom: '20px' }}>ניהול סרטונים</h1>
      
      {message.text && (
        <div style={{ padding: '10px', marginBottom: '15px', backgroundColor: message.type === 'success' ? '#e6f4ea' : '#fce8e6', color: message.type === 'success' ? '#137333' : '#c5221f' }}>
          {message.text}
        </div>
      )}

      {loading ? <p>טוען נתונים...</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6', textAlign: 'right' }}>
              <th style={{ padding: '12px' }}>מזהה</th>
              <th style={{ padding: '12px' }}>כותרת</th>
              <th style={{ padding: '12px' }}>הועלה על ידי</th>
              <th style={{ padding: '12px' }}>צפייה</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {videos.map(video => (
              <tr key={video.video_ID} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '12px' }}>{video.video_ID}</td>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{video.title}</td>
                <td style={{ padding: '12px' }}>{video.creator_name}</td>
                <td style={{ padding: '12px' }}>
                  <a href={video.video_url} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>צפה</a>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <Button onClick={() => handleDeleteVideo(video.video_ID, video.title)} style={{ backgroundColor: '#dc3545', color: '#fff', padding: '5px 10px', fontSize: '12px' }}>
                    מחק
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminVideosPage;