import React, { useState, useEffect } from 'react';
import { apiService } from '../../api/api';
import Button from './Button';

const TaskManager = ({ clientId, role }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // ניהול טופס
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);

    const fetchTasks = async () => {
        try {
            const data = await apiService[role].getTasks(clientId);
            setTasks(data);
        } catch (error) {
            console.error("שגיאה בטעינת משימות:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [clientId, role]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingTaskId) {
                await apiService[role].updateTask(editingTaskId, { Title: title, Body: body });
            } else {
                await apiService[role].createTask({ client_ID: clientId, Title: title, Body: body });
            }
            setTitle('');
            setBody('');
            setEditingTaskId(null);
            fetchTasks(); // רענון הרשימה
        } catch (error) {
            alert("שגיאה בשמירת המשימה: " + error.message);
        }
    };

    const handleEdit = (task) => {
        setTitle(task.Title);
        setBody(task.Body);
        setEditingTaskId(task.Task_ID);
    };

    const handleDelete = async (taskId) => {
        if (!window.confirm("למחוק את המשימה?")) return;
        try {
            await apiService[role].deleteTask(taskId);
            fetchTasks();
        } catch (error) {
            alert("שגיאה במחיקת המשימה");
        }
    };

    if (loading) return <div>טוען משימות...</div>;

    return (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
            <h3 style={{ marginTop: 0 }}>ניהול משימות למטופל</h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <input 
                    type="text" 
                    placeholder="כותרת המשימה" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                    style={{ padding: '8px', flex: '1', minWidth: '150px' }}
                />
                <input 
                    type="text" 
                    placeholder="תיאור (למשל: לשתות מים בבוקר)" 
                    value={body} 
                    onChange={(e) => setBody(e.target.value)} 
                    required 
                    style={{ padding: '8px', flex: '2', minWidth: '200px' }}
                />
                <Button type="submit">{editingTaskId ? 'עדכן משימה' : 'הוסף משימה'}</Button>
                {editingTaskId && <Button type="button" onClick={() => { setEditingTaskId(null); setTitle(''); setBody(''); }}>בטל</Button>}
            </form>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {tasks.length === 0 ? <li>אין משימות למטופל זה.</li> : tasks.map(task => (
                    <li key={task.Task_ID} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee' }}>
                        <div>
                            <strong>{task.Title}</strong>
                            <p style={{ margin: '5px 0 0', color: '#666', fontSize: '14px' }}>{task.Body}</p>
                            <span style={{ fontSize: '12px', color: task.completed ? 'green' : 'orange' }}>
                                סטטוס: {task.completed ? 'בוצע' : 'ממתין לביצוע'}
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <button onClick={() => handleEdit(task)} style={{ cursor: 'pointer', border: 'none', background: 'none', color: '#007bff' }}>✏️</button>
                            <button onClick={() => handleDelete(task.Task_ID)} style={{ cursor: 'pointer', border: 'none', background: 'none', color: 'red' }}>🗑️</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskManager;