import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PublicGiftList() {
    const { id } = useParams(); // id користувача з URL
    const [gifts, setGifts] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch(`http://localhost:8080/api/gifts/public/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                setGifts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Помилка при завантаженні подарунків:', error);
                setLoading(false);
            });
    }, [id, token]);

    const reserveGift = (giftId) => {
        fetch(`http://localhost:8080/api/gifts/${giftId}/reserve`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Не вдалося зарезервувати подарунок');
                }
                return response.json();
            })
            .then(() => {
                alert('Подарунок зарезервовано!');
                // Оновлюємо список після резервування
                setGifts(gifts.map(g => g.id === giftId ? { ...g, reservedBy: { id: id } } : g));
            })
            .catch(error => {
                console.error('Помилка при резервуванні:', error);
                alert('Помилка при резервуванні подарунка');
            });
    };

    if (loading) return <p>Завантаження...</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Список подарунків користувача {id}</h1>
            <ul className="space-y-4">
                {gifts.map(gift => (
                    <li key={gift.id} className="border p-4 rounded-xl shadow">
                        <h2 className="text-lg font-semibold">{gift.title}</h2>
                        {gift.link && <a href={gift.link} target="_blank" rel="noreferrer" className="text-blue-500">Перейти</a>}
                        {gift.image && <div><img src={gift.image} alt={gift.title} className="w-32 h-32 object-cover mt-2" /></div>}
                        {gift.reservedBy ? (
                            <p className="text-green-600 mt-2">Зарезервовано</p>
                        ) : (
                            <button onClick={() => reserveGift(gift.id)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600">Зарезервувати</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
