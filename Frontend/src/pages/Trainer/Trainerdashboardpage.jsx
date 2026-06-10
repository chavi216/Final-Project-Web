import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { apiService } from '../../api/api';

const TrainerDashboardPage = () => {
    const { user } = useContext(AuthContext);

    const [stats, setStats] = useState({
        activeClients: 0,
        uploadedVideos: 0,
        pendingTasks: 0
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {

               const clients =
    await apiService.trainer.getClients();

const videos =
    await apiService.trainer.getVideos();

const tasks =
    await apiService.trainer.getAllTasks();

const pendingTasks =
    tasks.filter(
        task =>
            task.completed === 0 ||
            task.completed === false
    ).length;

setStats({
    activeClients: clients.length,
    uploadedVideos: videos.length,
    pendingTasks
});

            } catch (error) {
                console.error(
                    'Dashboard Error:',
                    error
                );
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div style={{ padding: '10px' }}>
            <h2>
                שלום, {user?.name || 'מאמן'} 💪
            </h2>

            <p
                style={{
                    color: '#666',
                    marginBottom: '30px'
                }}
            >
                ברוך הבא ללוח הבקרה של המאמן
            </p>

            <div
                style={{
                    display: 'flex',
                    gap: '20px',
                    flexWrap: 'wrap'
                }}
            >
                <div style={cardStyle}>
                    <h3>מתאמנים פעילים</h3>
                    <p style={statNumberStyle}>
                        {stats.activeClients}
                    </p>
                </div>

                <div style={cardStyle}>
                    <h3>משימות פתוחות</h3>
                    <p style={statNumberStyle}>
                        {stats.pendingTasks}
                    </p>
                </div>

                <div style={cardStyle}>
                    <h3>סרטונים שהועלו</h3>
                    <p style={statNumberStyle}>
                        {stats.uploadedVideos}
                    </p>
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
    color: '#ff4757',
    margin: '10px 0 0 0'
};

export default TrainerDashboardPage;