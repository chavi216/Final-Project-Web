import React, { useState, useEffect } from 'react';
import { apiService } from '../../api/api';
import Button from '../../components/common/Button';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await apiService.admin.getAllUsers();
        setUsers(data);
      } catch (error) {
        setMessage({ text: 'שגיאה בטעינת המשתמשים', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`האם אתה בטוח שברצונך למחוק את המשתמש "${userName}"?`)) return;

    try {
      await apiService.admin.deleteUser(userId);
      setMessage({ text: 'המשתמש נמחק בהצלחה', type: 'success' });
      setUsers(users.filter(u => u.ID !== userId));
    } catch (error) {
      setMessage({ text: error.message || 'מחיקת המשתמש נכשלה', type: 'error' });
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto', direction: 'rtl' }}>
      <h1 style={{ marginBottom: '20px' }}>ניהול משתמשים</h1>
      
      {message.text && (
        <div style={{ padding: '10px', marginBottom: '15px', backgroundColor: message.type === 'success' ? '#e6f4ea' : '#fce8e6', color: message.type === 'success' ? '#137333' : '#c5221f' }}>
          {message.text}
        </div>
      )}

      {loading ? <p>טוען נתונים...</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6', textAlign: 'right' }}>
              <th style={{ padding: '12px' }}>ת.ז</th>
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
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{user.role}</td>
                <td style={{ padding: '12px' }}>{user.phone_number}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <Button onClick={() => handleDeleteUser(user.ID, user.name)} style={{ backgroundColor: '#dc3545', color: '#fff', padding: '5px 10px', fontSize: '12px' }}>
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

export default AdminUsersPage;