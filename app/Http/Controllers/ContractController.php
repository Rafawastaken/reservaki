<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ContractController extends Controller
{
    use AuthorizesRequests;

    /** GET /checkout/payment/{contract} */
    public function show(Contract $contract): Response   // ← tipagem consistente
    {
        $this->authorize('view', $contract);

        return Inertia::render('checkout/payment', [
            'contract' => $contract->only(['id', 'price_cents', 'billing_period']),
        ]);
    }

    /** POST /checkout/payment/{contract} */
    public function pay(Request $request, Contract $contract)
    {
        $this->authorize('pay', $contract);

        // mock: marcar como pago / activo
        $contract->update(['is_active' => true]);

        return redirect()->route('checkout.success');
    }

    /** GET /checkout/success */
    public function success(): Response
    {
        return Inertia::render('checkout/success');
    }
}
