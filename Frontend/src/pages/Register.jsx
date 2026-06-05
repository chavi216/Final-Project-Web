import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiService } from "../api/api";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Register = () => {
    const [formData, setFormData] = useState({
        ID: "",
        name: "",
        email: "",
        password: "",
        address: "",
        phone_number: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            // הוספת התפקיד (role) של המשתמש כברירת מחדל ישירות לקריאת ה-API
            await apiService.auth.register({
                ...formData,
                ID: parseInt(formData.ID), // המרת ה-ID למספר שלם
                role: "client"              // 🌟 הוספת השדה החסר עבור ה-MySQL!
            });

            setSuccess("ההרשמה בוצעה בהצלחה! מעביר אותך למסך ההתחברות...");
            setTimeout(() => {
                navigate("/login");
            }, 2500);
        } catch (err) {
            setError(err.message || "נכשלה ההרשמה. ודא כי ה-ID או האימייל אינם קיימים כבר במערכת.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "450px", margin: "30px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h2 style={{ textAlign: "center" }}>הרשמה למערכת</h2>

            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
            {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}

            <form onSubmit={handleSubmit}>
                <Input
                    label="תעודת זהות (ID):"
                    type="text"
                    name="ID"
                    value={formData.ID}
                    onChange={handleChange}
                    required
                    placeholder="הזן תעודת זהות"
                />

                <Input
                    label="שם מלא:"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="הזן שם מלא"
                />

                <Input
                    label="כתובת אימייל:"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                />

                <Input
                    label="סיסמה:"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                />

                <Input
                    label="כתובת מגורים:"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="הזן כתובת"
                />

                <Input
                    label="מספר טלפון:"
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                    placeholder="הזן מספר טלפון"
                />

                <div style={{ marginTop: "20px" }}>
                    <Button type="submit" disabled={loading}>
                        {loading ? "מבצע הרשמה..." : "הרשם ומסגר"}
                    </Button>
                </div>
            </form>

            <p style={{ textAlign: "center", marginTop: "15px" }}>
                כבר רשום במערכת? <Link to="/login">התחבר כאן</Link>
            </p>
        </div>
    );
};

export default Register;