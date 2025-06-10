import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { container } from '../di/container';

const authSvc = container.resolve('auth');

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const sub = authSvc.user$().subscribe(setUser);
    return () => sub.unsubscribe();
  }, []);

  return (
    <nav className="bg-sky-800 text-white px-4 py-2 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">WishList</Link>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={() => authSvc.logout()} className="underline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
