import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import AppLayout from './layouts/AppLayout';
import LoginPage from './pages/LoginPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import DashboardPage from './pages/DashboardPage';
import AccountsPage from './pages/AccountsPage';
import TransactionsPage from './pages/TransactionsPage';
import ExchangeRatesPage from './pages/ExchangeRatesPage';
import SettingsPage from './pages/SettingsPage';

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.must_change_password && window.location.pathname !== '/change-password') {
    return <Navigate to="/change-password" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/change-password" element={<Protected><ChangePasswordPage /></Protected>} />
      <Route path="/" element={<Protected><AppLayout><DashboardPage /></AppLayout></Protected>} />
      <Route path="/accounts" element={<Protected><AppLayout><AccountsPage /></AppLayout></Protected>} />
      <Route path="/transactions" element={<Protected><AppLayout><TransactionsPage /></AppLayout></Protected>} />
      <Route path="/exchange-rates" element={<Protected><AppLayout><ExchangeRatesPage /></AppLayout></Protected>} />
      <Route path="/settings" element={<Protected><AppLayout><SettingsPage /></AppLayout></Protected>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
