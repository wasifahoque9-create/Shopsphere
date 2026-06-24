'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import { Eye, EyeOff, ShoppingBag, AlertCircle, CheckCircle } from 'lucide-react';

type Step = 'form' | 'otp';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('form');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', password_confirmation: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.password_confirmation) {
      setError('Passwords do not match.'); return;
    }
    setError(''); setLoading(true);
    try {
      await authAPI.register(form);
      setStep('otp');
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } };
      const errs = axiosErr.response?.data?.errors;
      if (errs) {
        const first = Object.values(errs)[0];
        setError(Array.isArray(first) ? first[0] : String(first));
      } else {
        setError(axiosErr.response?.data?.message || 'Registration failed.');
      }
    } finally { setLoading(false); }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await authAPI.verifyOtp({ email: form.email, otp });
      router.push('/login?verified=1');
    } catch {
      setError('Invalid or expired OTP. Please try again.');
    } finally { setLoading(false); }
  };

  const InputField = ({ label, name, type = 'text', placeholder }: { label: string; name: string; type?: string; placeholder: string }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type={type} name={name} required
        value={form[name as keyof typeof form]}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none transition-all"
        onFocus={e => e.target.style.borderColor = '#121358'}
        onBlur={e => e.target.style.borderColor = '#e5e7eb'}
      />
    </div>
  );

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
            Join Our Community
          </p>
          <h1 className="text-4xl font-extrabold leading-tight mb-5">
            Create your<br />free account
          </h1>
          <p className="text-blue-200 text-base leading-relaxed max-w-sm">
            Start shopping from thousands of premium products with fast delivery and easy returns.
          </p>
        </div>
        <div className="space-y-3">
          {['Free account forever', 'Track orders in real-time', 'Easy returns & refunds'].map(f => (
            <div key={f} className="flex items-center gap-3">
              <CheckCircle size={18} style={{ color: '#F59E0B' }} />
              <span className="text-blue-100 text-sm">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#121358' }}>
              <ShoppingBag size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold" style={{ color: '#121358' }}>WorkWorm</span>
          </div>

          {step === 'form' ? (
            <>
              <h2 className="text-2xl font-bold mb-1" style={{ color: '#121358' }}>Create account</h2>
              <p className="text-gray-500 text-sm mb-8">Fill in your details to get started</p>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6 text-sm">
                  <AlertCircle size={16} />{error}
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-4">
                <InputField label="Full name" name="name" placeholder="John Doe" />
                <InputField label="Email address" name="email" type="email" placeholder="you@example.com" />
                <InputField label="Phone number" name="phone" type="tel" placeholder="+880 1XXX XXXXXX" />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'} name="password" required
                      value={form.password} onChange={handleChange}
                      placeholder="Min. 8 characters"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm pr-11 focus:outline-none transition-all"
                      onFocus={e => e.target.style.borderColor = '#121358'}
                      onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>
                <InputField label="Confirm password" name="password_confirmation" type="password" placeholder="Repeat password" />

                <button type="submit" disabled={loading}
                  className="w-full py-3 rounded-lg text-sm font-semibold text-white mt-2 transition-opacity disabled:opacity-60"
                  style={{ backgroundColor: '#121358' }}>
                  {loading ? 'Creating account…' : 'Create account'}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#F59E0B20' }}>
                  <CheckCircle size={32} style={{ color: '#F59E0B' }} />
                </div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: '#121358' }}>Verify your email</h2>
                <p className="text-gray-500 text-sm">
                  We sent a 6-digit OTP to <strong>{form.email}</strong>
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6 text-sm">
                  <AlertCircle size={16} />{error}
                </div>
              )}

              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Enter OTP</label>
                  <input
                    type="text" required maxLength={6}
                    value={otp} onChange={e => setOtp(e.target.value)}
                    placeholder="000000"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-center text-2xl tracking-[0.5em] font-mono focus:outline-none transition-all"
                    onFocus={e => e.target.style.borderColor = '#121358'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-60"
                  style={{ backgroundColor: '#121358' }}>
                  {loading ? 'Verifying…' : 'Verify & continue'}
                </button>
              </form>
            </>
          )}

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold" style={{ color: '#121358' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
