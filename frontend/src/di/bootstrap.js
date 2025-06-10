import { container } from './container';
import AuthService from '../services/AuthService';
import GiftService from '../services/GiftService';

container.register('auth', () => new AuthService());
container.register('gift', () => new GiftService());