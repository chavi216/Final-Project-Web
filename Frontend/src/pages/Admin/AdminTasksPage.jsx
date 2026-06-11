// import React, { useState, useEffect } from 'react';
// import { apiService } from '../../api/api';
// import Button from '../../components/common/Button';

// const AdminTasksPage = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: '', type: '' });

//   useEffect(() => {
//     const fetchTasks = async () => {
//       setLoading(true);
//       try {
//         const data = await apiService.admin.getContent('task'); // נצטרך לתמוך בזה בשרת
//         setTasks(data);
//       } catch (error) {
//         setMessage({ text: 'שגיאה בטעינת המשימות (או שעדיין חסר חיבור בשרת)', type: 'error' });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTasks();
//   }, []);

//   const handleDeleteTask = async (taskId, title) => {
//     if (!window.confirm(`האם אתה בטוח שברצונך למחוק את המשימה "${title}"?`)) return;

//     try {
//       await apiService.admin.deleteContent('task', taskId); // נצטרך לתמוך בזה בשרת
//       setMessage({ text: 'המשימה נמחקה בהצלחה', type: 'success' });
//       setTasks(tasks.filter(t => t.Task_ID !== taskId));
//     } catch (error) {
//       setMessage({ text: 'מחיקת המשימה נכשלה', type: 'error' });
//     }
//   };

//   return (
//     <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto', direction: 'rtl' }}>
//       <h1 style={{ marginBottom: '20px' }}>ניהול משימות</h1>
      
//       {message.text && (
//         <div style={{ padding: '10px', marginBottom: '15px', backgroundColor: message.type === 'success' ? '#e6f4ea' : '#fce8e6', color: message.type === 'success' ? '#137333' : '#c5221f' }}>
//           {message.text}
//         </div>
//       )}

//       {loading ? <p>טוען נתונים...</p> : (
//         <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
//           <thead>
//             <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6', textAlign: 'right' }}>
//               <th style={{ padding: '12px' }}>מזהה</th>
//               <th style={{ padding: '12px' }}>כותרת המשימה</th>
//               <th style={{ padding: '12px' }}>הוצב על ידי (מזהה)</th>
//               <th style={{ padding: '12px' }}>שייך ללקוח (מזהה)</th>
//               <th style={{ padding: '12px', textAlign: 'center' }}>סטטוס</th>
//               <th style={{ padding: '12px', textAlign: 'center' }}>פעולות</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map(task => (
//               <tr key={task.Task_ID} style={{ borderBottom: '1px solid #dee2e6' }}>
//                 <td style={{ padding: '12px' }}>{task.Task_ID}</td>
//                 <td style={{ padding: '12px', fontWeight: 'bold' }}>{task.Title}</td>
//                 <td style={{ padding: '12px' }}>{task.manager_ID}</td>
//                 <td style={{ padding: '12px' }}>{task.client_ID}</td>
//                 <td style={{ padding: '12px', textAlign: 'center' }}>
//                   <span style={{ color: task.completed ? 'green' : 'orange' }}>
//                     {task.completed ? 'הושלם' : 'ממתין'}
//                   </span>
//                 </td>
//                 <td style={{ padding: '12px', textAlign: 'center' }}>
//                   <Button onClick={() => handleDeleteTask(task.Task_ID, task.Title)} style={{ backgroundColor: '#dc3545', color: '#fff', padding: '5px 10px', fontSize: '12px' }}>
//                     מחק
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminTasksPage;


import React, { useState, useEffect } from 'react';
import { apiService } from '../../api/api';
import './Styles/AdminTasks.css'; // ✅ ייבוא קובץ העיצוב החדש

const AdminTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const data = await apiService.admin.getContent('task'); // נצטרך לתמוך בזה בשרת
        setTasks(data);
      } catch (error) {
        setMessage({ text: 'שגיאה בטעינת המשימות (או שעדיין חסר חיבור בשרת)', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleDeleteTask = async (taskId, title) => {
    if (!window.confirm(`האם אתה בטוח שברצונך למחוק את המשימה "${title}"?`)) return;

    try {
      await apiService.admin.deleteContent('task', taskId); // נצטרך לתמוך בזה בשרת
      setMessage({ text: 'המשימה נמחקה בהצלחה', type: 'success' });
      setTasks(tasks.filter(t => t.Task_ID !== taskId));
    } catch (error) {
      setMessage({ text: 'מחיקת המשימה נכשלה', type: 'error' });
    }
  };

  return (
    <div className="admin-tasks-container">
      <h1 className="admin-tasks-title">ניהול משימות</h1>
      
      {message.text && (
        <div className={`admin-tasks-message ${message.type}`}>
          {message.text}
        </div>
      )}

      {loading ? <p>טוען נתונים...</p> : (
        <div className="admin-tasks-table-wrapper">
          <table className="admin-tasks-table">
            <thead>
              <tr>
                <th>מזהה</th>
                <th>כותרת המשימה</th>
                <th>הוצב על ידי (מזהה)</th>
                <th>שייך ללקוח (מזהה)</th>
                <th className="center">סטטוס</th>
                <th className="center">פעולות</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.Task_ID}>
                  <td>{task.Task_ID}</td>
                  <td className="bold">{task.Title}</td>
                  <td>{task.manager_ID}</td>
                  <td>{task.client_ID}</td>
                  <td className="center">
                    {/* שימוש בקלאסים כדי להציג "ממתין" או "הושלם" בצורה בולטת ויפה */}
                    <span className={`task-status ${task.completed ? 'completed' : 'pending'}`}>
                      {task.completed ? 'הושלם' : 'ממתין'}
                    </span>
                  </td>
                  <td className="center">
                    <button 
                      className="admin-tasks-btn-delete"
                      onClick={() => handleDeleteTask(task.Task_ID, task.Title)}
                    >
                      מחק
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminTasksPage;