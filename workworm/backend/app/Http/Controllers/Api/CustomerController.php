<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password as PasswordRule;

class CustomerController extends Controller
{
    // ─── Profile ─────────────────────────────────────────────────────────────

    public function getProfile(Request $request)
    {
        return response()->json(['success' => true, 'data' => $request->user()]);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|unique:users,email,' . $user->id,
            'phone'   => 'nullable|string|max:20',
            'gender'  => 'nullable|in:male,female,other',
            'address' => 'nullable|string|max:500',
        ]);

        $user->update($data);

        return response()->json(['success' => true, 'data' => $user->fresh()]);
    }

    public function changePassword(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'current_password' => 'required|string',
            'password'         => ['required', 'confirmed', PasswordRule::min(8)],
        ]);

        if (! Hash::check($data['current_password'], $user->password)) {
            return response()->json(['success' => false, 'message' => 'Current password is incorrect.'], 422);
        }

        $user->update(['password' => $data['password']]);

        return response()->json(['success' => true, 'message' => 'Password changed successfully.']);
    }

    // ─── Orders ──────────────────────────────────────────────────────────────

    public function getOrders(Request $request)
    {
        $orders = $request->user()
            ->orders()
            ->with('items')
            ->latest()
            ->get();

        return response()->json(['success' => true, 'data' => $orders]);
    }

    public function getOrder(Request $request, int $id)
    {
        $order = $request->user()->orders()->with('items')->findOrFail($id);

        return response()->json(['success' => true, 'data' => $order]);
    }

    public function downloadInvoice(Request $request, int $id)
    {
        $order = $request->user()->orders()->with('items')->findOrFail($id);

        // Generate a simple text invoice (replace with PDF library like dompdf in production)
        $lines   = [];
        $lines[] = "WorkWorm Invoice";
        $lines[] = str_repeat('-', 40);
        $lines[] = "Order: #{$order->order_number}";
        $lines[] = "Date:  " . $order->created_at->format('d M Y');
        $lines[] = "Status: " . ucfirst($order->status);
        $lines[] = str_repeat('-', 40);

        foreach ($order->items as $item) {
            $lines[] = "{$item->product_name} x{$item->quantity}  ৳" . number_format($item->price * $item->quantity, 2);
        }

        $lines[] = str_repeat('-', 40);
        $lines[] = "TOTAL: ৳" . number_format($order->total, 2);
        $lines[] = str_repeat('-', 40);
        $lines[] = "Thank you for shopping with WorkWorm!";

        $content = implode("\n", $lines);

        return response($content, 200, [
            'Content-Type'        => 'application/pdf',
            'Content-Disposition' => "attachment; filename=invoice-{$order->order_number}.pdf",
        ]);
    }

    // ─── Reviews ─────────────────────────────────────────────────────────────

    public function getReviews(Request $request)
    {
        $reviews = $request->user()->reviews()->latest()->get();

        return response()->json(['success' => true, 'data' => $reviews]);
    }

    public function submitReview(Request $request)
    {
        $data = $request->validate([
            'product_id'   => 'required|integer|exists:products,id',
            'rating'       => 'required|integer|min:1|max:5',
            'comment'      => 'required|string|max:1000',
        ]);

        $user = $request->user();

        // Ensure user has ordered this product
        $hasPurchased = $user->orders()
            ->whereHas('items', fn($q) => $q->where('product_id', $data['product_id']))
            ->where('status', 'delivered')
            ->exists();

        if (! $hasPurchased) {
            return response()->json([
                'success' => false,
                'message' => 'You can only review products you have purchased and received.',
            ], 403);
        }

        $review = Review::updateOrCreate(
            ['user_id' => $user->id, 'product_id' => $data['product_id']],
            [
                'product_name' => \App\Models\Product::find($data['product_id'])?->name ?? 'Product',
                'rating'       => $data['rating'],
                'comment'      => $data['comment'],
            ]
        );

        return response()->json(['success' => true, 'data' => $review], 201);
    }
}
