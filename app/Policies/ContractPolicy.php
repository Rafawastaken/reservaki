<?php

namespace App\Policies;

use App\Models\Contract;
use App\Models\User;

class ContractPolicy
{
    public function view(User $user, Contract $contract): bool
    {
        return $contract->user_id === $user->id;
    }

    public function pay(User $user, Contract $contract): bool
    {
        return $contract->user_id === $user->id && !$contract->is_active;
    }
}
