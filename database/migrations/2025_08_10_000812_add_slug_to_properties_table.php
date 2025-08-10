<?php

use App\Models\Property;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration {
    public function up(): void
    {
        // 1) Adiciona coluna (temporariamente nullable para backfill)
        Schema::table('properties', function (Blueprint $table) {
            $table->string('slug')->nullable()->after('name');
        });

        // 2) Backfill de slugs únicos
        Property::withoutEvents(function () {
            foreach (Property::cursor() as $p) {
                $base = Str::slug($p->name);
                $slug = $base ?: Str::random(8);
                $i = 1;

                while (Property::query()->where('slug', '=', $slug)->exists()) {
                    $slug = $base . '-' . $i;
                    $i++;
                }
                
                $p->slug = $slug;
                $p->save();
            }
        });

        // 3) Índice único
        Schema::table('properties', function (Blueprint $table) {
            $table->unique('slug');
        });
    }

    public function down(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->dropUnique(['slug']);
            $table->dropColumn('slug');
        });
    }
};
