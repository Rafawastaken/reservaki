<?php

namespace Database\Seeders;

use App\Models\ContractType;
use Illuminate\Database\Seeder;

class ContractTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ContractType::insert([
            ['name' => 'Trial', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Basic', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Premium', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
