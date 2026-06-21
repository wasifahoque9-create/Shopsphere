'use client';

import { useState } from 'react';
import Link from 'next/link';
import { authAPI } from '@/lib/api';
import { ShoppingBag, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await authAPI.forgotPassword(email);
      setSent(true);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr.response?.data?.message || 'Something went wrong. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#121358' }}>
            <ShoppingBag size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold" style={{ color: '#121358' }}>WorkWorm</span>
        </div>

        {!sent ? (
          <>
            <h2 className="text-2xl font-bold mb-1" style={{ color: '#121358' }}>Forgot password?</h2>
            <p className="text-gray-500 text-sm mb-8">
              Enter your email and we&apos;ll send a reset link.
            </p>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6 text-sm">
                <AlertCircle size={16} />{error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                <input
                  type="email" required value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none transition-all"
                  onFocus={e => e.target.style.borderColor = '#121358'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-60"
                style={{ backgroundColor: '#121358' }}>
                {loading ? 'Sending…' : 'Send reset link'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#F59E0B20' }}>
              <CheckCircle size={32} style={{ color: '#F59E0B' }} />
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: '#121358' }}>Check your inbox</h2>
            <p className="text-gray-500 text-sm mb-6">
              We&apos;ve sent a password reset link to <strong>{email}</strong>. It expires in 60 minutes.
            </p>
          </div>
        )}

        <Link href="/login" className="flex items-center justify-center gap-2 text-sm mt-6" style={{ color: '#121358' }}>
          <ArrowLeft size={15} /> Back to sign in
        </Link>
      </div>
    </div>
  );
}
