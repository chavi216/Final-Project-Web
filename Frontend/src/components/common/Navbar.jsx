import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">מערכת בריאות וכושר</Link>
      </div>
      <div className="navbar-links">
        {user && user.token ? (
          <div className="user-menu">
            <span className="user-welcome">שלום, {user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>התנתק</button>
          </div>
        ) : (
          <Link to="/login" className="login-link">התחברות</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;