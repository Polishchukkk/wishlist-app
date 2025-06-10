import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { container } from '../di/container';

const authSvc = container.resolve('auth');

export default function Register() {
  const [f, setF] = useState({ username: '', email: '', password: '' });
  const nav = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow bg-white">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <form className="space-y-3" onSubmit={async (e) => {
        e.preventDefault();
        await authSvc.register(f).toPromise();
        nav('/dashboard');
      }}>
        <input className="input" placeholder="Username" value={f.username} onChange={(e)=>setF({...f, username:e.target.value})} required />
        <input className="input" type="email" placeholder="Email" value={f.email} onChange={(e)=>setF({...f, email:e.target.value})} required />
        <input className="input" type="password" placeholder="Password" value={f.password} onChange={(e)=>setF({...f, password:e.target.value})} required />
        <button className="bg-sky-600 text-white py-2 rounded w-full">Register</button>
      </form>
    </div>
  );
}
