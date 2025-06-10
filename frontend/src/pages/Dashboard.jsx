import { useEffect, useState } from 'react';
import { container } from '../di/container';
import GiftForm from '../components/GiftForm';
import GiftCard from '../components/GiftCard';

const giftSvc = container.resolve('gift');

export default function Dashboard() {
  const [gifts, setGifts] = useState([]);

  const load = () => {
    giftSvc.list().subscribe(setGifts);
  };

  useEffect(() => { load(); }, []);

  const add = (dto) => {
    giftSvc.add(dto).subscribe(load);
  };

  const reserve = (id) => {
    giftSvc.reserve(id).subscribe(load);
  };

  const remove = (id) => {
  console.log('Deleting gift with ID:', id);
  giftSvc.remove(id).subscribe({
    next: () => {
      console.log('Gift deleted successfully');
      load();
    },
    error: (err) => {
      console.error('Failed to delete gift:', err);
    },
  });
};

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold">My Gifts</h2>
      <GiftForm onSubmit={add} />
      <div className="grid md:grid-cols-3 gap-4">
        {gifts.map((g) => (
          <GiftCard key={g.id} gift={g} onReserve={reserve} onDelete={remove} isOwner />
        ))}
      </div>
    </div>
  );
}