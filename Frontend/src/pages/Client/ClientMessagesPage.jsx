import React, { useState, useEffect } from 'react';
import { apiService } from '../../api/api';

const ClientMessagesPage = () => {
  const [contacts, setContacts] = useState([
    { id: 444447777, name: 'ישראל המאמן', role: 'מאמן כושר', avatar: '🏋️‍♂️' },
    { id: 222, name: 'דינה תזונאית', role: 'תזונאית', avatar: '🥗' },
    { id: 111111111, name: 'מנהלת מערכת', role: 'הנהלה', avatar: '🛠️' }
  ]);
  

  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeContact) {
      setMessages([
        { id: 1, sender: 'them', text: `היי, אני ${activeContact.name}. איך אפשר לעזור?`, time: '10:00' }
      ]);
    }
  }, [activeContact]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeContact) return;
    const messageText = newMessage;
    setNewMessage(''); 
    const newMsgObj = { 
      id: Date.now(), 
      sender: 'me', 
      text: messageText, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    setMessages(prev => [...prev, newMsgObj]);
    try {
      setLoading(true);
      await apiService.client.sendMessage({ 
        to_ID: activeContact.id, 
        body: messageText 
      });
      
    } catch (err) {
      alert('שגיאה בשליחת ההודעה: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', height: '85vh', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ marginBottom: '15px' }}>💬 צ'אט מערכת</h2>
      <div style={{ 
        display: 'flex', 
        flex: 1, 
        border: '1px solid #ddd', 
        borderRadius: '10px', 
        overflow: 'hidden',
        backgroundColor: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
                <div style={{ 
          width: '30%', 
          borderLeft: '1px solid #ddd', 
          backgroundColor: '#f8f9fa',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ padding: '15px', backgroundColor: '#ebebeb', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>
            אנשי צוות
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {contacts.map(contact => (
              <div 
                key={contact.id} 
                onClick={() => setActiveContact(contact)}
                style={{
                  padding: '15px',
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: activeContact?.id === contact.id ? '#e9ecef' : 'transparent',
                  transition: 'background 0.2s'
                }}
              >
                <div style={{ fontSize: '24px' }}>{contact.avatar}</div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{contact.name}</div>
                  <div style={{ fontSize: '13px', color: '#666' }}>{contact.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- אזור השיחה הפעילה (שמאל) --- */}
        <div style={{ width: '70%', display: 'flex', flexDirection: 'column', backgroundColor: '#e5ddd5' }}>
          
          {activeContact ? (
            <>
              {/* כותרת הצ'אט */}
              <div style={{ padding: '15px', backgroundColor: '#ebebeb', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ fontSize: '20px' }}>{activeContact.avatar}</div>
                <strong style={{ fontSize: '16px' }}>{activeContact.name}</strong>
              </div>

              {/* חלון ההודעות עצמן */}
              <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {messages.map(msg => (
                  <div key={msg.id} style={{
                    alignSelf: msg.sender === 'me' ? 'flex-start' : 'flex-end',
                    backgroundColor: msg.sender === 'me' ? '#dcf8c6' : '#fff',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    maxWidth: '70%',
                    boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
                    position: 'relative'
                  }}>
                    <div style={{ fontSize: '14px', marginBottom: '4px' }}>{msg.text}</div>
                    <div style={{ fontSize: '10px', color: '#888', textAlign: msg.sender === 'me' ? 'left' : 'right' }}>
                      {msg.time}
                    </div>
                  </div>
                ))}
              </div>

              {/* שורת הקלדת ההודעה */}
              <div style={{ padding: '15px', backgroundColor: '#f0f0f0', display: 'flex', gap: '10px' }}>
                <form onSubmit={handleSendMessage} style={{ display: 'flex', width: '100%', gap: '10px' }}>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="הקלד הודעה..."
                    style={{ 
                      flex: 1, 
                      padding: '10px 15px', 
                      borderRadius: '20px', 
                      border: 'none', 
                      outline: 'none',
                      fontSize: '15px'
                    }}
                  />
                  <button 
                    type="submit" 
                    disabled={!newMessage.trim() || loading}
                    style={{ 
                      padding: '10px 20px', 
                      borderRadius: '20px', 
                      border: 'none', 
                      backgroundColor: '#007bff', 
                      color: 'white', 
                      cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                      fontWeight: 'bold'
                    }}
                  >
                    שלח
                  </button>
                </form>
              </div>
            </>
          ) : (
            /* מסך ריק כשלא נבחר איש קשר */
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', color: '#888', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '50px' }}>📱</div>
              <h2>בחר איש קשר כדי להתחיל שיחה</h2>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ClientMessagesPage;