import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  // ממתינים לטעינת מצב המשתמש מה-Context (למשל אם בודקים LocalStorage באותו רגע)
  if (loading) {
    return <div>טוען...</div>; 
  }

  // אם המשתמש לא מחובר בכלל, ננתב אותו למסך הלוגין
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  // אם המשתמש מחובר אך התפקיד שלו לא מורשה לדף זה, נחזיר אותו לדף הבית
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // אם הכל תקין, נרנדר את הרכיבים שבתוך הנתיב
  return children;
};

export default ProtectedRoute;