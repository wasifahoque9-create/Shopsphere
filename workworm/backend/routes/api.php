<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CustomerController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes – WorkWorm Customer Portal
|--------------------------------------------------------------------------
*/

// ── Public Auth Routes ─────────────────────────────────────────────────────
Route::prefix('auth')->group(function () {
    Route::post('/register',        [AuthController::class, 'register']);
    Route::post('/verify-otp',      [AuthController::class, 'verifyOtp']);
    Route::post('/login',           [AuthController::class, 'login']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password',  [AuthController::class, 'resetPassword']);
});

// ── Protected Routes (Sanctum) ─────────────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::get('/auth/me',     [AuthController::class, 'me']);
    Route::post('/auth/logout',[AuthController::class, 'logout']);

    // Customer profile
    Route::prefix('customer')->group(function () {
        Route::get('/profile',          [CustomerController::class, 'getProfile']);
        Route::put('/profile',          [CustomerController::class, 'updateProfile']);
        Route::put('/change-password',  [CustomerController::class, 'changePassword']);

        // Orders
        Route::get('/orders',                   [CustomerController::class, 'getOrders']);
        Route::get('/orders/{id}',              [CustomerController::class, 'getOrder']);
        Route::get('/orders/{id}/invoice',      [CustomerController::class, 'downloadInvoice']);

        // Reviews
        Route::get('/reviews',  [CustomerController::class, 'getReviews']);
        Route::post('/reviews', [CustomerController::class, 'submitReview']);
    });
});
