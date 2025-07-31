<?php

namespace App\Mappers;

use App\Helpers\Helpers;
use App\Models\Contract;

class ContractMapper
{
    /**
     * Devolve payload pronto para o front-end.
     */
    public static function payload(Contract $contract): array
    {
        return [
            'id' => $contract->id,
            'billing' => [
                'period' => $contract->billing_period,
                'cycle_days' => $contract->cycle_days,
                'price' => Helpers::formatEuros($contract->price_cents ?? 0),
                'next_charge' => $contract->ends_at->format('d-m-Y'),
                'active' => $contract->is_active,
            ],
            'type' => [
                'name' => $contract->type->name,
            ],
        ];
    }
}
