// // import React, { useEffect, useState } from 'react';
// // import { apiService } from '../../api/api';
// // import ClientProfileCard from '../../components/client/ClientProfileCard';
// // import { useNavigate } from 'react-router-dom';

// // const ClientDashboardPage = () => {
// //   const [profile, setProfile] = useState(null);
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const loadProfile = async () => {
// //       try {
// //         const data = await apiService.client.getInfo();
// //         setProfile(data);
// //       } catch (err) {
// //         setError(err.message || 'נכשלה טעינת פרופיל המשתמש');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     loadProfile();
// //   }, []);

// //   if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>טוען פרופיל...</div>;
// //   if (error) return <div style={{ color: 'red', padding: '20px' }}>שגיאה: {error}</div>;

// //   return (
// //     <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
// //       <h2>👋 ברוך הבא לדשבורד שלך</h2>
// //       <hr />
// //       <div style={{ marginTop: '20px' }}>
// //         <ClientProfileCard clientInfo={profile} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default ClientDashboardPage;


// import React, { useEffect, useState } from 'react';
// import { apiService } from '../../api/api';
// import ClientProfileCard from '../../components/client/ClientProfileCard';
// import { useNavigate } from 'react-router-dom';

// const ClientDashboardPage = () => {
//   const [profile, setProfile] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const data = await apiService.client.getInfo();
        
//         // אם חסר מאמן או תזונאי, מפנים לדף בחירת הצוות ועוצרים את טעינת הדשבורד
//         if (!data.trainer_id || !data.nutritionist_id) {
//           navigate('/client/onboarding');
//           return; 
//         }

//         setProfile(data);
//       } catch (err) {
//         setError(err.message || 'נכשלה טעינת פרופיל המשתמש');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadProfile();
//   }, [navigate]);

//   if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>טוען פרופיל...</div>;
//   if (error) return <div style={{ color: 'red', padding: '20px' }}>שגיאה: {error}</div>;

//   return (
//     <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
//       <h2>👋 ברוך הבא לדשבורד שלך</h2>
//       <hr />
//       <div style={{ marginTop: '20px' }}>
//         <ClientProfileCard clientInfo={profile} />
//       </div>
//     </div>
//   );
// };

// export default ClientDashboardPage;



import React, { useEffect, useState } from 'react';
import { apiService } from '../../api/api';
import ClientProfileCard from '../../components/client/ClientProfileCard';
import { useNavigate } from 'react-router-dom';

const ClientDashboardPage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await apiService.client.getInfo();
        
        // --- שינוי זמני: כאן אנחנו בודקים רק את התזונאי ---
        if (!data.nutritionist_id) {
          navigate('/client/onboarding');
          return; 
        }

        setProfile(data);
      } catch (err) {
        setError(err.message || 'נכשלה טעינת פרופיל המשתמש');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [navigate]);

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>טוען פרופיל...</div>;
  if (error) return <div style={{ color: 'red', padding: '20px' }}>שגיאה: {error}</div>;

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>👋 ברוך הבא לדשבורד שלך</h2>
      <hr />
      <div style={{ marginTop: '20px' }}>
        <ClientProfileCard clientInfo={profile} />
      </div>
    </div>
  );
};

export default ClientDashboardPage;