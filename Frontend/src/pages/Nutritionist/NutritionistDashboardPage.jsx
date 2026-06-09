import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const NutritionistDashboardPage = () => {
    const { user } = useContext(AuthContext);

    const stats = {
        activeClients: 12,
        pendingTasks: 4,
        unreadMessages: 3
    };

    return (
        <div style={{ padding: '10px' }}>
            <h2>שלום, {user?.name || 'תזונאי'} 👋</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>ברוך הבא ללוח הבקרה של התזונאי. הנה תמונת מצב להיום:</p>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={cardStyle}>
                    <h3>מטופלים פעילים</h3>
                    <p style={statNumberStyle}>{stats.activeClients}</p>
                </div>
                <div style={cardStyle}>
                    <h3>משימות פתוחות לביצוע</h3>
                    <p style={statNumberStyle}>{stats.pendingTasks}</p>
                </div>
                <div style={cardStyle}>
                    <h3>הודעות חדשות</h3>
                    <p style={statNumberStyle}>{stats.unreadMessages}</p>
                </div>
            </div>
        </div>
    );
};

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
    color: '#007bff',
    margin: '10px 0 0 0'
};

export default NutritionistDashboardPage;