'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { Eye, EyeOff, ShoppingBag, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 text-white" style={{ backgroundColor: '#121358' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F59E0B' }}>
            <ShoppingBag size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">WorkWorm</span>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#F59E0B' }}>
            Premium Ecommerce Store
          </p>
          <h1 className="text-4xl font-extrabold leading-tight mb-5">
            Welcome back to<br />your account
          </h1>
          <p className="text-blue-200 text-base leading-relaxed max-w-sm">
            Access your orders, manage your profile, track shipments, and write reviews — all in one place.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[['10K+', 'Customers'], ['50K+', 'Products'], ['99%', 'Satisfaction']].map(([val, label]) => (
            <div key={label} className="bg-white/10 rounded-xl p-4">
              <p className="text-xl font-bold" style={{ color: '#F59E0B' }}>{val}</p>
              <p className="text-blue-200 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#121358' }}>
              <ShoppingBag size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold" style={{ color: '#121358' }}>WorkWorm</span>
          </div>

          <h2 className="text-2xl font-bold mb-1" style={{ color: '#121358' }}>Sign in</h2>
          <p className="text-gray-500 text-sm mb-8">Enter your credentials to continue</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 transition-all"
                style={{ focusBorderColor: '#121358' } as React.CSSProperties}
                onFocus={e => e.target.style.borderColor = '#121358'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Link href="/forgot-password" className="text-xs font-medium" style={{ color: '#F59E0B' }}>
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm pr-11 focus:outline-none transition-all"
                  onFocus={e => e.target.style.borderColor = '#121358'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-60"
              style={{ backgroundColor: '#121358' }}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold" style={{ color: '#121358' }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
