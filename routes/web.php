<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('public/home/index');
})->name('home');

Route::middleware(['auth', 'verified', 'contract.active'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/contracts.php';
require __DIR__ . '/properties.php';
require __DIR__ . '/public_properties.php';
