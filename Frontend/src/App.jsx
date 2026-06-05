import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import ClientMessagesPage from "./pages/Client/ClientMessagesPage";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ClientDashboardPage from "./pages/Client/ClientDashboardPage";
import ClientTasksPage from "./pages/Client/ClientTasksPage";
import ClientFoodPlanPage from "./pages/Client/ClientFoodPlanPage";
import ClientVideosPage from "./pages/Client/ClientVideosPage";
import ClientBlogsPage from "./pages/Client/ClientBlogsPage";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Navbar />
        
        <div className="main-layout" style={{ display: 'flex', minHeight: '100vh' }}>
          
          <Sidebar /> 
          
          <main style={{ flex: 1, padding: "20px", backgroundColor: '#f5f5f5' }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route 
                path="/client/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={["client"]}>
                    <ClientDashboardPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/client/tasks" 
                element={
                  <ProtectedRoute allowedRoles={["client"]}>
                    <ClientTasksPage />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/client/food-plan" 
                element={
                  <ProtectedRoute allowedRoles={["client"]}>
                    <ClientFoodPlanPage />
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
              <Route 
             path="/client/messages" 
             element={
               <ProtectedRoute allowedRoles={["client"]}>
                 <ClientMessagesPage />
               </ProtectedRoute>
             } 
           />

              {/* 🔄 ניתוב ברירת מחדל */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>
          
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;