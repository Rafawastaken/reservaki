<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PropertyController;

Route::middleware(['auth', 'verified', 'contract.active'])->prefix('properties')->name('properties.')->group(function () {
    Route::get('/', [PropertyController::class, 'index'])->name('index');
    Route::get('/create', [PropertyController::class, 'create'])->name('create');
    Route::post('/', [PropertyController::class, 'store'])->name('store');
    // poderemos adicionar depois: edit, update, destroy
});
