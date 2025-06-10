import { useState } from 'react';

export default function GiftCard({ gift, onReserve, isOwner, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
  console.log('Triggering delete for:', gift.id);
    onDelete(gift.id);
    setShowConfirm(false);
  };

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white relative">
      <img
        src={gift.image || 'https://via.placeholder.com/150'}
        alt="gift"
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="mt-2 font-semibold text-lg">{gift.title}</h3>
      {gift.link && (
        <a
          href={gift.link}
          className="text-sky-600"
          target="_blank"
          rel="noreferrer"
        >
          Open link
        </a>
      )}
      <div className="mt-2 flex justify-between items-center">
        {gift.reservedBy ? (
          <p className="text-green-600">Reserved</p>
        ) : isOwner ? (
          <p className="text-gray-400">Only other users can reserve</p>
        ) : (
          <button
            onClick={() => onReserve(gift.id)}
            className="bg-sky-600 text-white px-3 py-1 rounded"
          >
            Reserve
          </button>
        )}
        {isOwner && (
          <button
            onClick={() => setShowConfirm(true)}
            className="text-red-600 text-sm ml-2 hover:underline"
          >
            Delete
          </button>
        )}
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10 rounded-xl">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center w-72">
            <p className="mb-4">Are you sure you want to delete this item?</p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}