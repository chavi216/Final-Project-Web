import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { apiService } from '../../api/api';

const TrainerDashboardPage = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        activeClients: 0,
        uploadedVideos: 0, // ייחודי למאמן הכושר
        pendingTasks: 0    // יעודכן מול השרת בהמשך
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // מושך את הלקוחות האמיתיים המשויכים למאמן כדי לספור אותם
                const clients = await apiService.trainer.getClients();
                
                // כאן תוכלי בעתיד למשוך גם את רשימת הסרטונים של המאמן
                // const videos = await apiService.trainer.getVideos();
                
                setStats(prev => ({ 
                    ...prev, 
                    activeClients: clients.length,
                    // uploadedVideos: videos.length 
                }));
            } catch (error) {
                console.error("שגיאה במשיכת נתוני דשבורד מאמן:", error);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <div style={{ padding: '10px' }}>
            <h2>שלום, {user?.name || 'מאמן'} 💪</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>ברוך הבא ללוח הבקרה של המאמן. הנה תמונת מצב להיום:</p>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={cardStyle}>
                    <h3>מתאמנים פעילים</h3>
                    <p style={statNumberStyle}>{stats.activeClients}</p>
                </div>
                <div style={cardStyle}>
                    <h3>משימות פתוחות</h3>
                    <p style={statNumberStyle}>{stats.pendingTasks}</p>
                </div>
                <div style={cardStyle}>
                    <h3>סרטונים שהועלו</h3>
                    <p style={statNumberStyle}>{stats.uploadedVideos}</p>
                </div>
            </div>
        </div>
    );
};

// סגנונות עיצוב
const cardStyle = {
    flex: '1',
    minWidth: '200px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    border: '1px solid #eee',
    textAlign: 'center'
};

const statNumberStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#ff4757', // שיניתי לצבע קצת יותר אנרגטי שמתאים לכושר
    margin: '10px 0 0 0'
};

export default TrainerDashboardPage;