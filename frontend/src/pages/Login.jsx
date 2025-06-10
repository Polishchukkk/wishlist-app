import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { container } from '../di/container';

const authSvc = container.resolve('auth');

export default function Login() {
  const [f, setF] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const nav = useNavigate();
  const loc = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authSvc.login(f.email, f.password).toPromise();
      nav(loc.state?.from?.pathname ?? '/dashboard');
    } catch (err) {
      setError('Невірна пошта або пароль');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow bg-white">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input className="input" type="email" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} required />
        <input className="input" type="password" placeholder="Password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} required />
        <button className="bg-sky-600 text-white py-2 rounded w-full">Login</button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}