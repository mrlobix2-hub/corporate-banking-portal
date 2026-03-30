import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('cbp_token');
    if (!token) {
      setLoading(false);
      return;
    }
    api.get('/auth/me').then((res) => setUser(res.data.user)).catch(() => {
      localStorage.removeItem('cbp_token');
      setUser(null);
    }).finally(() => setLoading(false));
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    login: async (payload) => {
      const res = await api.post('/auth/login', payload);
      localStorage.setItem('cbp_token', res.data.token);
      setUser(res.data.user);
      return res.data.user;
    },
    logout: () => {
      localStorage.removeItem('cbp_token');
      setUser(null);
    },
    refreshMe: async () => {
      const res = await api.get('/auth/me');
      setUser(res.data.user);
    }
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
