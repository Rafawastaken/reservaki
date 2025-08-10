<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Property extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'address',
        'postal_code',
        'city',
        'district',
        'country',
        'price_per_night',
        'is_visible',
        'description',
    ];

    protected $cats = ['is_visible' => 'boolean'];

    protected static function booted(): void
    {
        static::creating(function (Property $p) {
            if (empty($p->slug)) $p->slug = static::uniqueSlug($p->name);
        });

        static::updating(function (Property $p) {
            if ($p->isDirty('name')) $p->slug = static::uniqueSlug($p->name, $p->id);
        });
    }

    public static function uniqueSlug(string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($name) ?: Str::random(8);
        $slug = $base;
        $i = 1;

        while (static::query()->where('slug', '=', $slug)
            ->when($ignoreId, fn($q) => $q->where('id', '!=', $ignoreId))
            ->exists()) {
            $slug = "{$base}-{$i}";
            $i++;
        }
        return $slug;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function features(): HasOne
    {
        return $this->hasOne(PropertyFeature::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(PropertyImage::class);
    }

}
