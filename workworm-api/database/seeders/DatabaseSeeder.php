<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Demo products
        $products = [
            ['name' => 'Wireless Earbuds Pro', 'price' => 2499, 'category' => 'Electronics', 'stock' => 50],
            ['name' => 'Slim Leather Wallet', 'price' => 899, 'category' => 'Accessories', 'stock' => 100],
            ['name' => 'Cotton Casual T-Shirt', 'price' => 450, 'category' => 'Clothing', 'stock' => 200],
            ['name' => 'Smart Watch Lite', 'price' => 3999, 'category' => 'Electronics', 'stock' => 30],
            ['name' => 'Running Shoes Air', 'price' => 2200, 'category' => 'Footwear', 'stock' => 60],
        ];

        foreach ($products as $p) {
            DB::table('products')->insertOrIgnore([...$p, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()]);
        }

        // Demo customer
        $user = User::firstOrCreate(
            ['email' => 'fancyroy@workworm.com'],
            [
                'name' => 'Fancy Roy',
                'phone' => '+8801700000000',
                'password' => 'password',
                'email_verified_at' => now(),
                'address' => 'House 12, Road 5, Dhanmondi, Dhaka 1209',
                'gender' => 'male',
            ]
        );

        // Demo orders
        if ($user->orders()->count() === 0) {
            $order = Order::create([
                'user_id' => $user->id,
                'order_number' => 'WW-' . strtoupper(uniqid()),
                'total' => 3398,
                'status' => 'delivered',
                'shipping_address' => 'House 12, Road 5, Dhanmondi, Dhaka',
                'payment_method' => 'bKash',
                'payment_status' => 'paid',
            ]);

            OrderItem::insert([
                ['order_id' => $order->id, 'product_id' => 1, 'product_name' => 'Wireless Earbuds Pro', 'quantity' => 1, 'price' => 2499, 'created_at' => now(), 'updated_at' => now()],
                ['order_id' => $order->id, 'product_id' => 2, 'product_name' => 'Slim Leather Wallet', 'quantity' => 1, 'price' => 899, 'created_at' => now(), 'updated_at' => now()],
            ]);

            Order::create([
                'user_id' => $user->id,
                'order_number' => 'WW-' . strtoupper(uniqid()),
                'total' => 2200,
                'status' => 'shipped',
                'shipping_address' => 'House 12, Road 5, Dhanmondi, Dhaka',
                'payment_method' => 'Cash on Delivery',
                'payment_status' => 'unpaid',
            ]);

            Order::create([
                'user_id' => $user->id,
                'order_number' => 'WW-' . strtoupper(uniqid()),
                'total' => 1500,
                'status' => 'processing',
                'shipping_address' => 'House 12, Road 5, Dhanmondi, Dhaka',
                'payment_method' => 'Credit Card',
                'payment_status' => 'paid',
            ]);

            Order::create([
                'user_id' => $user->id,
                'order_number' => 'WW-' . strtoupper(uniqid()),
                'total' => 450,
                'status' => 'pending',
                'shipping_address' => 'House 12, Road 5, Dhanmondi, Dhaka',
                'payment_method' => 'bKash',
                'payment_status' => 'unpaid',
            ]);

            Order::create([
                'user_id' => $user->id,
                'order_number' => 'WW-' . strtoupper(uniqid()),
                'total' => 899,
                'status' => 'delivered',
                'shipping_address' => 'House 12, Road 5, Dhanmondi, Dhaka',
                'payment_method' => 'Cash on Delivery',
                'payment_status' => 'unpaid',
            ]);
        }

        $this->command->info('Seeded: products, demo customer (fancyroy@workworm.com / password)');
    }
}
