import React, { useState, useEffect } from 'react';
import { apiService } from '../../api/api';
import TaskManager from '../../components/common/TaskManager';

const TrainerTasksPage = () => {
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState('');

  // טעינת רשימת הלקוחות של המאמן
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await apiService.trainer.getClients();
        setClients(data);
      } catch (error) {
        console.error("שגיאה בטעינת לקוחות:", error);
      }
    };
    fetchClients();
  }, []);

  return (
    <div style={{ padding: '10px' }}>
      <h2>ניהול משימות כושר 📋</h2>
      <p style={{ color: '#666' }}>בחרי מתאמן כדי לצפות במשימות שלו או להקצות לו משימות חדשות:</p>
      
      <div style={{ marginBottom: '20px' }}>
        <select 
          value={selectedClientId} 
          onChange={(e) => setSelectedClientId(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '200px' }}
        >
          <option value="">-- בחרי מתאמן --</option>
          {clients.map(client => (
            <option key={client.ID} value={client.ID}>{client.name}</option>
          ))}
        </select>
      </div>

      <hr style={{ margin: '20px 0', borderColor: '#eee' }} />

      {selectedClientId ? (
        // התיקון כאן: מעבירים את ה-role ואת ה-clientId כדי שהקומפוננטה המשותפת תדע לאן לפנות
        <TaskManager 
          role="trainer" 
          clientId={selectedClientId} 
        />
      ) : (
        <p style={{ color: '#999', fontStyle: 'italic' }}>נא לבחור מתאמן מהרשימה כדי לנהל משימות.</p>
      )}
    </div>
  );
};

export default TrainerTasksPage;