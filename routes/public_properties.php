<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PublicPropertyController;

Route::name('public.properties.')->group(function () {
    Route::get('/propriedades', [PublicPropertyController::class, 'index'])
        ->name('index');

    Route::get('/p/{property:slug}', [PublicPropertyController::class, 'show'])
        ->name('show');
});
