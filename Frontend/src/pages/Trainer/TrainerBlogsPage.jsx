import React, { useState, useEffect } from 'react';
import { apiService } from '../../api/api';
import BlogManager from '../../components/common/BlogManager';

const TrainerBlogsPage = () => {
  const [clients, setClients] = useState([]);

  // טעינת רשימת הלקוחות כדי שהמאמן יוכל לבחור קהל יעד ספציפי אם ירצה
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await apiService.trainer.getClients();
        setClients(data);
      } catch (error) {
        console.error("שגיאה בטעינת לקוחות לבלוג:", error);
      }
    };
    fetchClients();
  }, []);

  const handleCreateBlog = async (blogData) => {
    try {
      await apiService.trainer.createBlog(blogData);
      alert('הפוסט פורסם בהצלחה בבלוג! ✍️');
    } catch (error) {
      console.error("שגיאה בפרסום הבלוג:", error);
      alert('התרחשה שגיאה בפרסום הפוסט.');
    }
  };

  return (
    <div style={{ padding: '10px' }}>
      <h2>בלוג כושר וטיפים ✍️</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>שתפי טיפים, אימונים ועדכונים עם המתאמנים שלך או עם כל המשתמשים באתר.</p>
      
      <BlogManager 
        clients={clients} 
        onCreateBlog={handleCreateBlog} 
        role="trainer" 
      />
    </div>
  );
};

export default TrainerBlogsPage;