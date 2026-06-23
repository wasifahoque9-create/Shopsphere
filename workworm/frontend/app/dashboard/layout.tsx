'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { CartProvider, useCart } from '@/lib/CartContext';
import {
  User, Package, Star, LogOut, LayoutDashboard, ShoppingBag, ShoppingCart, X, CheckCircle, Trash2
} from 'lucide-react';

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();
  
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#121358' }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-white/20 border-t-white rounded-full animate-spin" style={{ borderWidth: 3 }} />
          <p className="text-white/60 text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const handleCheckout = () => {
    clearCart();
    setCartDrawerOpen(false);
    setCheckoutSuccess(true);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Checkout Success Modal */}
      {checkoutSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-5">
              <CheckCircle className="text-green-500 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#121358' }}>Order Confirmed!</h2>
            <p className="text-gray-500 text-sm mb-8">
              Thanks for ordering from us. We'll send you an email with your shipping details shortly.
            </p>
            <button 
              onClick={() => {
                setCheckoutSuccess(false);
                router.push('/dashboard');
              }}
              className="w-full py-3 rounded-xl text-sm font-bold text-white transition-transform active:scale-95"
              style={{ backgroundColor: '#121358' }}
            >
              Back to Home
            </button>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {cartDrawerOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setCartDrawerOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold" style={{ color: '#121358' }}>My Cart ({cart.reduce((a, c) => a + c.quantity, 0)})</h2>
              <button onClick={() => setCartDrawerOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart size={32} className="text-gray-300" />
                  </div>
                  <p className="text-gray-500">Your cart is empty</p>
                  <button 
                    onClick={() => setCartDrawerOpen(false)}
                    className="mt-4 px-6 py-2 text-sm font-semibold rounded-full"
                    style={{ color: '#F59E0B', backgroundColor: '#F59E0B15' }}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border border-gray-100 rounded-2xl relative group">
                      <div className="w-20 h-20 bg-gray-50 rounded-xl p-2 flex-shrink-0 flex items-center justify-center">
                        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0 py-1">
                        <p className="text-xs text-gray-400 mb-1 truncate">{item.shop}</p>
                        <h4 className="text-sm font-bold text-gray-900 truncate mb-1">{item.title}</h4>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-sm" style={{ color: '#121358' }}>${item.price.toFixed(2)}</span>
                          <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-md text-gray-600">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500 font-medium">Total</span>
                  <span className="text-xl font-bold" style={{ color: '#121358' }}>${cartTotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-2xl text-sm font-bold text-white transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#F59E0B' }}
                >
                  <ShoppingCart size={18} />
                  Checkout Order
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo in top bar now since there's no sidebar */}
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F59E0B' }}>
              <ShoppingBag size={16} className="text-white" />
            </div>
            <span className="font-bold" style={{ color: '#121358' }}>WorkWorm</span>
          </Link>

          <div className="relative ml-auto flex items-center gap-4">
            
            {/* Cart Button */}
            <button 
              onClick={() => setCartDrawerOpen(true)}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
            >
              <ShoppingCart size={22} />
              {cart.reduce((a, c) => a + c.quantity, 0) > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                  {cart.reduce((a, c) => a + c.quantity, 0)}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 focus:outline-none hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm overflow-hidden"
                style={{ backgroundColor: '#F59E0B' }}>
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.name}</span>
            </button>
            
            {profileDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setProfileDropdownOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-20 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <Link 
                    href="/dashboard/profile" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <User size={16} className="text-gray-400" />
                    Edit Profile
                  </Link>
                  <Link 
                    href="/dashboard" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <LayoutDashboard size={16} className="text-gray-400" />
                    Dashboard
                  </Link>
                  <Link 
                    href="/dashboard/orders" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <Package size={16} className="text-gray-400" />
                    My Orders
                  </Link>
                  <Link 
                    href="/dashboard/reviews" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <Star size={16} className="text-gray-400" />
                    My Reviews
                  </Link>
                  <button 
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-50 mt-1"
                  >
                    <LogOut size={16} className="text-red-400" />
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <DashboardContent>{children}</DashboardContent>
    </CartProvider>
  );
}
