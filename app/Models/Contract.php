<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    protected $fillable = [
        'user_id',
        'contract_type_id',
        'billing_period',
        'price_cents',
        'cycle_days',
        'starts_at',
        'ends_at',
        'is_active',
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
    ];

    public function type()
    {
        return $this->belongsTo(ContractType::class, 'contract_type_id');
    }

    public function pricing()
    {
        return $this->belongsTo(
            ContractTypePricing::class,
            'contract_pricing_id'       //  ← guarda este campo ao criar o contrato
        );
    }

    
}
