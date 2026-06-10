
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";

import Login from "./pages/Login";
import Register from "./pages/Register";

// דפי לקוח
import ClientDashboardPage from "./pages/Client/ClientDashboardPage";
import ClientTasksPage from "./pages/Client/ClientTasksPage";
import ClientFoodPlanPage from "./pages/Client/ClientFoodPlanPage";
import ClientVideosPage from "./pages/Client/ClientVideosPage";
import ClientBlogsPage from "./pages/Client/ClientBlogsPage";
import ClientMessagesPage from "./pages/Client/ClientMessagesPage";
import ClientOnboarding from "./pages/Client/ClientOnboarding";

// דפי תזונאי
import NutritionistDashboardPage from "./pages/Nutritionist/NutritionistDashboardPage";
import NutritionistClientsPage from "./pages/Nutritionist/NutritionistClientsPage";
import NutritionistTasksPage from "./pages/Nutritionist/NutritionistTasksPage";
import NutritionistBlogsPage from "./pages/Nutritionist/NutritionistBlogsPage";

//דפי מאמן
import TrainerDashboardPage from "./pages/Trainer/TrainerDashboardPage";
import TrainerTasksPage from "./pages/Trainer/TrainerTasksPage"; 
import TrainerBlogsPage from "./pages/Trainer/TrainerBlogsPage";
import TrainerVideosPage from "./pages/Trainer/TrainerVideosPage";

import "./App.css";

// 🌟 קומפוננטת מעטפת שמסדרת את ה-Layout רק עבור עמודים פנימיים מחוברים
const DashboardLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-layout" style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar /> 
        <main style={{ flex: 1, padding: "20px", backgroundColor: '#f5f5f5' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* 🔓 דפים ציבוריים - ללא תפריטים בכלל */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔒 נתיבים מוגנים עבור לקוח */}
        {/* 🔒 נתיבים מוגנים עבור לקוח */}
        <Route 
          path="/client/onboarding" 
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <ClientOnboarding />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client/dashboard" 
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <DashboardLayout><ClientDashboardPage /></DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client/tasks" 
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <DashboardLayout><ClientTasksPage /></DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client/food-plan" 
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <DashboardLayout><ClientFoodPlanPage /></DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client/videos" 
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <DashboardLayout><ClientVideosPage /></DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client/blogs" 
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <DashboardLayout><ClientBlogsPage /></DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client/messages" 
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <DashboardLayout><ClientMessagesPage /></DashboardLayout>
            </ProtectedRoute>
          } 
        />

        {/* 🔒 נתיבים מוגנים עבור תזונאי */}
        <Route 
          path="/nutritionist/dashboard" 
          element={
            <ProtectedRoute allowedRoles={["nutritionist"]}>
              <DashboardLayout><NutritionistDashboardPage /></DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/nutritionist/clients" 
          element={
            <ProtectedRoute allowedRoles={["nutritionist"]}>
              <DashboardLayout><NutritionistClientsPage /></DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/nutritionist/tasks" 
          element={
            <ProtectedRoute allowedRoles={["nutritionist"]}>
              <DashboardLayout>
                <NutritionistTasksPage />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/nutritionist/blogs" 
          element={
            <ProtectedRoute allowedRoles={["nutritionist"]}>
              <DashboardLayout>
                <NutritionistBlogsPage />
              </DashboardLayout>
            </ProtectedRoute>
          } 
        />
        {/* 🔒 נתיבים מוגנים עבור מאמן */}
        <Route 
  path="/trainer/videos" 
  element={
    <ProtectedRoute allowedRoles={["trainer"]}>
      <DashboardLayout><TrainerVideosPage /></DashboardLayout>
    </ProtectedRoute>
  } 
/>
       
        <Route 
          path="/trainer/dashboard" 
          element={
            <ProtectedRoute allowedRoles={["trainer"]}>
              <DashboardLayout><TrainerDashboardPage /></DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/trainer/tasks" 
          element={
            <ProtectedRoute allowedRoles={["trainer"]}>
              <DashboardLayout><TrainerTasksPage /></DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/trainer/blogs" 
          element={
            <ProtectedRoute allowedRoles={["trainer"]}>
              <DashboardLayout><TrainerBlogsPage /></DashboardLayout>
            </ProtectedRoute>
          } 
        />
        {/* 🔄 ניתוב ברירת מחדל */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;