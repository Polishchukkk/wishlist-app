import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { container } from '../di/container';
import GiftCard from '../components/GiftCard';

const giftSvc = container.resolve('gift');

export default function PublicWishlist() {
  const { ownerId } = useParams();
  const [gifts, setGifts] = useState([]);

  const load = () => {
    giftSvc.listPublic(ownerId).subscribe(setGifts);
  };

  useEffect(() => { load(); }, [ownerId]);

  const reserve = (id) => {
    giftSvc.reserve(id).subscribe(load);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-2">Public WishList</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {gifts.map((g) => <GiftCard key={g.id} gift={g} onReserve={reserve} isOwner={false} />)}
      </div>
    </div>
  );
}
