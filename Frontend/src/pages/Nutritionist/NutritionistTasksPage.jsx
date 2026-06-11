// import React, { useState, useEffect } from 'react';
// import { apiService } from '../../api/api';
// import TaskManager from '../../components/common/TaskManager';

// const NutritionistTasksPage = () => {
//     const [clients, setClients] = useState([]);
//     const [selectedClientId, setSelectedClientId] = useState('');
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchClients = async () => {
//             try {
//                 // שימוש בפונקציה הקיימת שמושכת את הלקוחות של התזונאי
//                 const data = await apiService.nutritionist.getClients();
//                 setClients(data);
//             } catch (error) {
//                 console.error("שגיאה במשיכת לקוחות:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchClients();
//     }, []);

//     if (loading) return <div style={{ padding: '20px' }}>טוען נתונים...</div>;

//     return (
//         <div style={{ padding: '10px' }}>
//             <div style={{ marginBottom: '20px' }}>
//                 <h2>ניהול משימות למטופלים</h2>
//                 <p style={{ color: '#666' }}>בחר מטופל מהרשימה כדי לראות, להוסיף או לערוך את המשימות שלו.</p>
//             </div>

//             <div style={{ marginBottom: '20px', backgroundColor: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #ddd' }}>
//                 <label style={{ fontWeight: 'bold', marginLeft: '10px' }}>בחר מטופל:</label>
//                 <select 
//                     value={selectedClientId} 
//                     onChange={(e) => setSelectedClientId(e.target.value)}
//                     style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '200px', fontSize: '16px' }}
//                 >
//                     <option value="" disabled>-- רשימת המטופלים שלי --</option>
//                     {clients.map(client => (
//                         <option key={client.ID} value={client.ID}>{client.name}</option>
//                     ))}
//                 </select>
//             </div>

//             {/* אם נבחר לקוח, נציג את הקומפוננטה המשותפת של המשימות */}
//             {selectedClientId ? (
//                 <TaskManager clientId={selectedClientId} role="nutritionist" />
//             ) : (
//                 <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px dashed #ccc', color: '#666' }}>
//                     אנא בחר מטופל מהרשימה למעלה כדי להתחיל לנהל משימות.
//                 </div>
//             )}
//         </div>
//     );
// };

// export default NutritionistTasksPage;


import React, { useState, useEffect } from 'react';
import { apiService } from '../../api/api';
import TaskManager from '../../components/common/TaskManager';
import './styles/NutritionistTasks.css'; // ✅ ייבוא קובץ העיצוב החדש

const NutritionistTasksPage = () => {
    const [clients, setClients] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                // שימוש בפונקציה הקיימת שמושכת את הלקוחות של התזונאי
                const data = await apiService.nutritionist.getClients();
                setClients(data);
            } catch (error) {
                console.error("שגיאה במשיכת לקוחות:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchClients();
    }, []);

    if (loading) return <div className="nutritionist-tasks-loading">טוען נתונים...</div>;

    return (
        <div className="nutritionist-tasks-container">
            <div className="nutritionist-tasks-header">
                <h2 className="nutritionist-tasks-title">ניהול משימות למטופלים</h2>
                <p className="nutritionist-tasks-subtitle">בחר מטופל מהרשימה כדי לראות, להוסיף או לערוך את המשימות שלו.</p>
            </div>

            <div className="nutritionist-tasks-select-wrapper">
                <label className="nutritionist-tasks-label">בחר מטופל:</label>
                <select 
                    className="nutritionist-tasks-select"
                    value={selectedClientId} 
                    onChange={(e) => setSelectedClientId(e.target.value)}
                >
                    <option value="" disabled>-- רשימת המטופלים שלי --</option>
                    {clients.map(client => (
                        <option key={client.ID} value={client.ID}>{client.name}</option>
                    ))}
                </select>
            </div>

            {/* אם נבחר לקוח, נציג את הקומפוננטה המשותפת של המשימות */}
            {selectedClientId ? (
                <TaskManager clientId={selectedClientId} role="nutritionist" />
            ) : (
                <div className="nutritionist-tasks-empty-state">
                    אנא בחר מטופל מהרשימה למעלה כדי להתחיל לנהל משימות.
                </div>
            )}
        </div>
    );
};

export default NutritionistTasksPage;