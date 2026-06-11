// import React, { useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext"; 
// import { apiService } from "../api/api";
// import Input from "../components/common/Input";
// import Button from "../components/common/Button";

// const Register = () => {
//     const [formData, setFormData] = useState({
//         ID: "",
//         name: "",
//         email: "",
//         password: "",
//         address: "",
//         phone_number: "",
//         role: "client" // ערך ברירת מחדל התחלתי בטופס
//     });
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");
//     const [loading, setLoading] = useState(false);

//     const navigate = useNavigate();
    
//     const { login } = useContext(AuthContext); 

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         setSuccess("");
//         setLoading(true);

//         try {
//             const response = await apiService.auth.register({
//                 ...formData,
//                 ID: parseInt(formData.ID)
//             });

//             login({
//                 token: response.token,
//                 role: response.role,
//                 name: response.name
//             });

//             setSuccess("ההרשמה בוצעה בהצלחה! מנתב אותך למערכת...");
            
//             // תיקון הניתוב הדינמי: הוספת בדיקה עבור מאמן כושר
//             setTimeout(() => {
//                 if (response.role === "nutritionist") {
//                     navigate("/nutritionist/dashboard");
//                 } else if (response.role === "trainer") {
//                     navigate("/trainer/dashboard"); // ניתוב נכון למאמן
//                 } else {
//                     navigate("/client/dashboard");
//                 }
//             }, 1000); 

//         } catch (err) {
//             setError(err.message || "נכשלה ההרשמה. ודא כי ה-ID או האימייל אינם קיימים כבר במערכת.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div style={{ maxWidth: "450px", margin: "30px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
//             <h2 style={{ textAlign: "center" }}>הרשמה למערכת</h2>

//             {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
//             {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}

//             <form onSubmit={handleSubmit}>
//                 <Input
//                     label="תעודת זהות (ID):"
//                     type="text"
//                     name="ID"
//                     value={formData.ID}
//                     onChange={handleChange}
//                     required
//                     placeholder="הזן תעודת זהות"
//                 />

//                 <Input
//                     label="שם מלא:"
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     placeholder="הזן שם מלא"
//                 />

//                 {/* שדה בחירת סוג משתמש */}
//                 <div style={{ marginBottom: "15px", display: "flex", flexDirection: "column", gap: "5px" }}>
//                     <label style={{ fontWeight: "600", fontSize: "14px", textAlign: "right" }}>סוג חשבון:</label>
//                     <select
//                         name="role"
//                         value={formData.role}
//                         onChange={handleChange}
//                         required
//                         style={{
//                             padding: "10px",
//                             borderRadius: "4px",
//                             border: "1px solid #ccc",
//                             fontSize: "14px",
//                             backgroundColor: "#fff",
//                             width: "100%",
//                             direction: "rtl"
//                         }}
//                     >
//                         <option value="client">מתאמן / לקוח</option>
//                         <option value="nutritionist">תזונאי מוסמך</option>
//                         <option value="trainer">מאמן כושר</option>
//                     </select>
//                 </div>

//                 <Input
//                     label="כתובת אימייל:"
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter your email"
//                 />

//                 <Input
//                     label="סיסמה:"
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter your password"
//                 />

//                 <Input
//                     label="כתובת מגורים:"
//                     type="text"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     required
//                     placeholder="הזן כתובת"
//                 />

//                 <Input
//                     label="מספר טלפון:"
//                     type="text"
//                     name="phone_number"
//                     value={formData.phone_number}
//                     onChange={handleChange}
//                     required
//                     placeholder="הזן מספר טלפון"
//                 />

//                 <div style={{ marginTop: "20px" }}>
//                     <Button type="submit" disabled={loading}>
//                         {loading ? "מבצע הרשמה..." : "הרשם והיכנס למערכת"}
//                     </Button>
//                 </div>
//             </form>

//             <p style={{ textAlign: "center", marginTop: "15px" }}>
//                 כבר רשום במערכת? <Link to="/login">התחבר כאן</Link>
//             </p>
//         </div>
//     );
// };

// export default Register;

import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import { AuthContext } from "../context/AuthContext";
import { apiService } from "../api/api";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import './Styles/Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        ID: "", name: "", email: "", password: "",
        address: "", phone_number: "", role: "client"
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useContext(AuthContext); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await apiService.auth.register({
                ...formData,
                ID: parseInt(formData.ID)
            });

            login({
                token: response.token,
                role: response.role,
                name: response.name
            });

            setSuccess("ההרשמה בוצעה בהצלחה! מנתב אותך למערכת...");
            
            setTimeout(() => {
                if (response.role === "nutritionist") navigate("/nutritionist/dashboard");
                else if (response.role === "trainer") navigate("/trainer/dashboard");
                else navigate("/client/dashboard");
            }, 1000); 

        } catch (err) {
            setError(err.message || "נכשלה ההרשמה. ודא כי ה-ID או האימייל אינם קיימים כבר במערכת.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">הרשמה למערכת</h2>

            {error && <p className="register-message error">{error}</p>}
            {success && <p className="register-message success">{success}</p>}

            <form onSubmit={handleSubmit} className="register-form">
                <Input label="תעודת זהות (ID):" type="text" name="ID" value={formData.ID} onChange={handleChange} required placeholder="הזן תעודת זהות" />
                <Input label="שם מלא:" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="הזן שם מלא" />

                <div className="register-role-group">
                    <label className="register-role-label">סוג חשבון:</label>
                    <select name="role" value={formData.role} onChange={handleChange} required className="register-role-select">
                        <option value="client">מתאמן / לקוח</option>
                        <option value="nutritionist">תזונאי מוסמך</option>
                        <option value="trainer">מאמן כושר</option>
                    </select>
                </div>

                <Input label="כתובת אימייל:" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" />
                <Input label="סיסמה:" type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Enter your password" />
                <Input label="כתובת מגורים:" type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="הזן כתובת" />
                <Input label="מספר טלפון:" type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} required placeholder="הזן מספר טלפון" />

                <div className="register-button-wrapper">
                    <Button type="submit" disabled={loading}>
                        {loading ? "מבצע הרשמה..." : "הרשם והיכנס למערכת"}
                    </Button>
                </div>
            </form>

            <p className="register-footer">
                כבר רשום במערכת? <Link to="/login">התחבר כאן</Link>
            </p>
        </div>
    );
};

export default Register;