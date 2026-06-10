import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './styles/Sidebar.css';

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  if (!user || !user.role) return null;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h4>תפריט ניהול</h4>
      </div>
      <ul className="sidebar-menu">
        {/* קישורים ייחודיים ללקוח */}
        {user.role === 'client' && (
          <>
            <li>
              <NavLink to="/client/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                הפרופיל שלי
              </NavLink>
            </li>
            <li>
              <NavLink to="/client/tasks" className={({ isActive }) => isActive ? 'active' : ''}>
                משימות ואימונים
              </NavLink>
            </li>
            <li>
              <NavLink to="/client/food-plan" className={({ isActive }) => isActive ? 'active' : ''}>
                תוכנית תזונה
              </NavLink>
            </li>
            <li>
              <NavLink to="/client/messages" className={({ isActive }) => isActive ? 'active' : ''}>
                הודעות וצ'אט
              </NavLink>
            </li>
            <li>
              <NavLink to="/client/videos" className={({ isActive }) => isActive ? 'active-link' : ''}>
                סרטוני כושר 🎥
              </NavLink>
            </li>
            <li>
              <NavLink to="/client/blogs" className={({ isActive }) => isActive ? 'active-link' : ''}>
                בלוגים ומאמרים 📖
              </NavLink>
            </li>
          </>
        )}

        {/* קישורים ייחודיים למאמן */}
        {user.role === 'trainer' && (
          <>
            <li>
              <NavLink to="/trainer/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                דשבורד מאמן
              </NavLink>
            </li>
            <li>
              <NavLink to="/trainer/videos" className={({ isActive }) => isActive ? 'active' : ''}>
                ניהול סרטוני כושר
              </NavLink>
            </li>
           
            {/* --- הקישורים שהוספנו למשימות ולבלוגים --- */}
            <li>
              <NavLink to="/trainer/tasks" className={({ isActive }) => isActive ? 'active' : ''}>
                ניהול משימות
              </NavLink>
            </li>
            <li>
              <NavLink to="/trainer/blogs" className={({ isActive }) => isActive ? 'active' : ''}>
                ניהול בלוגים
              </NavLink>
            </li>
          </>
        )}
        {/* קישורים ייחודיים לתזונאי */}
        {user.role === 'nutritionist' && (
          <>
            <li>
              <NavLink to="/nutritionist/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                דשבורד תזונאי
              </NavLink>
            </li>
            <li>
              <NavLink to="/nutritionist/clients" className={({ isActive }) => isActive ? 'active' : ''}>
                ניהול לקוחות
              </NavLink>
            </li>
            {/* --- השורה החדשה שהוספנו --- */}
            <li>
              <NavLink to="/nutritionist/tasks" className={({ isActive }) => isActive ? 'active' : ''}>
                ניהול משימות
              </NavLink>
            </li>
            <li>
              <NavLink to="/nutritionist/blogs" className={({ isActive }) => isActive ? 'active' : ''}>
                ניהול בלוגים
              </NavLink>
            </li>
          </>
        )}

        {/* קישורים ייחודיים לאדמין */}
        {user.role === 'admin' && (
          <>
            <li>
              <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                דשבורד אדמין
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/register" className={({ isActive }) => isActive ? 'active' : ''}>
                רישום משתמש חדש
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/management" className={({ isActive }) => isActive ? 'active' : ''}>
                ניהול משתמשים ותוכן
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;