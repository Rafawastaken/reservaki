<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\EnsureContractIsActive;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        /* ---------- GLOBAL ---------- */
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        /* ---------- PILHA WEB ---------- */
        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        /* ---------- ALIASES DE ROUTE MIDDLEWARE ---------- */
        $middleware->alias([
            'auth' => \Illuminate\Auth\Middleware\Authenticate::class,
            'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
            'contract.active' => EnsureContractIsActive::class,
        ]);

        /* ---------- GRUPOS PERSONALIZADOS ---------- */
        $middleware->group('auth.active', [
            'auth',            // utilizador autenticado
            'verified',        // email verificado (opcional, já que usas Jetstream)
            'contract.active', // contrato activo
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })
    ->create();
