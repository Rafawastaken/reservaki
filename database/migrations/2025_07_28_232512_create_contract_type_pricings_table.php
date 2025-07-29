<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contract_type_pricings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('contract_type_id')->constrained('contract_types')->onDelete('cascade');
            $table->enum('billing_period', ['monthly', 'yearly']);
            $table->unsignedInteger('price_cents');
            $table->unsignedSmallInteger('cycle_days');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contract_type_pricings');
    }
};
