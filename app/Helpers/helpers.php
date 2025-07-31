<?php

namespace App\Helpers;

class Helpers
{
    public static function formatEuros(int $cents): string
    {
        return number_format($cents / 100, 2, ',', '') . ' €';
    }
}
