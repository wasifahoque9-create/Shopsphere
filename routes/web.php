<?php

use Illuminate\Support\Facades\Route;

Route::get('/products', function () {
    return response()->json([
        ['id' => 1, 'name' => 'Laptop'],
        ['id' => 2, 'name' => 'Phone'],
    ]);
});
