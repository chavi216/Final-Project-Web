
import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
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
              <NavLink to="/client/videos" className={({ isActive }) => isActive ? 'active' : ''}>
                סרטוני כושר 🎥
              </NavLink>
            </li>
            <li>
              <NavLink to="/client/blogs" className={({ isActive }) => isActive ? 'active' : ''}>
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
              <Link to="/admin/users" className="admin-link">ניהול משתמשים</Link>
            </li>
            <li>
              <details className="admin-details">
                <summary className="admin-summary">ניהול תוכן</summary>
                <ul className="admin-submenu">
                  <li><Link to="/admin/tasks">ניהול משימות</Link></li>
                  <li><Link to="/admin/blogs">ניהול בלוגים</Link></li>
                  <li><Link to="/admin/videos">ניהול סרטונים</Link></li>
                </ul>
              </details>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;