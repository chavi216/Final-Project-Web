// import React, { useState, useEffect } from 'react';
// import Button from '../../components/common/Button';
// import { apiService } from '../../api/api';
// import DietPlanBuilder from '../../components/nutritionist/DietPlanBuilder';

// const NutritionistClientsPage = () => {
//     const [clients, setClients] = useState([]);
//     const [loading, setLoading] = useState(true);
    
//     const [selectedClient, setSelectedClient] = useState(null);
//     const [clientDiet, setClientDiet] = useState([]);
//     const [loadingDiet, setLoadingDiet] = useState(false);

//     // --- משתנים חדשים לניהול מצב העריכה ---
//     const [editingItemId, setEditingItemId] = useState(null);
//     const [editFormData, setEditFormData] = useState({ food: '', calories: '' });

//     const fetchClients = async () => {
//         try {
//             const data = await apiService.nutritionist.getClients();
//             setClients(data);
//         } catch (error) {
//             console.error("שגיאה במשיכת לקוחות:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchClients();
//     }, []);

//     const loadClientDiet = async (clientId) => {
//         setLoadingDiet(true);
//         try {
//             const data = await apiService.nutritionist.getClientDiet(clientId);
//             setClientDiet(data);
//         } catch (error) {
//             console.error("שגיאה בטעינת תפריט המטופל:", error);
//         } finally {
//             setLoadingDiet(false);
//         }
//     };

//     const handleManageDietClick = (client) => {
//         setSelectedClient(client);
//         loadClientDiet(client.ID);
//     };

//     const handleDeleteItem = async (tableId) => {
//         if (!window.confirm("האם אתה בטוח שברצונך למחוק פריט זה מהתפריט?")) return;
//         try {
//             await apiService.nutritionist.deleteFoodItem(tableId);
//             loadClientDiet(selectedClient.ID);
//         } catch (error) {
//             alert("נכשל מחיקת הפריט: " + error.message);
//         }
//     };

//     // --- הפונקציות החדשות לטיפול בעריכה ---
//     const handleEditClick = (item) => {
//         setEditingItemId(item.Table_ID);
//         setEditFormData({ food: item.food, calories: item.calories });
//     };

//     const handleCancelEdit = () => {
//         setEditingItemId(null);
//         setEditFormData({ food: '', calories: '' });
//     };

//     const handleUpdateSubmit = async (tableId) => {
//         try {
//             await apiService.nutritionist.updateFoodPlan(tableId, {
//                 food: editFormData.food,
//                 calories: parseInt(editFormData.calories)
//             });
//             setEditingItemId(null); // יציאה ממצב עריכה
//             loadClientDiet(selectedClient.ID); // רענון הנתונים
//         } catch (error) {
//             alert("נכשל בעדכון הפריט: " + error.message);
//         }
//     };

//     if (loading) return <div style={{ padding: '20px' }}>טוען מטופלים...</div>;

//     if (selectedClient) {
//         return (
//             <div style={{ padding: '10px' }}>
//                 <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <h2>ניהול תפריט תזונה עבור: {selectedClient.name}</h2>
//                     <Button onClick={() => setSelectedClient(null)}>חזור לרשימת הלקוחות</Button>
//                 </div>

//                 <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginTop: '20px' }}>
//                     <div style={{ flex: '1', minWidth: '300px' }}>
//                         <DietPlanBuilder 
//                             clientId={selectedClient.ID} 
//                             onSaveSuccess={() => loadClientDiet(selectedClient.ID)} 
//                         />
//                     </div>

//                     <div style={{ flex: '2', minWidth: '400px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
//                         <h3>התפריט הנוכחי במערכת</h3>
//                         {loadingDiet ? (
//                             <p>טוען תפריט...</p>
//                         ) : clientDiet.length === 0 ? (
//                             <p style={{ color: '#666', marginTop: '15px' }}>אין עדיין פריטים בתפריט של מטופל זה.</p>
//                         ) : (
//                             <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right', marginTop: '15px' }}>
//                                 <thead>
//                                     <tr style={{ backgroundColor: '#f9f9f9', borderBottom: '1px solid #ddd' }}>
//                                         <th style={thTdStyle}>תאריך</th>
//                                         <th style={thTdStyle}>מאכל</th>
//                                         <th style={thTdStyle}>קלוריות</th>
//                                         <th style={thTdStyle}>פעולות</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {clientDiet.map(item => (
//                                         <tr key={item.Table_ID} style={{ borderBottom: '1px solid #eee' }}>
//                                             <td style={thTdStyle}>{new Date(item.date).toLocaleDateString('he-IL')}</td>
                                            
//                                             {/* בדיקה: אם השורה הזו נמצאת בעריכה, נציג שדות קלט */}
//                                             {editingItemId === item.Table_ID ? (
//                                                 <>
//                                                     <td style={thTdStyle}>
//                                                         <input 
//                                                             type="text" 
//                                                             value={editFormData.food} 
//                                                             onChange={(e) => setEditFormData({ ...editFormData, food: e.target.value })}
//                                                             style={{ padding: '5px', width: '90%' }}
//                                                         />
//                                                     </td>
//                                                     <td style={thTdStyle}>
//                                                         <input 
//                                                             type="number" 
//                                                             value={editFormData.calories} 
//                                                             onChange={(e) => setEditFormData({ ...editFormData, calories: e.target.value })}
//                                                             style={{ padding: '5px', width: '70px' }}
//                                                         />
//                                                     </td>
//                                                     <td style={thTdStyle}>
//                                                         <button onClick={() => handleUpdateSubmit(item.Table_ID)} style={{ background: 'none', border: 'none', color: 'green', cursor: 'pointer', fontSize: '14px', marginLeft: '10px' }}>
//                                                             💾 שמור
//                                                         </button>
//                                                         <button onClick={handleCancelEdit} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '14px' }}>
//                                                             ❌ בטל
//                                                         </button>
//                                                     </td>
//                                                 </>
//                                             ) : (
//                                                 /* אם לא במצב עריכה, נציג טקסט רגיל */
//                                                 <>
//                                                     <td style={thTdStyle}>{item.food}</td>
//                                                     <td style={thTdStyle}>{item.calories}</td>
//                                                     <td style={thTdStyle}>
//                                                         <button onClick={() => handleEditClick(item)} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontSize: '14px', marginLeft: '10px' }}>
//                                                             ✏️ ערוך
//                                                         </button>
//                                                         <button onClick={() => handleDeleteItem(item.Table_ID)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '14px' }}>
//                                                             🗑️ מחק
//                                                         </button>
//                                                     </td>
//                                                 </>
//                                             )}
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div style={{ padding: '10px' }}>
//             <div style={{ marginBottom: '20px' }}>
//                 <h2>ניהול מטופלים</h2>
//             </div>

//             <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
//                 {clients.length === 0 ? (
//                     <div style={{ padding: '20px', textAlign: 'center' }}>אין לך כרגע מטופלים משויכים.</div>
//                 ) : (
//                     <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
//                         <thead>
//                             <tr style={{ backgroundColor: '#f1f1f1', borderBottom: '2px solid #ddd' }}>
//                                 <th style={thTdStyle}>שם המטופל</th>
//                                 <th style={thTdStyle}>אימייל</th>
//                                 <th style={thTdStyle}>טלפון</th>
//                                 <th style={thTdStyle}>פעולות</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {clients.map(client => (
//                                 <tr key={client.ID} style={{ borderBottom: '1px solid #eee' }}>
//                                     <td style={thTdStyle}>{client.name}</td>
//                                     <td style={thTdStyle}>{client.email}</td>
//                                     <td style={thTdStyle}>{client.phone_number || 'לא עודכן'}</td>
//                                     <td style={thTdStyle}>
//                                         <Button onClick={() => handleManageDietClick(client)}>
//                                             נהל תפריט תזונה
//                                         </Button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </div>
//     );
// };

// const thTdStyle = {
//     padding: '12px 15px',
//     fontSize: '14px'
// };

// export default NutritionistClientsPage;



import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button';
import { apiService } from '../../api/api';
import DietPlanBuilder from '../../components/nutritionist/DietPlanBuilder';
import './styles/NutritionistClients.css'; // ✅ ייבוא העיצוב החדש

const NutritionistClientsPage = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientDiet, setClientDiet] = useState([]);
    const [loadingDiet, setLoadingDiet] = useState(false);

    // --- משתנים לניהול מצב העריכה ---
    const [editingItemId, setEditingItemId] = useState(null);
    const [editFormData, setEditFormData] = useState({ food: '', calories: '' });

    const fetchClients = async () => {
        try {
            const data = await apiService.nutritionist.getClients();
            setClients(data);
        } catch (error) {
            console.error("שגיאה במשיכת לקוחות:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const loadClientDiet = async (clientId) => {
        setLoadingDiet(true);
        try {
            const data = await apiService.nutritionist.getClientDiet(clientId);
            setClientDiet(data);
        } catch (error) {
            console.error("שגיאה בטעינת תפריט המטופל:", error);
        } finally {
            setLoadingDiet(false);
        }
    };

    const handleManageDietClick = (client) => {
        setSelectedClient(client);
        loadClientDiet(client.ID);
    };

    const handleDeleteItem = async (tableId) => {
        if (!window.confirm("האם אתה בטוח שברצונך למחוק פריט זה מהתפריט?")) return;
        try {
            await apiService.nutritionist.deleteFoodItem(tableId);
            loadClientDiet(selectedClient.ID);
        } catch (error) {
            alert("נכשל מחיקת הפריט: " + error.message);
        }
    };

    // --- פונקציות לטיפול בעריכה ---
    const handleEditClick = (item) => {
        setEditingItemId(item.Table_ID);
        setEditFormData({ food: item.food, calories: item.calories });
    };

    const handleCancelEdit = () => {
        setEditingItemId(null);
        setEditFormData({ food: '', calories: '' });
    };

    const handleUpdateSubmit = async (tableId) => {
        try {
            await apiService.nutritionist.updateFoodPlan(tableId, {
                food: editFormData.food,
                calories: parseInt(editFormData.calories)
            });
            setEditingItemId(null); // יציאה ממצב עריכה
            loadClientDiet(selectedClient.ID); // רענון הנתונים
        } catch (error) {
            alert("נכשל בעדכון הפריט: " + error.message);
        }
    };

    if (loading) return <div className="nutritionist-clients-container">טוען מטופלים...</div>;

    // ----- תצוגת ניהול תפריט למטופל ספציפי -----
    if (selectedClient) {
        return (
            <div className="nutritionist-clients-container">
                <div className="nutritionist-clients-header">
                    <h2 className="nutritionist-clients-title">ניהול תפריט תזונה עבור: {selectedClient.name}</h2>
                    <Button onClick={() => setSelectedClient(null)}>חזור לרשימת הלקוחות</Button>
                </div>

                <div className="nutritionist-diet-layout">
                    <div className="nutritionist-diet-builder-side">
                        <DietPlanBuilder 
                            clientId={selectedClient.ID} 
                            onSaveSuccess={() => loadClientDiet(selectedClient.ID)} 
                        />
                    </div>

                    <div className="nutritionist-diet-list-side">
                        <h3>התפריט הנוכחי במערכת</h3>
                        {loadingDiet ? (
                            <p>טוען תפריט...</p>
                        ) : clientDiet.length === 0 ? (
                            <p className="nutritionist-empty-state">אין עדיין פריטים בתפריט של מטופל זה.</p>
                        ) : (
                            <div className="nutritionist-table-responsive">
                                <table className="nutritionist-table">
                                    <thead>
                                        <tr>
                                            <th>תאריך</th>
                                            <th>מאכל</th>
                                            <th>קלוריות</th>
                                            <th>פעולות</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clientDiet.map(item => (
                                            <tr key={item.Table_ID}>
                                                <td>{new Date(item.date).toLocaleDateString('he-IL')}</td>
                                                
                                                {/* מצב עריכה לעומת מצב תצוגה */}
                                                {editingItemId === item.Table_ID ? (
                                                    <>
                                                        <td>
                                                            <input 
                                                                className="nutritionist-edit-input"
                                                                type="text" 
                                                                value={editFormData.food} 
                                                                onChange={(e) => setEditFormData({ ...editFormData, food: e.target.value })}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input 
                                                                className="nutritionist-edit-input cal-input"
                                                                type="number" 
                                                                value={editFormData.calories} 
                                                                onChange={(e) => setEditFormData({ ...editFormData, calories: e.target.value })}
                                                            />
                                                        </td>
                                                        <td>
                                                            <button className="nutritionist-action-btn btn-save" onClick={() => handleUpdateSubmit(item.Table_ID)}>
                                                                💾 שמור
                                                            </button>
                                                            <button className="nutritionist-action-btn btn-cancel" onClick={handleCancelEdit}>
                                                                ❌ בטל
                                                            </button>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td>{item.food}</td>
                                                        <td>{item.calories}</td>
                                                        <td>
                                                            <button className="nutritionist-action-btn btn-edit" onClick={() => handleEditClick(item)}>
                                                                ✏️ ערוך
                                                            </button>
                                                            <button className="nutritionist-action-btn btn-delete" onClick={() => handleDeleteItem(item.Table_ID)}>
                                                                🗑️ מחק
                                                            </button>
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // ----- תצוגת רשימת הלקוחות הכללית -----
    return (
        <div className="nutritionist-clients-container">
            <div className="nutritionist-clients-header">
                <h2 className="nutritionist-clients-title">ניהול מטופלים</h2>
            </div>

            <div className="nutritionist-table-responsive">
                {clients.length === 0 ? (
                    <div className="nutritionist-empty-state">אין לך כרגע מטופלים משויכים.</div>
                ) : (
                    <table className="nutritionist-table">
                        <thead>
                            <tr>
                                <th>שם המטופל</th>
                                <th>אימייל</th>
                                <th>טלפון</th>
                                <th>פעולות</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map(client => (
                                <tr key={client.ID}>
                                    <td>{client.name}</td>
                                    <td>{client.email}</td>
                                    <td>{client.phone_number || 'לא עודכן'}</td>
                                    <td>
                                        <Button onClick={() => handleManageDietClick(client)}>
                                            נהל תפריט תזונה
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default NutritionistClientsPage;