<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::middleware(['jwt.auth'])->group(function () {
    Route::get('/currentUser', [UserController::class, 'currentUser']);
    Route::get('/products', [ProductController::class, 'getProduct']);
    Route::post('/products', [ProductController::class, 'addProduct']);
    Route::put('/products/{id}', [ProductController::class, 'editProduct']);
    Route::delete('/products/{id}', [ProductController::class, 'deleteProduct']);
});

