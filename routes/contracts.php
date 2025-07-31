<?php

use App\Http\Controllers\ContractController;
use Illuminate\Support\Facades\Route;


/* prefix('checkout')->middleware('auth') já existe */
Route::prefix('contract')->middleware('auth')->group(function () {

    Route::get('/payment/{contract}', [ContractController::class, 'show'])
        ->name('checkout.payment');

    /* já dentro do grupo 'auth', não precisas repetir ->middleware('auth') */
    Route::post('/payment/{contract}', [ContractController::class, 'pay'])
        ->name('checkout.pay');

    Route::get('/success', [ContractController::class, 'success'])
        ->name('checkout.success');

});
