<?php

namespace App\Http\Controllers;

use App\Mappers\ContractMapper;
use App\Models\Contract;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContractController extends Controller
{
    use AuthorizesRequests;

    /* SETTINGS → mostra contrato activo ou pendente */
    public function show(): Response
    {
        $contract = auth()->user()
            ->contracts()
            ->latest('created_at')
            ->first();

        abort_unless($contract, 404, 'Nenhum contrato encontrado.');

        $contract = auth()->user()
            ->contracts()
            ->with(['type', 'pricing'])
            ->latest('created_at')
            ->firstOrFail();

        $payload = ContractMapper::payload($contract);

        return Inertia::render('settings/contract', [
            'contract' => $payload,
        ]);
    }

    /* GET /contract/payment/{contract} */
    public function payment(Contract $contract): Response
    {
        $this->authorize('view', $contract);

        return Inertia::render('checkout/payment', [
            'contract' => $contract->only(['id', 'price_cents', 'billing_period']),
        ]);
    }

    /* POST /contract/payment/{contract} */
    public function pay(Request $request, Contract $contract): RedirectResponse
    {
        $this->authorize('pay', $contract);

        // mock: marcar como pago / activo
        $contract->update(['is_active' => true]);

        return redirect()->route('contract.success');
    }

    /* GET /contract/success */
    public function success(): Response
    {
        return Inertia::render('dashboard');
    }
}
