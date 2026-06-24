'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { customerAPI } from '@/lib/api';
import { User, Lock, CheckCircle, AlertCircle, Eye, EyeOff, Camera } from 'lucide-react';

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [tab, setTab] = useState<'info' | 'password'>('info');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [profile, setProfile] = useState({
    name: '', email: '', phone: '', gender: '', address: ''
  });
  const [passwords, setPasswords] = useState({
    current_password: '', password: '', password_confirmation: ''
  });
  const [showPw, setShowPw] = useState({ current: false, new: false, confirm: false });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender || '',
        address: user.address || '',
      });
      // reset avatar preview when user changes (like on load)
      setAvatarPreview(null);
      setAvatarFile(null);
    }
  }, [user]);

  const flash = (msg: string, type: 'success' | 'error') => {
    if (type === 'success') { setSuccess(msg); setError(''); }
    else { setError(msg); setSuccess(''); }
    setTimeout(() => { setSuccess(''); setError(''); }, 4000);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('email', profile.email);
      if (profile.phone) formData.append('phone', profile.phone);
      if (profile.gender) formData.append('gender', profile.gender);
      if (profile.address) formData.append('address', profile.address);
      if (avatarFile) formData.append('avatar', avatarFile);
      
      // Need _method=PUT for laravel if sending formData as POST
      formData.append('_method', 'POST'); 
      // Wait, we changed the route to POST, so we don't need _method trick anymore. It's just a POST request now.

      const res = await customerAPI.updateProfile(formData);
      setUser(res.data.data);
      flash('Profile updated successfully.', 'success');
      setAvatarFile(null);
      setAvatarPreview(null);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      flash(axiosErr.response?.data?.message || 'Failed to update profile.', 'error');
    } finally { setLoading(false); }
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.password !== passwords.password_confirmation) {
      flash('New passwords do not match.', 'error'); return;
    }
    setLoading(true);
    try {
      await customerAPI.changePassword(passwords);
      setPasswords({ current_password: '', password: '', password_confirmation: '' });
      flash('Password changed successfully.', 'success');
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      flash(axiosErr.response?.data?.message || 'Failed to change password.', 'error');
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6" style={{ color: '#121358' }}>My Profile</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {[
          { key: 'info', label: 'Personal Info', icon: User },
          { key: 'password', label: 'Change Password', icon: Lock },
        ].map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setTab(key as 'info' | 'password')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all -mb-px ${
              tab === key ? 'border-b-2 text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            style={tab === key ? { borderBottomColor: '#121358', color: '#121358' } : {}}>
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* Alerts */}
      {success && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 mb-5 text-sm">
          <CheckCircle size={16} />{success}
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
          <AlertCircle size={16} />{error}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        {/* Avatar Upload Section */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white overflow-hidden relative shadow-sm border-2 border-white ring-2 ring-gray-100"
              style={{ backgroundColor: '#121358' }}>
              {(avatarPreview || user?.avatar_url) ? (
                <img src={avatarPreview || user?.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                user?.name?.charAt(0).toUpperCase()
              )}
            </div>
            {tab === 'info' && (
              <button onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 rounded-full text-white shadow-lg transition-transform hover:scale-105"
                style={{ backgroundColor: '#F59E0B' }} title="Upload new photo">
                <Camera size={14} />
              </button>
            )}
            <input type="file" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" accept="image/*" />
          </div>
          <div>
            <h2 className="font-semibold text-lg text-gray-800">{user?.name}</h2>
            <p className="text-sm text-gray-500 mb-2">{user?.email}</p>
            {tab === 'info' && (
              <p className="text-xs text-gray-400 max-w-[200px]">
                Click the camera icon to upload a new profile picture.
              </p>
            )}
          </div>
        </div>

        {tab === 'info' ? (
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                <input type="text" required value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none transition-all"
                  onFocus={e => e.target.style.borderColor = '#121358'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input type="email" required value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none transition-all"
                  onFocus={e => e.target.style.borderColor = '#121358'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                <input type="tel" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none transition-all"
                  onFocus={e => e.target.style.borderColor = '#121358'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
                <select value={profile.gender} onChange={e => setProfile({ ...profile, gender: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none transition-all bg-white"
                  onFocus={e => e.target.style.borderColor = '#121358'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}>
                  <option value="">Prefer not to say</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
              <textarea rows={3} value={profile.address} onChange={e => setProfile({ ...profile, address: e.target.value })}
                placeholder="Your full address…"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none transition-all resize-none"
                onFocus={e => e.target.style.borderColor = '#121358'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
            </div>
            <button type="submit" disabled={loading}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-60"
              style={{ backgroundColor: '#121358' }}>
              {loading ? 'Saving…' : 'Save changes'}
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordSave} className="space-y-4">
            {[
              { key: 'current', label: 'Current password', field: 'current_password' },
              { key: 'new', label: 'New password', field: 'password' },
              { key: 'confirm', label: 'Confirm new password', field: 'password_confirmation' },
            ].map(({ key, label, field }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                <div className="relative">
                  <input
                    type={showPw[key as keyof typeof showPw] ? 'text' : 'password'}
                    required
                    value={passwords[field as keyof typeof passwords]}
                    onChange={e => setPasswords({ ...passwords, [field]: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm pr-11 focus:outline-none transition-all"
                    onFocus={e => e.target.style.borderColor = '#121358'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                  <button type="button"
                    onClick={() => setShowPw(p => ({ ...p, [key]: !p[key as keyof typeof p] }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPw[key as keyof typeof showPw] ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>
            ))}
            <button type="submit" disabled={loading}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-60"
              style={{ backgroundColor: '#121358' }}>
              {loading ? 'Changing…' : 'Change password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
