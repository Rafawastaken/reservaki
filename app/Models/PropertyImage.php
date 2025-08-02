<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PropertyImage extends Model
{
    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }
}
