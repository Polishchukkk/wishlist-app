import api from '../api/client';
import { from } from 'rxjs';

/**
 * Repository pattern encapsulating REST communication.
 * Returns RxJS Observables (Reactive, Reactor pattern).
 */
class GiftService {
  list() {
    return from(api.get('/gifts').then(r => r.data));
  }

  add(dto) {
    return from(api.post('/gifts', dto));
  }

  edit(id, dto) {
    return from(api.put(`/gifts/${id}`, dto));
  }

  remove(id) {
    return from(api.delete(`/gifts/${id}`));
  }

  reserve(id) {
    return from(api.post(`/gifts/${id}/reserve`));
  }

  listPublic(ownerId) {
    return from(api.get(`/gifts/public/${ownerId}`).then(r => r.data));
  }
}

export default GiftService;
