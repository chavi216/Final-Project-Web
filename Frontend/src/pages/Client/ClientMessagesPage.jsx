// import React, { useState, useEffect } from 'react';
// import { apiService } from '../../api/api';

// const ClientMessagesPage = () => {
//   const [contacts] = useState([
//     { id: 444447777, name: 'ישראל המאמן', role: 'מאמן כושר', avatar: '🏋️‍♂️' },
//     { id: 222, name: 'דינה תזונאית', role: 'תזונאית', avatar: '🥗' },
//     { id: 111111111, name: 'מנהלת מערכת', role: 'הנהלה', avatar: '🛠️' }
//   ]);

//   const [activeContact, setActiveContact] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const loadChatHistory = async (contactId) => {
//     try {
//       setLoading(true);
//       const history = await apiService.client.getMessages(contactId);
//       // המרה בטוחה למספר כדי למנוע טעויות בהשוואה
//       const currentUserId = Number(localStorage.getItem('userID')); 

//       const formatted = history.map(msg => ({
//         id: msg.message_ID,
//         text: msg.body,
//         // השוואה בטוחה (Number ל-Number)
//         sender: Number(msg.from_ID) === currentUserId ? 'me' : 'them',
//         time: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       }));
//       setMessages(formatted);
//     } catch (err) {
//       console.error("שגיאה בטעינת היסטוריה:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (activeContact) {
//       loadChatHistory(activeContact.id);
//     }
//   }, [activeContact]);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !activeContact) return;

//     const messageText = newMessage;
//     const currentUserId = Number(localStorage.getItem('userID'));
    
//     // יצירת הודעה זמנית לתצוגה מיידית
//     const newMsgObj = { 
//       id: Date.now(), 
//       sender: 'me', 
//       text: messageText, 
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
//     };
    
//     setMessages(prev => [...prev, newMsgObj]);
//     setNewMessage(''); 

//     try {
//       await apiService.client.sendMessage({ 
//         to_ID: activeContact.id, 
//         body: messageText 
//       });
//     } catch (err) {
//       alert('שגיאה בשליחת ההודעה');
//     }
//   };

//   return (
//     <div style={{ padding: '20px', height: '85vh', display: 'flex', flexDirection: 'column' }}>
//       <h2 style={{ marginBottom: '15px' }}>💬 צ'אט מערכת</h2>
      
//       <div style={{ display: 'flex', flex: 1, border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
//         <div style={{ width: '30%', borderLeft: '1px solid #ddd', backgroundColor: '#f8f9fa', display: 'flex', flexDirection: 'column' }}>
//           <div style={{ padding: '15px', backgroundColor: '#ebebeb', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>אנשי צוות</div>
//           <div style={{ overflowY: 'auto', flex: 1 }}>
//             {contacts.map(contact => (
//               <div key={contact.id} onClick={() => setActiveContact(contact)} style={{
//                 padding: '15px', borderBottom: '1px solid #eee', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
//                 backgroundColor: activeContact?.id === contact.id ? '#e9ecef' : 'transparent'
//               }}>
//                 <div style={{ fontSize: '24px' }}>{contact.avatar}</div>
//                 <div>
//                   <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{contact.name}</div>
//                   <div style={{ fontSize: '13px', color: '#666' }}>{contact.role}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div style={{ width: '70%', display: 'flex', flexDirection: 'column', backgroundColor: '#e5ddd5' }}>
//           {activeContact ? (
//             <>
//               <div style={{ padding: '15px', backgroundColor: '#ebebeb', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', gap: '10px' }}>
//                 <div style={{ fontSize: '20px' }}>{activeContact.avatar}</div>
//                 <strong>{activeContact.name}</strong>
//               </div>

//               <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
//                 {messages.map(msg => (
//                   <div key={msg.id} style={{
//                     // מיקום: שלי ימין (flex-end), שלהם שמאל (flex-start)
//                     alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
//                     // צבע: שלי ירוק (#dcf8c6), שלהם לבן (#fff)
//                     backgroundColor: msg.sender === 'me' ? '#dcf8c6' : '#fff',
//                     padding: '8px 12px',
//                     borderRadius: '8px',
//                     maxWidth: '70%',
//                     boxShadow: '0 1px 1px rgba(0,0,0,0.1)'
//                   }}>
//                     <div style={{ fontSize: '14px' }}>{msg.text}</div>
//                     <div style={{ fontSize: '10px', color: '#888', textAlign: 'left' }}>{msg.time}</div>
//                   </div>
//                 ))}
//               </div>

//               <div style={{ padding: '15px', backgroundColor: '#f0f0f0' }}>
//                 <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px' }}>
//                   <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="הקלד הודעה..." style={{ flex: 1, padding: '10px', borderRadius: '20px', border: 'none', outline: 'none' }} />
//                   <button type="submit" disabled={!newMessage.trim()} style={{ padding: '10px 20px', borderRadius: '20px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>שלח</button>
//                 </form>
//               </div>
//             </>
//           ) : (
//             <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', color: '#888' }}>
//               <h2>בחר איש קשר כדי להתחיל שיחה</h2>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientMessagesPage;


import React, { useState, useEffect } from 'react';
import { apiService } from '../../api/api';
import './Styles/ClientMessages.css'; // ✅ ייבוא קובץ העיצוב החדש

const ClientMessagesPage = () => {
  const [contacts] = useState([
    { id: 444447777, name: 'ישראל המאמן', role: 'מאמן כושר', avatar: '🏋️‍♂️' },
    { id: 222, name: 'דינה תזונאית', role: 'תזונאית', avatar: '🥗' },
    { id: 111111111, name: 'מנהלת מערכת', role: 'הנהלה', avatar: '🛠️' }
  ]);

  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const loadChatHistory = async (contactId) => {
    try {
      setLoading(true);
      const history = await apiService.client.getMessages(contactId);
      // המרה בטוחה למספר כדי למנוע טעויות בהשוואה
      const currentUserId = Number(localStorage.getItem('userID')); 

      const formatted = history.map(msg => ({
        id: msg.message_ID,
        text: msg.body,
        // השוואה בטוחה (Number ל-Number)
        sender: Number(msg.from_ID) === currentUserId ? 'me' : 'them',
        time: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));
      setMessages(formatted);
    } catch (err) {
      console.error("שגיאה בטעינת היסטוריה:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeContact) {
      loadChatHistory(activeContact.id);
    }
  }, [activeContact]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeContact) return;

    const messageText = newMessage;
    
    // יצירת הודעה זמנית לתצוגה מיידית
    const newMsgObj = { 
      id: Date.now(), 
      sender: 'me', 
      text: messageText, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    
    setMessages(prev => [...prev, newMsgObj]);
    setNewMessage(''); 

    try {
      await apiService.client.sendMessage({ 
        to_ID: activeContact.id, 
        body: messageText 
      });
    } catch (err) {
      alert('שגיאה בשליחת ההודעה');
    }
  };

  return (
    <div className="client-messages-container">
      <h2 className="client-messages-title">💬 צ'אט מערכת</h2>
      
      <div className="client-messages-layout">
        {/* --- אזור בחירת אנשי קשר (סיידבר / שורה עליונה במובייל) --- */}
        <div className="client-contacts-sidebar">
          <div className="client-contacts-header">אנשי צוות</div>
          <div className="client-contacts-list">
            {contacts.map(contact => (
              <div 
                key={contact.id} 
                onClick={() => setActiveContact(contact)} 
                className={`client-contact-item ${activeContact?.id === contact.id ? 'active' : ''}`}
              >
                <div className="client-contact-avatar">{contact.avatar}</div>
                <div>
                  <div className="client-contact-name">{contact.name}</div>
                  <div className="client-contact-role">{contact.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- חלון השיחה המרכזי --- */}
        <div className="client-chat-area">
          {activeContact ? (
            <>
              <div className="client-chat-header">
                <div style={{ fontSize: '20px' }}>{activeContact.avatar}</div>
                <strong>{activeContact.name}</strong>
              </div>

              <div className="client-chat-history">
                {loading && <div style={{ textAlign: 'center', color: '#888' }}>טוען הודעות...</div>}
                {!loading && messages.map(msg => (
                  <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
                    <div className="chat-bubble-text">{msg.text}</div>
                    <div className="chat-bubble-time">{msg.time}</div>
                  </div>
                ))}
              </div>

              <div className="client-chat-input-area">
                <form onSubmit={handleSendMessage} className="client-chat-form">
                  <input 
                    type="text" 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                    placeholder="הקלד הודעה..." 
                    className="client-chat-input" 
                  />
                  <button 
                    type="submit" 
                    disabled={!newMessage.trim()} 
                    className="client-chat-submit"
                  >
                    שלח
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="client-chat-empty">
              <h2>בחר איש קשר כדי להתחיל שיחה</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientMessagesPage;