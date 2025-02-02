import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ServiceListing from './pages/ServiceListing';
import CreateService from './pages/CreateService';
import EditService from './pages/EditService';
import Messages from './pages/Messages';
import Orders from './pages/Orders';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import PublicProfile from './pages/PublicProfile';
import ServicePage from './pages/ServicePage';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import useAuthStore from './store/useAuthStore';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
};

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/:username" element={<PublicProfile />} />
      <Route path="/:username/:serviceSlug" element={<ServicePage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/services"
        element={
          <ProtectedRoute>
            <ServiceListing />
          </ProtectedRoute>
        }
      />
      <Route
        path="/services/create"
        element={
          <ProtectedRoute>
            <CreateService />
          </ProtectedRoute>
        }
      />
      <Route
        path="/services/edit/:serviceId"
        element={
          <ProtectedRoute>
            <EditService />
          </ProtectedRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/*"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
