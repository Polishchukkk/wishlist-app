import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { container } from '../di/container';
import AuthService from '../services/AuthService';

const authSvc = container.resolve('auth');

export default function RequireAuth({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const sub = authSvc.user$().subscribe(u => {
      setUser(u);
      setReady(true);
    });
    return () => sub.unsubscribe();
  }, []);

  if (!ready) return null;
  return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
}
