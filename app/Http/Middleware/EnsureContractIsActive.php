<?php

namespace App\Http\Middleware;

use App\Models\Contract;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureContractIsActive
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        /* já tem contrato activo? continua */
        if (
            $user &&
            $user->contracts()
            ->where('is_active', true)
            ->where('starts_at', '<=', now())
            ->where('ends_at', '>=', now())
            ->exists()
        ) {
            return $next($request);
        }

        /* contrato inactivo ou inexistente → tenta obter o mais recente */
        $pending = $user?->contracts()
            ->latest('created_at')
            ->first();

        if ($pending) {
            return redirect()
                ->route('contract.payment', ['contract' => $pending->id]);
        }

        /* sem contrato algum (caso improvável) */
        return redirect()->route('home');     // ou página de planos
    }
}
