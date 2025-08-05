<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PropertyFeature extends Model
{
    protected $fillable = [
        'bedrooms',
        'bathrooms',
        'max_guests',
        'area_m2',
        'extras',
        'has_kitchen',
        'has_air_conditioning',
        'has_heating',
        'has_wifi',
        'has_parking',
        'has_pool',
        'has_washing_machine',
    ];

    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }
}
