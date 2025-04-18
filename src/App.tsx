
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NotificationProvider } from "./contexts/NotificationContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { ActivityLogProvider } from "./contexts/ActivityLogContext";
import { AuthProvider } from "./contexts/AuthContext";
import AppLayout from "./components/layout/AppLayout";
import ProtectedAdminRoute from "./components/authentication/ProtectedAdminRoute";
import ProtectedRoute from "./components/authentication/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import AddTree from "./pages/AddTree";
import TreeDetail from "./pages/TreeDetail";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Resources from "./pages/Resources";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const App = () => {
  // Create QueryClient inside the component
  const queryClient = new QueryClient();
  
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ActivityLogProvider>
            <AdminAuthProvider>
              <BrowserRouter>
                <AuthProvider>
                  <NotificationProvider>
                    <Toaster />
                    <Sonner />
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      <Route path="/reset-password" element={<ResetPassword />} />
                      <Route path="/dashboard" element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/trees/add" element={
                        <ProtectedRoute>
                          <AddTree />
                        </ProtectedRoute>
                      } />
                      <Route path="/trees/:id" element={
                        <ProtectedRoute>
                          <TreeDetail />
                        </ProtectedRoute>
                      } />
                      <Route path="/profile" element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      } />
                      <Route path="/notifications" element={
                        <ProtectedRoute>
                          <Notifications />
                        </ProtectedRoute>
                      } />
                      <Route path="/resources" element={<Resources />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/donate" element={<Donate />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/admin-login" element={<AdminLogin />} />
                      <Route
                        path="/admin"
                        element={
                          <ProtectedAdminRoute>
                            <AdminDashboard />
                          </ProtectedAdminRoute>
                        }
                      />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </NotificationProvider>
                </AuthProvider>
              </BrowserRouter>
            </AdminAuthProvider>
          </ActivityLogProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
