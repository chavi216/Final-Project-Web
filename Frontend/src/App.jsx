// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom'; 

// // ייבוא ה-Context
// import { AuthProvider } from './context/AuthContext'; 

// // ייבוא קומפוננטות ניווט ותשתית
// import Navbar from './components/common/Navbar';
// import Sidebar from './components/common/Sidebar';
// import ProtectedRoute from './components/common/ProtectedRoute';

// // ייבוא עמודים
// import TestClientPage from './pages/Client/TestClientPage';
// import LoginPage from './pages/Login';
// import ClientVideosPage from './pages/Client/ClientVideosPage'; // עמוד סרטונים ללקוח
// import ClientBlogsPage from './pages/Client/ClientBlogsPage'; // עמוד בלוגים ללקוח

// // עיצוב גלובלי
// import './App.css';

// function App() {
//   return (
//     // עוטפים הכל ב-Provider כדי שכל האפליקציה תכיר את המשתמש
//     <AuthProvider>
//       <div className="app-container">
//         {/* הניווט העליון מופיע תמיד */}
//         <Navbar />
        
//         {/* מבנה של עמודת צד (Sidebar) ותוכן מרכזי */}
//         <div className="main-layout" style={{ display: 'flex', minHeight: '100vh' }}>
//           <Sidebar />
          
//           <main style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5' }}>
//             <Routes>
//               {/* נתיבים ציבוריים - ללא הגנה */}
//               <Route path="/login" element={<LoginPage />} />
              
//               {/* נתיבים מוגנים ללקוח (Client) */}
//               <Route 
//                 path="/client/dashboard" 
//                 element={
//                   <ProtectedRoute allowedRoles={['client']}>
//                     <TestClientPage />
//                   </ProtectedRoute>
//                 } 
//               />

//              <Route 
//                 path="/client/tasks" 
//                 element={
//                   <ProtectedRoute allowedRoles={['client']}>
//                     <div style={{ padding: '20px' }}>
//                       <h2>כאן יהיה עמוד המשימות המלא</h2>
//                       {/* בהמשך נעביר לפה את ClientTaskRow */}
//                     </div>
//                   </ProtectedRoute>
//                 } 
//               />

//               <Route 
//                 path="/client/food-plan" 
//                 element={
//                   <ProtectedRoute allowedRoles={['client']}>
//                     <div style={{ padding: '20px' }}>
//                       <h2>כאן יהיה עמוד התזונה המלא</h2>
//                       {/* בהמשך נעביר לפה את FoodPlanDayTable */}
//                     </div>
//                   </ProtectedRoute>
//                 } 
//               />

//               <Route 
//                 path="/client/videos" 
//                 element={
//                   <ProtectedRoute allowedRoles={['client']}>
//                     <ClientVideosPage />
//                   </ProtectedRoute>
//                 } 
//               />

//               <Route 
//                 path="/client/blogs" 
//                 element={
//                   <ProtectedRoute allowedRoles={['client']}>
//                     <ClientBlogsPage />
//                   </ProtectedRoute>
//                 } 
//               />
              
//               {/* ניתוב ברירת מחדל - אם המשתמש מגיע לנתיב לא קיים או לנתיב הראשי (/) */}
//               <Route path="*" element={<Navigate to="/client/dashboard" replace />} />
//             </Routes>
//           </main>
//         </div>
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;


// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/common/ProtectedRoute";
// import Navbar from "./components/common/Navbar";
// import Login from "./pages/Login";
// import TestClientPage from "./pages/Client/TestClientPage";
// import ClientVideosPage from "./pages/Client/ClientVideosPage";
// import ClientBlogsPage from "./pages/Client/ClientBlogsPage";
// import "./App.css";
// import Register from "./pages/Register";

// function App() {
//   return (
//     <AuthProvider>
//       <div className="app-container">
//         <Navbar />
//         <main style={{ padding: "20px" }}>
//           <Routes>
//             {/* נתיב ציבורי - מסך התחברות */}
//             <Route path="/login" element={<Login />} />

//             {/* נתיבים מוגנים עבור הלקוח (Client) */}
//             <Route 
//               path="/client/dashboard" 
//               element={
//                 <ProtectedRoute allowedRoles={["client"]}>
//                   <TestClientPage />
//                 </ProtectedRoute>
//               } 
//             />
            
//             <Route 
//               path="/client/videos" 
//               element={
//                 <ProtectedRoute allowedRoles={["client"]}>
//                   <ClientVideosPage />
//                 </ProtectedRoute>
//               } 
//             />

//             <Route 
//               path="/client/blogs" 
//               element={
//                 <ProtectedRoute allowedRoles={["client"]}>
//                   <ClientBlogsPage />
//                 </ProtectedRoute>
//               } 
//             />

//             {/* ניתוב ברירת מחדל - אם המשתמש לא מחובר, שולח אותו ללוגין */}
//             <Route path="*" element={<Navigate to="/login" replace />} />
//           </Routes>
//         </main>
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;



import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register"; // הייבוא הקיים שלך
import TestClientPage from "./pages/Client/TestClientPage";
import ClientVideosPage from "./pages/Client/ClientVideosPage";
import ClientBlogsPage from "./pages/Client/ClientBlogsPage";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Navbar />
        <main style={{ padding: "20px" }}>
          <Routes>
            {/* 🔑 נתיבים ציבוריים - נגישים לכולם */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> {/* האוסף החדש שסידרנו */}

            {/* 🔒 נתיבים מוגנים עבור הלקוח (Client) */}
            <Route 
              path="/client/dashboard" 
              element={
                <ProtectedRoute allowedRoles={["client"]}>
                  <TestClientPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/client/videos" 
              element={
                <ProtectedRoute allowedRoles={["client"]}>
                  <ClientVideosPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/client/blogs" 
              element={
                <ProtectedRoute allowedRoles={["client"]}>
                  <ClientBlogsPage />
                </ProtectedRoute>
              } 
            />

            {/* 🔄 ניתוב ברירת מחדל - מפנה אוטומטית ללוגין אם הכתובת לא קיימת */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;