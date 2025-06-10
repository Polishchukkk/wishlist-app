import api from '../api/client';
import { BehaviorSubject, from } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

class AuthService {
  #user$ = new BehaviorSubject(null);

  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = jwtDecode(token);
        if (user.exp * 1000 > Date.now()) {
          this.#user$.next(user);
        } else {
          this.logout(); // Токен протух
        }
      } catch {
        this.logout(); // Некоректний токен
      }
    }
  }

  user$() {
    return this.#user$.asObservable();
  }

  register(dto) {
    return from(api.post('/auth/register', dto).then(r => {
      const user = jwtDecode(r.data.token);
      localStorage.setItem('token', r.data.token);
      localStorage.setItem('user', JSON.stringify(user));
      this.#user$.next(user);
    }));
  }

  login(email, password) {
    return from(api.post('/auth/login', { email, password }).then(r => {
      const user = jwtDecode(r.data.token);
      localStorage.setItem('token', r.data.token);
      localStorage.setItem('user', JSON.stringify(user));
      this.#user$.next(user);
    }));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.#user$.next(null);
  }
}

export default AuthService;