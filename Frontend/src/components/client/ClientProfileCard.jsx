// // import React from 'react';
// // import './styles/ClientProfileCard.css';

// // const ClientProfileCard = ({ clientInfo }) => {
// //   if (!clientInfo) return <div className="loading-info">טוען נתוני פרופיל...</div>;

// //   return (
// //     <div className="profile-card">
// //       <div className="profile-header">
// //         <h3>הפרופיל שלי</h3>
// //       </div>
// //       <div className="profile-body">
// //         <div className="profile-item">
// //           <span className="item-label">שם מלא:</span>
// //           <span className="item-value">{clientInfo.name}</span>
// //         </div>
// //         <div className="profile-item">
// //           <span className="item-label">אימייל:</span>
// //           <span className="item-value">{clientInfo.email}</span>
// //         </div>
// //         <div className="profile-item">
// //           <span className="item-label">מספר טלפון:</span>
// //           <span className="item-value">{clientInfo.phone_number || 'לא קיימת הגדרה'}</span>
// //         </div>
// //         <div className="profile-item">
// //           <span className="item-label">כתובת מגורים:</span>
// //           <span className="item-value">{clientInfo.address || 'לא קיימת הגדרה'}</span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ClientProfileCard;

// import React, { useRef } from 'react';
// import './styles/ClientProfileCard.css';
// import { clientApi } from '../../api/clientApi';

// const ClientProfileCard = ({ clientInfo }) => {
//   console.log("--- היי, אני ה-Routes שנמצא בתיקייה הנכונה! ---");
//   const fileInputRef = useRef(null);

//   // הוספתי בדיקה בסיסית אם clientInfo קיים
//   if (!clientInfo || !clientInfo.name) {
//     return <div className="loading-info">טוען נתוני פרופיל...</div>;
//   }

//   const handleImageClick = () => fileInputRef.current.click();

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('profileImage', file);

//     try {
//       // כאן התיקון: שימוש בשם הפונקציה הנכון מה-API
//       await clientApi.uploadProfileImage(formData);
//       alert('התמונה עודכנה בהצלחה!');
//       window.location.reload(); 
//     } catch (error) {
//       console.error("שגיאה בהעלאת תמונה:", error);
//       alert('נכשל בהעלאת התמונה - בדקי את הטרמינל בשרת');
//     }
//   };

//   const getInitials = (name) => name ? name.charAt(0).toUpperCase() : 'U';

//   return (
//     <div className="profile-card">
//       <div className="profile-header" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
//         {clientInfo.profile_image_url ? (
//           <img src={`http://localhost:3000${clientInfo.profile_image_url}`} alt="Profile" className="profile-img" />
//         ) : (
//           <div className="profile-initials-circle">{getInitials(clientInfo.name)}</div>
//         )}
//         <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
//         <p>לחצי על התמונה לעדכון</p>
//       </div>

//       <div className="profile-body">
//         <div className="profile-item">
//           <span className="item-label">שם מלא:</span>
//           <span className="item-value">{clientInfo.name}</span>
//         </div>
//         <div className="profile-item">
//           <span className="item-label">אימייל:</span>
//           <span className="item-value">{clientInfo.email}</span>
//         </div>
//         <div className="profile-item">
//           <span className="item-label">טלפון:</span>
//           <span className="item-value">{clientInfo.phone_number || 'לא קיימת הגדרה'}</span>
//         </div>
//         <div className="profile-item">
//           <span className="item-label">כתובת:</span>
//           <span className="item-value">{clientInfo.address || 'לא קיימת הגדרה'}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientProfileCard;


import React, { useRef } from 'react';
import './styles/ClientProfileCard.css';
import { clientApi } from '../../api/clientApi';

const ClientProfileCard = ({ clientInfo }) => {
  console.log("--- היי, אני ה-Routes שנמצא בתיקייה הנכונה! ---");
  const fileInputRef = useRef(null);

  // בדיקה בסיסית אם clientInfo קיים
  if (!clientInfo || !clientInfo.name) {
    return <div className="loading-info">טוען נתוני פרופיל...</div>;
  }

  const handleImageClick = () => fileInputRef.current.click();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      await clientApi.uploadProfileImage(formData);
      alert('התמונה עודכנה בהצלחה!');
      window.location.reload(); 
    } catch (error) {
      console.error("שגיאה בהעלאת תמונה:", error);
      alert('נכשל בהעלאת התמונה - בדקי את הטרמינל בשרת');
    }
  };

  const getInitials = (name) => name ? name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="profile-card">
      <div className="profile-header" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
        {/* התיקון כאן: שימוש ב-profile_image כדי להתאים לשרת ולמסד הנתונים */}
        {clientInfo.profile_image ? (
          <img src={`http://localhost:3000${clientInfo.profile_image}`} alt="Profile" className="profile-img" />
        ) : (
          <div className="profile-initials-circle">{getInitials(clientInfo.name)}</div>
        )}
        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
        <p>לחצי על התמונה לעדכון</p>
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
          <span className="item-label">טלפון:</span>
          <span className="item-value">{clientInfo.phone_number || 'לא קיימת הגדרה'}</span>
        </div>
        <div className="profile-item">
          <span className="item-label">כתובת:</span>
          <span className="item-value">{clientInfo.address || 'לא קיימת הגדרה'}</span>
        </div>
      </div>
    </div>
  );
};

export default ClientProfileCard;