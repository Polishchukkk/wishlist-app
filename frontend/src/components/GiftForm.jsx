import { useState } from 'react';

export default function GiftForm({ onSubmit }) {
  const [form, setForm] = useState({ title: '', link: '', image: '' });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: '', link: '', image: '' });
    setShowForm(false);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
      >
        {showForm ? '× Close' : '+ Add Gift'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3 animate-fade-in">
          <input
            type="text"
            placeholder="Title"
            className="input w-full"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            type="url"
            placeholder="Link (optional)"
            className="input w-full"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
          />
          <input
            type="url"
            placeholder="Image URL (optional)"
            className="input w-full"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Add
          </button>
        </form>
      )}
    </div>
  );
} 