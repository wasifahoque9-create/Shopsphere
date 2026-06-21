'use client';

import { Star } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

export default function DashboardPage() {
  const { addToCart } = useCart();
  
  return (
    <div className="max-w-6xl mx-auto w-full">
      {/* Header section with categories */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold" style={{ color: '#121358' }}>
          Products By Category
        </h1>
        <div className="flex items-center gap-6">
          <button className="px-6 py-2 rounded-full text-sm font-semibold text-white transition-all shadow-sm" style={{ backgroundColor: '#121358' }}>
            Accessories
          </button>
          <button className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
            Gadgets
          </button>
          <button className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
            Smart Devices
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
          <div className="relative w-full h-48 mb-4 flex items-center justify-center bg-white">
            <img 
              src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=300&h=300" 
              alt="Asus Laptop" 
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <p className="text-xs text-gray-400 mb-1">EcoShop</p>
            <h3 className="text-sm font-bold leading-tight mb-2 flex-1" style={{ color: '#121358' }}>
              The Best Is Yet To Come Framed Poster
            </h3>
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="fill-current text-yellow-400" />
              ))}
              <span className="text-xs text-gray-400 ml-1">(5)</span>
            </div>
            <p className="font-bold text-lg mb-4" style={{ color: '#121358' }}>$150.00</p>
            <button 
              onClick={() => addToCart({ id: 1, title: 'The Best Is Yet To Come Framed Poster', shop: 'EcoShop', price: 150.00, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=300&h=300' })}
              className="w-full py-2.5 rounded-full text-xs font-bold transition-colors hover:bg-gray-200 active:scale-95" 
              style={{ backgroundColor: '#F3F4F6', color: '#121358' }}
            >
              ADD TO CART
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow relative">
          <div className="absolute top-4 left-4 z-10 px-2 py-0.5 rounded text-[10px] font-bold text-white bg-yellow-400">
            -10%
          </div>
          <div className="relative w-full h-48 mb-2 flex items-center justify-center bg-white">
            <img 
              src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=300&h=300" 
              alt="Tablet" 
              className="object-contain w-full h-full"
            />
          </div>
          <div className="text-center mb-3">
            <span className="text-xs font-bold text-yellow-400">22d : 16h : 34m : 22s</span>
          </div>
          <div className="flex-1 flex flex-col">
            <p className="text-xs text-gray-400 mb-1">SmartShop</p>
            <h3 className="text-sm font-bold leading-tight mb-2 flex-1" style={{ color: '#121358' }}>
              APPLE New AirPods Max Bluetooth...
            </h3>
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="fill-current text-yellow-400" />
              ))}
              <span className="text-xs text-gray-400 ml-1">(3)</span>
            </div>
            <div className="flex items-end gap-2 mb-4">
              <p className="text-xs text-gray-400 line-through mb-0.5">$195.00</p>
              <p className="font-bold text-lg" style={{ color: '#121358' }}>$175.50</p>
            </div>
            <button 
              onClick={() => addToCart({ id: 2, title: 'APPLE New AirPods Max Bluetooth...', shop: 'SmartShop', price: 175.50, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=300&h=300' })}
              className="w-full py-2.5 rounded-full text-xs font-bold transition-colors hover:bg-gray-200 active:scale-95" 
              style={{ backgroundColor: '#F3F4F6', color: '#121358' }}
            >
              ADD TO CART
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
          <div className="relative w-full h-48 mb-4 flex items-center justify-center bg-white">
            <img 
              src="https://images.unsplash.com/photo-1505156868547-9b49f4df4e04?auto=format&fit=crop&q=80&w=300&h=300" 
              alt="Macbook Earbuds" 
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <p className="text-xs text-gray-400 mb-1">StyleHub</p>
            <h3 className="text-sm font-bold leading-tight mb-2 flex-1" style={{ color: '#121358' }}>
              OnePlus Nord 2r Wireless Earbuds Wi...
            </h3>
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="fill-current text-yellow-400" />
              ))}
              <span className="text-xs text-gray-400 ml-1">(2)</span>
            </div>
            <p className="font-bold text-lg mb-4" style={{ color: '#121358' }}>$170.00</p>
            <button 
              onClick={() => addToCart({ id: 3, title: 'OnePlus Nord 2r Wireless Earbuds Wi...', shop: 'StyleHub', price: 170.00, image: 'https://images.unsplash.com/photo-1505156868547-9b49f4df4e04?auto=format&fit=crop&q=80&w=300&h=300' })}
              className="w-full py-2.5 rounded-full text-xs font-bold transition-colors hover:bg-gray-200 active:scale-95" 
              style={{ backgroundColor: '#F3F4F6', color: '#121358' }}
            >
              ADD TO CART
            </button>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
          <div className="relative w-full h-48 mb-4 flex items-center justify-center bg-white">
            <img 
              src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=300&h=300" 
              alt="Apple Watch" 
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <p className="text-xs text-gray-400 mb-1">GadgetPro</p>
            <h3 className="text-sm font-bold leading-tight mb-2 flex-1" style={{ color: '#121358' }}>
              Apple Watch Series 9 GPS
            </h3>
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="fill-current text-yellow-400" />
              ))}
              <span className="text-xs text-gray-400 ml-1">(18)</span>
            </div>
            <p className="font-bold text-lg mb-4" style={{ color: '#121358' }}>$399.00</p>
            <button 
              onClick={() => addToCart({ id: 4, title: 'Apple Watch Series 9 GPS', shop: 'GadgetPro', price: 399.00, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=300&h=300' })}
              className="w-full py-2.5 rounded-full text-xs font-bold transition-colors hover:bg-gray-200 active:scale-95" 
              style={{ backgroundColor: '#F3F4F6', color: '#121358' }}
            >
              ADD TO CART
            </button>
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
          <div className="relative w-full h-48 mb-4 flex items-center justify-center bg-white">
            <img 
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=300&h=300" 
              alt="Camera" 
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <p className="text-xs text-gray-400 mb-1">PhotoGear</p>
            <h3 className="text-sm font-bold leading-tight mb-2 flex-1" style={{ color: '#121358' }}>
              Sony Alpha a7 III Mirrorless Camera
            </h3>
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="fill-current text-yellow-400" />
              ))}
              <span className="text-xs text-gray-400 ml-1">(42)</span>
            </div>
            <p className="font-bold text-lg mb-4" style={{ color: '#121358' }}>$1,998.00</p>
            <button 
              onClick={() => addToCart({ id: 5, title: 'Sony Alpha a7 III Mirrorless Camera', shop: 'PhotoGear', price: 1998.00, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=300&h=300' })}
              className="w-full py-2.5 rounded-full text-xs font-bold transition-colors hover:bg-gray-200 active:scale-95" 
              style={{ backgroundColor: '#F3F4F6', color: '#121358' }}
            >
              ADD TO CART
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
