
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ClientDashboard from "./pages/dashboard/ClientDashboard";
import ProfessionalDashboard from "./pages/dashboard/ProfessionalDashboard";
import ProfessionalVerification from "./pages/dashboard/ProfessionalVerification";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import Pricing from "./pages/Pricing";
import SolutionUtilisateur from "./pages/SolutionUtilisateur";
import SolutionProfessional from "./pages/SolutionProfessional";
import ProfessionalPublicProfile from './pages/ProfessionalPublicProfile';
import TrouvezLeProfessionnel from './pages/TrouvezLeProfessionnel';
import { PremiumContact } from "./pages/ContactezNous";

const queryClient = new QueryClient();

const DashboardRouter = () => {
  return (
    <ProtectedRoute>
      <Routes>
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/professional/*" element={
          <ProtectedRoute allowedRoles={['professional']}>
            <ProfessionalDashboard />
          </ProtectedRoute>
        } />
        <Route path="/professional/verification" element={
          <ProtectedRoute allowedRoles={['professional']}>
            <ProfessionalVerification />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="*" element={<DashboardRedirect />} />
      </Routes>
    </ProtectedRoute>
  );
};

// Composant pour rediriger vers le bon dashboard selon le rôle
const DashboardRedirect = () => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/auth/login" replace />;
  
  switch (user.role) {
    case 'client':
      return <Navigate to="/dashboard/client" replace />;
    case 'professional':
      if (!user.isVerified && !user.profileComplete) {
        return <Navigate to="/dashboard/professional/verification" replace />;
      }
      return <Navigate to="/dashboard/professional" replace />;
    case 'admin':
      return <Navigate to="/dashboard/admin" replace />;
    default:
      return <Navigate to="/dashboard/client" replace />;
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard/*" element={<DashboardRouter />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contactez-nous" element={<PremiumContact />} />
            <Route path="/solution/utilisateur" element={<SolutionUtilisateur />} />
            <Route path="/solution/professional" element={<SolutionProfessional />} />
            <Route path="/professionnel/:id" element={<ProfessionalPublicProfile />} />
            <Route path="/trouvez-le-professionnel" element={<TrouvezLeProfessionnel />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
