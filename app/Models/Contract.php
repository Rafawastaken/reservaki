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
}
