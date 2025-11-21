<?php

use Inertia\Inertia;
use App\Models\Product;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\ProductController;

use App\Http\Controllers\ManageUserController;
use App\Http\Controllers\OrderHistoryController;


Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {

        $sales = Product::where('sales', '>', 0)->orderBy('sales', 'desc')->take(5)->get();

        return Inertia::render('dashboard', compact('sales'));
    })->name('dashboard');

    Route::resource('products', ProductController::class);
    Route::resource('order-history', OrderHistoryController::class);

    Route::resource('manage-users', UsersController::class);
    Route::resource('cart', CartController::class);

    Route::resource('order', OrderController::class);
    
    Route::resource('manageUser', ManageUserController::class);

    
});



require __DIR__.'/settings.php';
