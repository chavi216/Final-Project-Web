// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { apiService } from '../api/api'; // ודאי שהנתיב תואם
// import Input from '../components/common/Input'; 
// import Button from '../components/common/Button'; // ודאי שהנתיב תואם

// const LoginPage = () => {
//   // סטייטים לניהול הטופס
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // משיכת פונקציית הלוגין מהקונטקסט והכנת פונקציית הניווט
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // מונע ריענון של העמוד בשליחת טופס
//     setError('');
//     setIsLoading(true);

//     try {
//       // 1. שליחת הבקשה לשרת דרך ה-apiService שלך
//       const response = await apiService.auth.login({ email, password });
      
//       // 2. שמירת הנתונים בקונטקסט (וב-localStorage דרכו)
//       // מניחים שהשרת מחזיר אובייקט עם token, role ו-name
//       login({
//         token: response.token,
//         role: response.role,
//         name: response.name || 'משתמש'
//       });

//       // 3. ניתוב המשתמש לעמוד הנכון בהתאם לתפקיד שלו
//       if (response.role === 'client') {
//         navigate('/client/dashboard');
//       } else if (response.role === 'trainer') {
//         navigate('/trainer/dashboard');
//       } else if (response.role === 'nutritionist') {
//         navigate('/nutritionist/dashboard');
//       } else if (response.role === 'admin') {
//         navigate('/admin/dashboard');
//       } else {
//         navigate('/'); // ניתוב ברירת מחדל
//       }

//     } catch (err) {
//       // במידה והשרת זורק שגיאה (למשל סיסמה שגויה), נציג אותה
//       setError(err.message || 'אירעה שגיאה בהתחברות. אנא נסה שוב.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
//       <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>התחברות למערכת</h2>
      
//       <form onSubmit={handleSubmit}>
//         <Input 
//           label="אימייל" 
//           type="email" 
//           name="email" 
//           value={email} 
//           onChange={(e) => setEmail(e.target.value)} 
//           placeholder="הכנס אימייל" 
//           required={true}
//         />
        
//         <br />

//         <Input 
//           label="סיסמה" 
//           type="password" 
//           name="password" 
//           value={password} 
//           onChange={(e) => setPassword(e.target.value)} 
//           placeholder="הכנס סיסמה" 
//           required={true}
//         />
        
//         {error && <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</div>}
        
//         <div style={{ marginTop: '20px' }}>
//           <Button type="submit" variant="primary" disabled={isLoading}>
//             {isLoading ? 'מתחבר...' : 'כניסה'}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;


// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { apiService } from "../api/api";
// import Input from "../components/common/Input";
// import Button from "../components/common/Button";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
  
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       // קריאה לשרת לביצוע התחברות
//       const response = await apiService.auth.login({ email, password });
      
//       // שמירת הנתונים בקונטקסט הגלובלי (טוקן ותפקיד)
//       login(response.token, response.role);

//       // ניתוב אוטומטי לדשבורד של הלקוח
//       if (response.role === "client") {
//         navigate("/client/dashboard");
//       } else {
//         setError("כרגע ממשק הבדיקה מוגדר עבור לקוחות בלבד.");
//       }
//     } catch (err) {
//       setError(err.message || "אימייל או סיסמה שגויים. נסה שנית.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
//       <h2 style={{ textAlign: "center" }}>התחברות למערכת</h2>
//       {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      
//       <form onSubmit={handleSubmit}>
//         <Input
//           label="כתובת אימייל:"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           placeholder="Enter your email"
//         />
        
//         <Input
//           label="סיסמה:"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           placeholder="Enter your password"
//         />

//         <div style={{ marginTop: "20px" }}>
//           <Button type="submit" disabled={loading}>
//             {loading ? "מתחבר..." : "התחבר"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom"; // הוספנו את Link לייבוא
import { AuthContext } from "../context/AuthContext";
import { apiService } from "../api/api";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // פנייה לשרת לאימות הנתונים - /api/auth/login
      const response = await apiService.auth.login({ email, password });
      
      // שמירת הטוקן ותפקיד המשתמש בקונטקסט של האפליקציה וב-localStorage
      login(response.token, response.role);

      // ניתוב אוטומטי בהתאם לתפקיד המשתמש שהתקבל מהשרת
      if (response.role === "client") {
        navigate("/client/dashboard");
      } else {
        setError("כרגע מערכת הבדיקה המוגנת מוגדרת עבור לקוחות בלבד.");
      }
    } catch (err) {
      setError(err.message || "אימייל או סיסמה שגויים. נסה שנית.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>התחברות למערכת</h2>
      
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <Input
          label="כתובת אימייל:"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
        
        <Input
          label="סיסמה:"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />

        <div style={{ marginTop: "25px" }}>
          <Button type="submit" disabled={loading}>
            {loading ? "מתחבר..." : "התחבר"}
          </Button>
        </div>
      </form>

      {/* הקישור החשוב המקשר ומעביר ישירות לדף הרישום הציבורי */}
      <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
        משתמש חדש במערכת? <Link to="/register" style={{ color: "#007bff", textDecoration: "none", fontWeight: "bold" }}>צור חשבון חדש כאן</Link>
      </p>
    </div>
  );
};

export default Login;