import React from 'react';
import { AuthProvider } from './context/AuthContext'; // ייבוא ה-Provider הפיקסלי של האימות
import TestClientPage from './pages/Client/TestClientPage';
import Navbar from './components/common/Navbar';
import './App.css';

function App() {
  return (
    // עטיפת כל האפליקציה ב-AuthProvider כדי ש-Navbar וכל שאר המסכים יקבלו גישה ל-user
    <AuthProvider>
      <div className="app-container">
        <Navbar />
        <main style={{ padding: '20px' }}>
          {/* תצוגת עמוד הבדיקה הנוכחי */}
          <TestClientPage />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;