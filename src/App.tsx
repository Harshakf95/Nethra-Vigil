import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WebThreats from "./pages/WebThreats";
import NetworkThreats from "./pages/NetworkThreats";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Index />} />
        <Route path="/web-threats" element={<WebThreats />} />
        <Route path="/network-threats" element={<NetworkThreats />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
