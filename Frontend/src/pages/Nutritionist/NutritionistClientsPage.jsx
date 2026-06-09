import React, { useState } from 'react';
import Button from '../../components/common/Button';

const NutritionistClientsPage = () => {
    const [clients, setClients] = useState([
        { id: 1, name: 'ישראל ישראלי', email: 'israel@test.com', phone: '050-1234567' },
        { id: 2, name: 'דנה לוי', email: 'dana@test.com', phone: '052-7654321' }
    ]);

    const handleManageDiet = (clientId) => {
        console.log(`עריכת תפריט עבור מטופל מספר: ${clientId}`);
    };

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginBottom: '20px' }}>
                <h2>ניהול מטופלים</h2>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f1f1f1', borderBottom: '2px solid #ddd' }}>
                            <th style={thTdStyle}>שם המטופל</th>
                            <th style={thTdStyle}>אימייל</th>
                            <th style={thTdStyle}>טלפון</th>
                            <th style={thTdStyle}>פעולות</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={thTdStyle}>{client.name}</td>
                                <td style={thTdStyle}>{client.email}</td>
                                <td style={thTdStyle}>{client.phone}</td>
                                <td style={thTdStyle}>
                                    <Button onClick={() => handleManageDiet(client.id)}>
                                        נהל תפריט תזונה
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const thTdStyle = {
    padding: '12px 15px',
    fontSize: '14px'
};

export default NutritionistClientsPage;