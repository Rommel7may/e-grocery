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
    if(auth()->check() && auth()->user()->role === 'admin'){
        return redirect()->route('dashboard');
    }
    
    return redirect()->route('products.index');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::middleware('role:admin')->group(function () {
        Route::get('dashboard', function () {

        $sales = Product::where('sales', '>', 0)->orderBy('sales', 'desc')->take(5)->get();

        return Inertia::render('dashboard', compact('sales'));
        })->name('dashboard');
        
        Route::resource('manage-users', UsersController::class);
        Route::resource('manageUser', ManageUserController::class);
    });
    
    Route::resource('products', ProductController::class);
    Route::resource('order-history', OrderHistoryController::class);

    Route::resource('cart', CartController::class);

    Route::resource('order', OrderController::class);
        
});



require __DIR__.'/settings.php';
