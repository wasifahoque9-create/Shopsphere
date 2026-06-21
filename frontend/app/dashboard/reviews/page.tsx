'use client';

import { useState, useEffect } from 'react';
import { customerAPI } from '@/lib/api';
import { Star, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

interface Review {
  id: number;
  product_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

function StarRating({ rating, onChange }: { rating: number; onChange?: (r: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(i => (
        <button key={i} type="button"
          className="transition-transform hover:scale-110"
          onMouseEnter={() => onChange && setHovered(i)}
          onMouseLeave={() => onChange && setHovered(0)}
          onClick={() => onChange?.(i)}>
          <Star size={22}
            fill={(onChange ? (hovered || rating) : rating) >= i ? '#F59E0B' : 'none'}
            stroke={(onChange ? (hovered || rating) : rating) >= i ? '#F59E0B' : '#D1D5DB'}
          />
        </button>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ product_id: 0, product_name: '', rating: 0, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    customerAPI.getReviews()
      .then(res => setReviews(res.data.data || []))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.rating === 0) { setError('Please select a rating.'); return; }
    setSubmitting(true); setError('');
    try {
      const res = await customerAPI.submitReview({ product_id: form.product_id, rating: form.rating, comment: form.comment });
      setReviews(prev => [res.data.data, ...prev]);
      setSuccess('Review submitted successfully!');
      setShowForm(false);
      setForm({ product_id: 0, product_name: '', rating: 0, comment: '' });
      setTimeout(() => setSuccess(''), 4000);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr.response?.data?.message || 'Failed to submit review.');
    } finally { setSubmitting(false); }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#121358' }}>My Reviews</h1>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg text-white transition-opacity"
          style={{ backgroundColor: '#F59E0B' }}>
          <MessageSquare size={15} />
          Write review
        </button>
      </div>

      {success && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 mb-5 text-sm">
          <CheckCircle size={16} />{success}
        </div>
      )}

      {/* Write review form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-5">
          <h2 className="font-semibold text-sm mb-4" style={{ color: '#121358' }}>Write a review</h2>
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">
              <AlertCircle size={16} />{error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Product name</label>
              <input type="text" required
                value={form.product_name}
                onChange={e => setForm({ ...form, product_name: e.target.value })}
                placeholder="Name of the product you purchased"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none transition-all"
                onFocus={e => e.target.style.borderColor = '#121358'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <StarRating rating={form.rating} onChange={r => setForm({ ...form, rating: r })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Your review</label>
              <textarea rows={4} required
                value={form.comment}
                onChange={e => setForm({ ...form, comment: e.target.value })}
                placeholder="Share your experience with this product…"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none transition-all resize-none"
                onFocus={e => e.target.style.borderColor = '#121358'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={submitting}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-60"
                style={{ backgroundColor: '#121358' }}>
                {submitting ? 'Submitting…' : 'Submit'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setError(''); }}
                className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-500 border border-gray-200">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews list */}
      {loading ? (
        <div className="space-y-3">
          {[1,2].map(i => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
              <div className="h-4 bg-gray-100 rounded w-1/3 mb-3" />
              <div className="h-3 bg-gray-100 rounded w-full mb-2" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 py-16 text-center">
          <Star size={40} className="mx-auto mb-3 text-gray-200" />
          <p className="text-gray-400 text-sm font-medium">No reviews yet</p>
          <p className="text-gray-300 text-xs mt-1">Reviews you write will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map(review => (
            <div key={review.id} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-start justify-between mb-2">
                <p className="font-semibold text-sm" style={{ color: '#121358' }}>{review.product_name}</p>
                <span className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString()}</span>
              </div>
              <StarRating rating={review.rating} />
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
