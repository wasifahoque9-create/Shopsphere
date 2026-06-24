'use client';

import { useState, useEffect } from 'react';
import { customerAPI } from '@/lib/api';
import { Package, Download, ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';

interface OrderItem {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  order_number: string;
  total: number;
  status: string;
  created_at: string;
  items: OrderItem[];
  items_count: number;
  shipping_address?: string;
}

const STATUS_CONFIG: Record<string, { color: string; label: string }> = {
  pending:    { color: '#F59E0B', label: 'Pending' },
  processing: { color: '#3B82F6', label: 'Processing' },
  shipped:    { color: '#8B5CF6', label: 'Shipped' },
  delivered:  { color: '#10B981', label: 'Delivered' },
  cancelled:  { color: '#EF4444', label: 'Cancelled' },
};

const STEPS = ['pending', 'processing', 'shipped', 'delivered'];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [downloading, setDownloading] = useState<number | null>(null);

  useEffect(() => {
    customerAPI.getOrders()
      .then(res => setOrders(res.data.data || []))
      .finally(() => setLoading(false));
  }, []);

  const downloadInvoice = async (orderId: number, orderNumber: string) => {
    setDownloading(orderId);
    try {
      const res = await customerAPI.downloadInvoice(orderId);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url; a.download = `invoice-${orderNumber}.pdf`;
      a.click(); window.URL.revokeObjectURL(url);
    } catch { /* silent */ } finally { setDownloading(null); }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6" style={{ color: '#121358' }}>My Orders</h1>
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
              <div className="h-4 bg-gray-100 rounded w-1/4 mb-3" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6" style={{ color: '#121358' }}>My Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 py-16 text-center">
          <ShoppingBag size={40} className="mx-auto mb-3 text-gray-200" />
          <p className="text-gray-400 text-sm font-medium">No orders yet</p>
          <a href="/" className="text-sm font-semibold mt-2 inline-block" style={{ color: '#F59E0B' }}>
            Browse products
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map(order => {
            const isOpen = expanded === order.id;
            const cfg = STATUS_CONFIG[order.status] || { color: '#6B7280', label: order.status };
            const stepIdx = STEPS.indexOf(order.status);

            return (
              <div key={order.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setExpanded(isOpen ? null : order.id)}>
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: cfg.color + '15' }}>
                      <Package size={16} style={{ color: cfg.color }} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-800">#{order.order_number}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-bold" style={{ color: '#121358' }}>৳{Number(order.total).toFixed(2)}</p>
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full text-white hidden sm:inline-block"
                      style={{ backgroundColor: cfg.color }}>
                      {cfg.label}
                    </span>
                    {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </div>
                </button>

                {/* Expanded */}
                {isOpen && (
                  <div className="border-t border-gray-100 px-5 py-4">
                    {/* Progress tracker */}
                    {order.status !== 'cancelled' && (
                      <div className="mb-5">
                        <div className="flex items-center justify-between relative">
                          <div className="absolute left-0 right-0 top-3 h-0.5 bg-gray-100" />
                          <div className="absolute left-0 top-3 h-0.5 bg-yellow-400 transition-all"
                            style={{ width: stepIdx >= 0 ? `${(stepIdx / (STEPS.length - 1)) * 100}%` : '0%' }} />
                          {STEPS.map((s, i) => {
                            const done = i <= stepIdx;
                            return (
                              <div key={s} className="relative flex flex-col items-center gap-1">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center z-10 text-xs font-bold transition-all"
                                  style={{
                                    backgroundColor: done ? '#F59E0B' : '#E5E7EB',
                                    color: done ? 'white' : '#9CA3AF'
                                  }}>
                                  {i + 1}
                                </div>
                                <span className="text-xs text-gray-400 capitalize hidden sm:block">{s}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Items */}
                    {order.items && order.items.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {order.items.map(item => (
                          <div key={item.id} className="flex justify-between text-sm py-2 border-b border-gray-50">
                            <span className="text-gray-600">{item.product_name} × {item.quantity}</span>
                            <span className="font-medium text-gray-800">৳{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="flex justify-between text-sm font-bold pt-1">
                          <span style={{ color: '#121358' }}>Total</span>
                          <span style={{ color: '#121358' }}>৳{Number(order.total).toFixed(2)}</span>
                        </div>
                      </div>
                    )}

                    {order.shipping_address && (
                      <p className="text-xs text-gray-400 mb-4">Shipping to: {order.shipping_address}</p>
                    )}

                    <button
                      onClick={() => downloadInvoice(order.id, order.order_number)}
                      disabled={downloading === order.id}
                      className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border transition-all disabled:opacity-50"
                      style={{ borderColor: '#121358', color: '#121358' }}>
                      <Download size={15} />
                      {downloading === order.id ? 'Downloading…' : 'Download invoice'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
