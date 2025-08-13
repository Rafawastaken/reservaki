<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PublicPropertyController extends Controller
{
    public function index(Request $request): Response
    {
        $term = $request->string('q')->toString();
        $cities = array_filter((array)$request->input('cities', []), fn($v) => $v !== null && $v !== '');
        $minPrice = $request->integer('min_price');
        $maxPrice = $request->integer('max_price');
        $guests = $request->integer('guests');
        $amenities = array_filter((array)$request->input('amenities', [])); // ex: ['has_wifi','has_pool']

        // Base (sem filtrar por cidade, para podermos calcular facetas)
        $base = Property::query()
            ->where('is_visible', true)
            ->with([
                'features',
                'images' => fn($q) => $q->orderByDesc('is_cover')->orderBy('order')->limit(1),
            ]);

        // Filtros globais (aplicam-se às facetas e aos resultados)
        if ($term) {
            $base->where(function ($w) use ($term) {
                $w->where('name', 'like', "%{$term}%")
                    ->orWhere('city', 'like', "%{$term}%")
                    ->orWhere('address', 'like', "%{$term}%");
            });
        }
        if ($minPrice) $base->where('price_per_night', '>=', $minPrice);
        if ($maxPrice) $base->where('price_per_night', '<=', $maxPrice);
        if ($guests) $base->whereHas('features', fn($f) => $f->where('max_guests', '>=', $guests));

        if (!empty($amenities)) {
            $base->whereHas('features', function ($f) use ($amenities) {
                foreach ($amenities as $a) {
                    // whitelisting simples
                    if (in_array($a, [
                        'has_wifi', 'has_parking', 'has_air_conditioning', 'has_heating', 'has_pool', 'has_kitchen', 'has_washing_machine'
                    ], true)) {
                        $f->where($a, true);
                    }
                }
            });
        }

        // Facetas de cidades (com os filtros globais aplicados, mas SEM cortar por cidade)
        $facetCities = (clone $base)
            ->selectRaw('city, COUNT(*) as total')
            ->groupBy('city')
            ->orderBy('city')
            ->get()
            ->map(fn($row) => ['label' => $row->city, 'count' => (int)$row->total])
            ->values();

        // Agora aplica o filtro de cidades aos resultados, se houver
        $results = (clone $base)
            ->when(!empty($cities), fn($q) => $q->whereIn('city', $cities))
            ->orderByDesc('created_at')
            ->paginate(12)
            ->withQueryString();

        $items = $results->through(function (\App\Models\Property $p) {
            $img = $p->images->first();
            return [
                'id' => $p->id,
                'slug' => $p->slug,
                'name' => $p->name,
                'city' => $p->city,
                'price_per_night' => (float)$p->price_per_night,
                'max_guests' => optional($p->features)->max_guests,
                'bedrooms' => optional($p->features)->bedrooms,
                'bathrooms' => optional($p->features)->bathrooms,
                'cover_url' => $img ? \Storage::disk('public')->url($img->path) : null,
            ];
        });

        return Inertia::render('public/properties/index', [
            'filters' => [
                'q' => $term,
                'cities' => array_values($cities),
                'min_price' => $minPrice,
                'max_price' => $maxPrice,
                'guests' => $guests,
                'amenities' => array_values($amenities),
            ],
            'facets' => [
                'cities' => $facetCities, // [{label:'Lisboa', count: 12}, ...]
            ],
            'properties' => $items,
        ]);
    }

    public function show(Property $property): Response
    {
        abort_unless($property->is_visible, 404);

        $property->load([
            'features',
            'images' => fn($q) => $q->orderByDesc('is_cover')->orderBy('order'),
        ]);

        $images = $property->images->map(fn($img) => [
            'id' => $img->id,
            'url' => Storage::disk('public')->url($img->path),
            'is_cover' => (bool)$img->is_cover,
        ]);

        return Inertia::render('public/properties/show', [
            'property' => [
                'id' => $property->id,
                'slug' => $property->slug,
                'name' => $property->name,
                'address' => $property->address,
                'city' => $property->city,
                'price_per_night' => (float)$property->price_per_night,
                'description' => $property->description,
                'features' => [
                    'bedrooms' => optional($property->features)->bedrooms,
                    'bathrooms' => optional($property->features)->bathrooms,
                    'max_guests' => optional($property->features)->max_guests,
                    'area_m2' => optional($property->features)->area_m2,
                    'extras' => optional($property->features)->extras,
                    'has_kitchen' => (bool)optional($property->features)->has_kitchen,
                    'has_air_conditioning' => (bool)optional($property->features)->has_air_conditioning,
                    'has_heating' => (bool)optional($property->features)->has_heating,
                    'has_wifi' => (bool)optional($property->features)->has_wifi,
                    'has_parking' => (bool)optional($property->features)->has_parking,
                    'has_pool' => (bool)optional($property->features)->has_pool,
                    'has_washing_machine' => (bool)optional($property->features)->has_washing_machine,
                ],
                'images' => $images,
            ],
        ]);
    }
}
