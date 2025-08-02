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
        Schema::create('property_features', function (Blueprint $table) {
            $table->id();
            $table->foreignId('property_id')->constrained()->onDelete('cascade');
            $table->unsignedTinyInteger('bedrooms')->default(0);
            $table->unsignedTinyInteger('bathrooms')->default(0);
            $table->unsignedTinyInteger('max_guests')->default(1);
            $table->boolean('has_kitchen')->default(false);
            $table->boolean('has_air_conditioning')->default(false);
            $table->boolean('has_heating')->default(false);
            $table->boolean('has_wifi')->default(false);
            $table->boolean('has_parking')->default(false);
            $table->boolean('has_pool')->default(false);
            $table->boolean('has_washing_machine')->default(false);
            $table->unsignedInteger('area_m2')->nullable();
            $table->text('extras')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('property_features');
    }
};
