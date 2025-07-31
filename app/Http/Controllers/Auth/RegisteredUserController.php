<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Contract;
use App\Models\ContractTypePricing;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'accepted_terms' => ['accepted', 'required'],
            'contract_pricing_id' => ['required'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'accepted_terms' => $request->accepted_terms,
            'accepted_terms_at' => now(),
        ]);

        $pricing = ContractTypePricing::findOrFail($request->contract_pricing_id);

        $contract = Contract::create([
            'user_id' => $user->id,
            'contract_type_id' => $pricing->contract_type_id,
            'billing_period' => $pricing->billing_period,
            'price_cents' => $pricing->price_cents,
            'cycle_days' => $pricing->cycle_days,
            'starts_at' => now(),
            'ends_at' => now()->addDays($pricing->cycle_days),
            'is_active' => $pricing->price_cents == 0, // Ativa só se for trial
        ]);

        event(new Registered($user));

        Auth::login($user);

        if ($contract->is_active) {
            Auth::login($user);
            return redirect()->intended(route('dashboard', absolute: false));
        }

        return redirect()->route('contract.payment', ['contract' => $contract->id]);
    }

    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }
}
