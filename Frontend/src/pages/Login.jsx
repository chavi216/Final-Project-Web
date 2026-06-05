import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom"; 
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
      const response = await apiService.auth.login({ email, password });
      localStorage.setItem('userID', response.id);
      
      // 🌟 התיקון: שמירה ב-localStorage
      if (response.id) { // וודאי שהשרת מחזיר id
        localStorage.setItem('userID', response.id);
      }
      
      login({
        token: response.token,
        role: response.role,
        name: response.name,
        id: response.id // כדאי להעביר גם ל-context
      });

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

      <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
        משתמש חדש במערכת? <Link to="/register" style={{ color: "#007bff", textDecoration: "none", fontWeight: "bold" }}>צור חשבון חדש כאן</Link>
      </p>
    </div>
  );
};

export default Login;