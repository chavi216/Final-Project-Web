// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { clientApi } from '../../api/clientApi';
// import Button from '../../components/common/Button';

// const ClientOnboarding = () => {
//   const [trainers, setTrainers] = useState([]);
//   const [nutritionists, setNutritionists] = useState([]);
//   const [selectedTrainer, setSelectedTrainer] = useState('');
//   const [selectedNutritionist, setSelectedNutritionist] = useState('');
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfessionals = async () => {
//       try {
//         const data = await clientApi.getProfessionals(); 
//         setTrainers(data.filter(p => p.role === 'trainer'));
//         setNutritionists(data.filter(p => p.role === 'nutritionist'));
//       } catch (error) {
//         console.error("שגיאה בטעינת אנשי מקצוע", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfessionals();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedTrainer || !selectedNutritionist) {
//       alert("יש לבחור גם מאמן וגם תזונאי");
//       return;
//     }

//     try {
//       await clientApi.updateTeam({
//         trainer_id: selectedTrainer,
//         nutritionist_id: selectedNutritionist
//       });
//       // מעבר אוטומטי לדשבורד לאחר שמירה בהצלחה
//       navigate('/client/dashboard');
//     } catch (error) {
//       alert("אירעה שגיאה בשמירת הנתונים. נסה שנית.");
//       console.error(error);
//     }
//   };

//   if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>טוען נתונים...</div>;

//   return (
//     <div style={{ maxWidth: "500px", margin: "50px auto", padding: "30px", border: "1px solid #ccc", borderRadius: "8px", background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
//       <h2 style={{ textAlign: "center", marginBottom: "10px" }}>ברוך הבא למערכת!</h2>
//       <p style={{ textAlign: "center", marginBottom: "30px", color: "#666" }}>כדי להתחיל, אנא בחר את המאמן והתזונאי שילוו אותך בתהליך.</p>

//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: "20px" }}>
//           <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>בחר מאמן כושר:</label>
//           <select 
//             value={selectedTrainer} 
//             onChange={(e) => setSelectedTrainer(e.target.value)}
//             style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px" }}
//             required
//           >
//             <option value="" disabled>-- רשימת מאמנים --</option>
//             {trainers.map(t => (
//               <option key={t.ID} value={t.ID}>{t.name}</option>
//             ))}
//           </select>
//         </div>

//         <div style={{ marginBottom: "30px" }}>
//           <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>בחר תזונאי:</label>
//           <select 
//             value={selectedNutritionist} 
//             onChange={(e) => setSelectedNutritionist(e.target.value)}
//             style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px" }}
//             required
//           >
//             <option value="" disabled>-- רשימת תזונאים --</option>
//             {nutritionists.map(n => (
//               <option key={n.ID} value={n.ID}>{n.name}</option>
//             ))}
//           </select>
//         </div>

//         <div style={{ textAlign: "center" }}>
//           <Button type="submit">שמור והתחל לעבוד</Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ClientOnboarding;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clientApi } from '../../api/clientApi';
import Button from '../../components/common/Button';

const ClientOnboarding = () => {
  const [trainers, setTrainers] = useState([]);
  const [nutritionists, setNutritionists] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [selectedNutritionist, setSelectedNutritionist] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const data = await clientApi.getProfessionals(); 
        setTrainers(data.filter(p => p.role === 'trainer'));
        setNutritionists(data.filter(p => p.role === 'nutritionist'));
      } catch (error) {
        console.error("שגיאה בטעינת אנשי מקצוע", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfessionals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // --- שינוי זמני: חובה לבחור רק תזונאי ---
    if (!selectedNutritionist) {
      alert("יש לבחור תזונאי כדי להמשיך");
      return;
    }

    try {
      await clientApi.updateTeam({
        trainer_id: selectedTrainer || null, // אם לא תבחרי מאמן, יישמר ריק (null)
        nutritionist_id: selectedNutritionist
      });
      navigate('/client/dashboard');
    } catch (error) {
      alert("אירעה שגיאה בשמירת הנתונים. נסה שנית.");
      console.error(error);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>טוען נתונים...</div>;

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", padding: "30px", border: "1px solid #ccc", borderRadius: "8px", background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>ברוך הבא למערכת!</h2>
      <p style={{ textAlign: "center", marginBottom: "30px", color: "#666" }}>כדי להתחיל, אנא בחר את המאמן והתזונאי שילוו אותך בתהליך.</p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          {/* הוספתי טקסט שאומר שזה אופציונלי כרגע */}
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>בחר מאמן כושר (אופציונלי כרגע):</label>
          <select 
            value={selectedTrainer} 
            onChange={(e) => setSelectedTrainer(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px" }}
            // {/* המילה required נמחקה מכאן לחלוטין */}
          >
            <option value="" disabled>-- רשימת מאמנים --</option>
            {trainers.map(t => (
              <option key={t.ID} value={t.ID}>{t.name}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>בחר תזונאי:</label>
          <select 
            value={selectedNutritionist} 
            onChange={(e) => setSelectedNutritionist(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px" }}
            required
          >
            <option value="" disabled>-- רשימת תזונאים --</option>
            {nutritionists.map(n => (
              <option key={n.ID} value={n.ID}>{n.name}</option>
            ))}
          </select>
        </div>

        <div style={{ textAlign: "center" }}>
          <Button type="submit">שמור והתחל לעבוד</Button>
        </div>
      </form>
    </div>
  );
};

export default ClientOnboarding;