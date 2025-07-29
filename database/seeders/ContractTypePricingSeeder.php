<?php

namespace Database\Seeders;

use App\Models\ContractType;
use App\Models\ContractTypePricings;
use Illuminate\Database\Seeder;

class ContractTypePricingSeeder extends Seeder
{
    public function run(): void
    {
        $trialId = ContractType::where('name', 'Trial')->first()->id;
        $basicId = ContractType::where('name', 'Basic')->first()->id;
        $premiumId = ContractType::where('name', 'Premium')->first()->id;

        ContractTypePricings::insert([
            // Trial (oculto da UI)
            [
                'contract_type_id' => $trialId,
                'billing_period' => 'monthly',
                'price_cents' => 0,
                'cycle_days' => 7,
                'is_active' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Basic
            [
                'contract_type_id' => $basicId,
                'billing_period' => 'monthly',
                'price_cents' => 999,
                'cycle_days' => 30,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'contract_type_id' => $basicId,
                'billing_period' => 'yearly',
                'price_cents' => 9990,
                'cycle_days' => 365,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Premium
            [
                'contract_type_id' => $premiumId,
                'billing_period' => 'monthly',
                'price_cents' => 1999,
                'cycle_days' => 30,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'contract_type_id' => $premiumId,
                'billing_period' => 'yearly',
                'price_cents' => 19990,
                'cycle_days' => 365,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
