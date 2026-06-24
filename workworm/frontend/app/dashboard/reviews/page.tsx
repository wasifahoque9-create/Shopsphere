'use client';

import { useState, useEffect } from 'react';
import { customerAPI } from '@/lib/api';
import { Star, MessageSquare, CheckCircle, AlertCircle, ShoppingBag } from 'lucide-react';

interface Review {
  id: number;
  product_id: number;
  product_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface ReviewableProduct {
  product_id: number;
  product_name: string;
  order_date: string;
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
  const [reviewableProducts, setReviewableProducts] = useState<ReviewableProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ product_id: 0, product_name: '', rating: 0, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      customerAPI.getReviews(),
      customerAPI.getOrders()
    ]).then(([reviewsRes, ordersRes]) => {
      const fetchedReviews = reviewsRes.data.data || [];
      setReviews(fetchedReviews);

      const orders = ordersRes.data.data || [];
      const deliveredOrders = orders.filter((o: any) => o.status === 'delivered');
      
      const productsMap = new Map<number, ReviewableProduct>();
      deliveredOrders.forEach((order: any) => {
        order.items.forEach((item: any) => {
          productsMap.set(item.product_id, {
            product_id: item.product_id,
            product_name: item.product_name,
            order_date: order.created_at,
          });
        });
      });

      const reviewedIds = new Set(fetchedReviews.map((r: Review) => r.product_id));
      const unreviewed = Array.from(productsMap.values()).filter(p => !reviewedIds.has(p.product_id));
      
      setReviewableProducts(unreviewed);
    }).finally(() => setLoading(false));
  }, []);

  const openReviewForm = (product: ReviewableProduct) => {
    setForm({ product_id: product.product_id, product_name: product.product_name, rating: 0, comment: '' });
    setShowForm(true);
    setSuccess('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.rating === 0) { setError('Please select a rating.'); return; }
    setSubmitting(true); setError('');
    try {
      const res = await customerAPI.submitReview({ product_id: form.product_id, rating: form.rating, comment: form.comment });
      setReviews(prev => [res.data.data, ...prev]);
      setReviewableProducts(prev => prev.filter(p => p.product_id !== form.product_id));
      setSuccess('Review submitted successfully!');
      setShowForm(false);
      setForm({ product_id: 0, product_name: '', rating: 0, comment: '' });
      setTimeout(() => setSuccess(''), 4000);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr.response?.data?.message || 'Failed to submit review.');
    } finally { setSubmitting(false); }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        {[1,2,3].map(i => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
            <div className="h-4 bg-gray-100 rounded w-1/3 mb-3" />
            <div className="h-3 bg-gray-100 rounded w-full mb-2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6" style={{ color: '#121358' }}>My Reviews</h1>

      {success && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 mb-5 text-sm">
          <CheckCircle size={16} />{success}
        </div>
      )}

      {/* Write review form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-8 shadow-sm">
          <h2 className="font-semibold text-lg mb-1" style={{ color: '#121358' }}>Review {form.product_name}</h2>
          <p className="text-sm text-gray-500 mb-4">Share your thoughts about this product.</p>
          
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">
              <AlertCircle size={16} />{error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
              <StarRating rating={form.rating} onChange={r => setForm({ ...form, rating: r })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea rows={4} required
                value={form.comment}
                onChange={e => setForm({ ...form, comment: e.target.value })}
                placeholder="What did you like or dislike? What did you use this product for?"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none transition-all resize-none"
                onFocus={e => e.target.style.borderColor = '#121358'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={submitting}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-60 transition-colors"
                style={{ backgroundColor: '#121358' }}>
                {submitting ? 'Submitting…' : 'Submit Review'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setError(''); }}
                className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviewable Products (Delivered & Unreviewed) */}
      {!showForm && reviewableProducts.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#121358' }}>Products awaiting your review</h2>
          <div className="space-y-3">
            {reviewableProducts.map(product => (
              <div key={product.product_id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-600">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{product.product_name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Delivered on {new Date(product.order_date).toLocaleDateString()}</p>
                  </div>
                </div>
                <button onClick={() => openReviewForm(product)}
                  className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90 whitespace-nowrap"
                  style={{ backgroundColor: '#F59E0B' }}>
                  <MessageSquare size={16} />
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submitted Reviews list */}
      <div>
        <h2 className="text-lg font-semibold mb-4" style={{ color: '#121358' }}>Your Past Reviews</h2>
        {reviews.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 py-12 text-center shadow-sm">
            <Star size={40} className="mx-auto mb-3 text-gray-200" />
            <p className="text-gray-400 text-sm font-medium">No reviews yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reviews.map(review => (
              <div key={review.id} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold text-gray-900">{review.product_name}</p>
                  <span className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString()}</span>
                </div>
                <StarRating rating={review.rating} />
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
