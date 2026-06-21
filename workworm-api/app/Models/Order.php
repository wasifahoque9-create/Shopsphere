<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id', 'order_number', 'total', 'status',
        'shipping_address', 'payment_method', 'payment_status',
    ];

    protected $appends = ['items_count'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function getItemsCountAttribute()
    {
        return $this->items()->count();
    }
}
