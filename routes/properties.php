<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PropertyController;

Route::middleware(['auth', 'verified', 'contract.active'])->prefix('properties')->name('properties.')->group(function () {
    Route::get('/', [PropertyController::class, 'index'])->name('index');
    Route::get('/create', [PropertyController::class, 'create'])->name('create');
    Route::post('/', [PropertyController::class, 'store'])->name('store');

    Route::get('/{property}/edit', [PropertyController::class, 'edit'])->name('edit');
    Route::patch('/{property}', [PropertyController::class, 'update'])->name('update');
    
    Route::delete('/{property}', [PropertyController::class, 'destroy'])->name('destroy');

    Route::patch('/toggle/{property}', [PropertyController::class, 'toggleActive'])->name('toggle');
});
