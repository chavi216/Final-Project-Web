import React from 'react';
import './styles/ClientProfileCard.css';

const ClientProfileCard = ({ clientInfo }) => {
  if (!clientInfo) return <div className="loading-info">טוען נתוני פרופיל...</div>;

  return (
    <div className="profile-card">
      <div className="profile-header">
        <h3>הפרופיל שלי</h3>
      </div>
      <div className="profile-body">
        <div className="profile-item">
          <span className="item-label">שם מלא:</span>
          <span className="item-value">{clientInfo.name}</span>
        </div>
        <div className="profile-item">
          <span className="item-label">אימייל:</span>
          <span className="item-value">{clientInfo.email}</span>
        </div>
        <div className="profile-item">
          <span className="item-label">מספר טלפון:</span>
          <span className="item-value">{clientInfo.phone_number || 'לא קיימת הגדרה'}</span>
        </div>
        <div className="profile-item">
          <span className="item-label">כתובת מגורים:</span>
          <span className="item-value">{clientInfo.address || 'לא קיימת הגדרה'}</span>
        </div>
      </div>
    </div>
  );
};

export default ClientProfileCard;