// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import Dashboard from './pages/Dashboard';
import authService from './services/authService';
// ... other imports

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔧 Checking authentication...');
    
    // Kiểm tra xem user đã đăng nhập chưa
    const isAuth = authService.isAuthenticated();
    const user = authService.getCurrentUser();
    
    console.log('📦 Auth status:', isAuth);
    console.log('📦 User data:', user);
    
    setIsAuthenticated(isAuth);
    setLoading(false);
  }, []);

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      console.log('❌ Not authenticated, redirecting to login...');
      return <Navigate to="/login" replace />;
    }

    console.log('✅ Authenticated, showing protected content');
    return children;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginForm />
          } 
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        {/* ... other protected routes */}
      </Routes>
    </Router>
  );
}

export default App;
