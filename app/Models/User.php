<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

// ← importa
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'last_name',
        'email',
        'password',
        'accepted_terms',
        'accepted_terms_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /* ➜ relação 1:N — todos os contratos do utilizador */
    public function contracts(): HasMany
    {
        return $this->hasMany(Contract::class);
    }

    /* ➜ relação 1:1 filtrada — contrato activo */
    public function activeContract(): HasOne
    {
        return $this->hasOne(Contract::class)->where('is_active', true);
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
