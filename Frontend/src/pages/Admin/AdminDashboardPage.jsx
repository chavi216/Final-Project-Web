import React, { useState, useEffect } from 'react';
import { apiService } from '../../api/api';
import Button from '../../components/common/Button';

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'blogs' | 'videos'
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // טעינת נתונים בהתאם ללשונית הפעילה
  const fetchData = async () => {
    setLoading(true);
    setMessage({ text: '', type: '' });
    try {
      if (activeTab === 'users') {
        const data = await apiService.admin.getAllUsers();
        setUsers(data);
      } else if (activeTab === 'blogs') {
        const data = await apiService.admin.getContent('blog');
        setBlogs(data);
      } else if (activeTab === 'videos') {
        const data = await apiService.admin.getContent('video');
        setVideos(data);
      }
    } catch (error) {
      setMessage({ text: 'שגיאה בטעינת הנתונים מהשרת', type: 'error' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // מחיקת משתמש
  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`האם אתה בטוח שברצונך למחוק את המשתמש "${userName}"? פעולה זו תסיר את כל המידע המקושר אליו.`)) return;

    try {
      await apiService.admin.deleteUser(userId);
      setMessage({ text: 'המשתמש נמחק בהצלחה', type: 'success' });
      setUsers(users.filter(u => u.ID !== userId)); // עדכון הרשימה במסך
    } catch (error) {
      setMessage({ text: error.message || 'מחיקת המשתמש נכשלה', type: 'error' });
    }
  };

  // מחיקת תוכן (בלוג או סרטון)
  const handleDeleteContent = async (type, id) => {
    const contentTypeName = type === 'blog' ? 'הבלוג' : 'הסרטון';
    if (!window.confirm(`האם אתה בטוח שברצונך למחוק את ${contentTypeName} הזה?`)) return;

    try {
      await apiService.admin.deleteContent(type, id);
      setMessage({ text: 'התוכן הוסר בהצלחה', type: 'success' });
      
      if (type === 'blog') {
        setBlogs(blogs.filter(b => b.blog_ID !== id));
      } else {
        setVideos(videos.filter(v => v.video_ID !== id));
      }
    } catch (error) {
      setMessage({ text: 'מחיקת התוכן נכשלה', type: 'error' });
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto', direction: 'rtl' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>פאנל ניהול מערכת - אדמין</h1>

      {/* הודעות מערכת זמניות */}
      {message.text && (
        <div style={{
          padding: '12px',
          marginBottom: '20px',
          borderRadius: '4px',
          textAlign: 'center',
          backgroundColor: message.type === 'success' ? '#e6f4ea' : '#fce8e6',
          color: message.type === 'success' ? '#137333' : '#c5221f',
          border: `1px solid ${message.type === 'success' ? '#ceead6' : '#fad2cf'}`
        }}>
          {message.text}
        </div>
      )}

      {/* תפריט ניווט לשוניות (Tabs) */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>
        <button 
          onClick={() => setActiveTab('users')} 
          style={{ padding: '10px 20px', cursor: 'pointer', border: 'none', background: activeTab === 'users' ? '#007bff' : '#eee', color: activeTab === 'users' ? '#fff' : '#333', borderRadius: '4px', fontWeight: 'bold' }}>
          ניהול משתמשים
        </button>
        <button 
          onClick={() => setActiveTab('blogs')} 
          style={{ padding: '10px 20px', cursor: 'pointer', border: 'none', background: activeTab === 'blogs' ? '#007bff' : '#eee', color: activeTab === 'blogs' ? '#fff' : '#333', borderRadius: '4px', fontWeight: 'bold' }}>
          ניהול בלוגים
        </button>
        <button 
          onClick={() => setActiveTab('videos')} 
          style={{ padding: '10px 20px', cursor: 'pointer', border: 'none', background: activeTab === 'videos' ? '#007bff' : '#eee', color: activeTab === 'videos' ? '#fff' : '#333', borderRadius: '4px', fontWeight: 'bold' }}>
          ניהול סרטוני כושר
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '18px' }}>טוען נתונים...</div>
      ) : (
        <div>
          {/* לשונית 1: טבלת משתמשים */}
          {activeTab === 'users' && (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6', textAlign: 'right' }}>
                  <th style={{ padding: '12px' }}>ת.ז (ID)</th>
                  <th style={{ padding: '12px' }}>שם מלא</th>
                  <th style={{ padding: '12px' }}>אימייל</th>
                  <th style={{ padding: '12px' }}>תפקיד</th>
                  <th style={{ padding: '12px' }}>טלפון</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>פעולות</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.ID} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '12px' }}>{user.ID}</td>
                    <td style={{ padding: '12px' }}>{user.name}</td>
                    <td style={{ padding: '12px' }}>{user.email}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        backgroundColor: user.role === 'admin' ? '#fad2cf' : user.role === 'trainer' ? '#e8f0fe' : user.role === 'nutritionist' ? '#e6f4ea' : '#f1f3f4',
                        color: user.role === 'admin' ? '#c5221f' : user.role === 'trainer' ? '#1a73e8' : user.role === 'nutritionist' ? '#137333' : '#3c4043'
                      }}>{user.role}</span>
                    </td>
                    <td style={{ padding: '12px' }}>{user.phone_number}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <Button 
                        onClick={() => handleDeleteUser(user.ID, user.name)}
                        style={{ backgroundColor: '#dc3545', color: '#fff', padding: '6px 12px', fontSize: '14px' }}>
                        מחק משתמש
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* לשונית 2: טבלת בלוגים */}
          {activeTab === 'blogs' && (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6', textAlign: 'right' }}>
                  <th style={{ padding: '12px' }}>מזהה</th>
                  <th style={{ padding: '12px' }}>כותרת הבלוג</th>
                  <th style={{ padding: '12px' }}>פורסם על ידי</th>
                  <th style={{ padding: '12px' }}>קהל יעד</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>פעולות</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map(blog => (
                  <tr key={blog.blog_ID} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '12px' }}>{blog.blog_ID}</td>
                    <td style={{ padding: '12px', fontWeight: '500' }}>{blog.Title}</td>
                    <td style={{ padding: '12px' }}>{blog.author_name}</td>
                    <td style={{ padding: '12px' }}>{blog.audience_type}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <Button 
                        onClick={() => handleDeleteContent('blog', blog.blog_ID)}
                        style={{ backgroundColor: '#dc3545', color: '#fff', padding: '6px 12px', fontSize: '14px' }}>
                        הסר בלוג
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* לשונית 3: טבלת סרטונים */}
          {activeTab === 'videos' && (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6', textAlign: 'right' }}>
                  <th style={{ padding: '12px' }}>מזהה</th>
                  <th style={{ padding: '12px' }}>שם הסרטון</th>
                  <th style={{ padding: '12px' }}>קישור URL</th>
                  <th style={{ padding: '12px' }}>הועלה על ידי</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>פעולות</th>
                </tr>
              </thead>
              <tbody>
                {videos.map(video => (
                  <tr key={video.video_ID} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '12px' }}>{video.video_ID}</td>
                    <td style={{ padding: '12px', fontWeight: '500' }}>{video.title}</td>
                    <td style={{ padding: '12px' }}>
                      <a href={video.video_url} target="_blank" rel="noreferrer" style={{ color: '#007bff' }}>צפייה בסרטון</a>
                    </td>
                    <td style={{ padding: '12px' }}>{video.creator_name}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <Button 
                        onClick={() => handleDeleteContent('video', video.video_ID)}
                        style={{ backgroundColor: '#dc3545', color: '#fff', padding: '6px 12px', fontSize: '14px' }}>
                        הסר סרטון
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;