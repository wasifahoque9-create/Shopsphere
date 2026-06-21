<?php

use Illuminate\Support\Facades\Route;

Route::get('/products', function () {
    return response()->json([
        ['id' => 1, 'name' => 'Laptop', 'price' => 50000],
        ['id' => 2, 'name' => 'Phone', 'price' => 20000],
    ]);
});