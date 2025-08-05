<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    public function index(): Response
    {
        $properties = auth()->user()->properties()->with(['features', 'images'])->orderBy('created_at', 'desc')->get();
        return Inertia::render('properties/index', ["properties" => $properties]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            // Propriedade
            'name' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string'],
            'postal_code' => ['required', 'string'],
            'city' => ['required', 'string'],
            'district' => ['nullable', 'string'],
            'country' => ['required', 'string'],
            'price_per_night' => ['required', 'numeric', 'min:0'],
            'is_visible' => ['required', 'boolean'],
            'description' => ['nullable', 'string'],

            // Features
            'features.bedrooms' => ['required', 'integer', 'min:0'],
            'features.bathrooms' => ['required', 'integer', 'min:0'],
            'features.max_guests' => ['required', 'integer', 'min:1'],
            'features.area_m2' => ['nullable', 'integer', 'min:0'],
            'features.extras' => ['nullable', 'string'],

            // Amenities (opcionais com sometimes)
            'has_kitchen' => ['sometimes', 'boolean'],
            'has_air_conditioning' => ['sometimes', 'boolean'],
            'has_heating' => ['sometimes', 'boolean'],
            'has_wifi' => ['sometimes', 'boolean'],
            'has_parking' => ['sometimes', 'boolean'],
            'has_pool' => ['sometimes', 'boolean'],
            'has_washing_machine' => ['sometimes', 'boolean'],

            // Imagens
            'images.*' => ['image', 'mimes:jpg,jpeg,png', 'max:2048'],
        ]);

        // 1) Cria Propriedade, usando null coalescing para opcionais
        $property = auth()->user()->properties()->create([
            'name' => $validated['name'],
            'address' => $validated['address'],
            'postal_code' => $validated['postal_code'],
            'city' => $validated['city'],
            'district' => $validated['district'] ?? null,
            'country' => $validated['country'],
            'price_per_night' => $validated['price_per_night'],
            'is_visible' => $validated['is_visible'],
            'description' => $validated['description'] ?? null,
        ]);

        // 2) Cria Features + Amenities
        $property->features()->create([
            'bedrooms' => $validated['features']['bedrooms'],
            'bathrooms' => $validated['features']['bathrooms'],
            'max_guests' => $validated['features']['max_guests'],
            'area_m2' => $validated['features']['area_m2'] ?? null,
            'extras' => $validated['features']['extras'] ?? null,
            'has_kitchen' => $validated['has_kitchen'] ?? false,
            'has_air_conditioning' => $validated['has_air_conditioning'] ?? false,
            'has_heating' => $validated['has_heating'] ?? false,
            'has_wifi' => $validated['has_wifi'] ?? false,
            'has_parking' => $validated['has_parking'] ?? false,
            'has_pool' => $validated['has_pool'] ?? false,
            'has_washing_machine' => $validated['has_washing_machine'] ?? false,
        ]);

        // 3) Salva Imagens
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('properties', 'public');
                $property->images()->create([
                    'path' => $path,
                    'order' => $index,
                    'is_cover' => $index === 0,
                ]);
            }
        }

        return redirect()
            ->route('properties.index')
            ->with('success', 'Propriedade criada com sucesso.');
    }


    public function create(): Response
    {
        return Inertia::render('properties/create');
    }
}
