import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PublicWishlist from './pages/PublicWishlist';
import RequireAuth from './auth/RequireAuth';
import { container } from './di/container';
import AuthService from './services/AuthService';
import GiftService from './services/GiftService';

/* --- Dependency Injection bootstrap --- */
container.register('auth', () => new AuthService());
container.register('gift', () => new GiftService());
/* -------------------------------------- */

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/user/:ownerId" element={<PublicWishlist />} />
      </Routes>
    </BrowserRouter>
  );
}
