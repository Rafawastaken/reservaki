<?php

namespace App\Http\Controllers;

use App\Http\Requests\Property\PropertyCreateRequest;
use App\Models\Property;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PropertyController extends Controller
{
    public function index(): Response
    {
        $properties = auth()->user()->properties()->with(['features', 'images'])->orderBy('created_at', 'desc')->get();
        return Inertia::render('properties/index', ["properties" => $properties]);
    }

    public function store(PropertyCreateRequest $request): RedirectResponse
    {
        $validated = $request->validated();

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

        return to_route('properties.index')->with('success', 'Propriedade criada com sucesso.');
    }

    public function create(): Response
    {
        return Inertia::render('properties/create');
    }

    public function destroy(Property $property): RedirectResponse
    {
        // 1) Apaga os ficheiros do disco "public"
        foreach ($property->images as $image) {
            Storage::disk('public')->delete($image->path);
        }

        // 2) Apaga os registos em cascata
        $property->images()->delete();
        $property->features()->delete();

        // 3) Apaga a propriedade
        $property->delete();

        return to_route('properties.index')
            ->with('success', 'Propriedade removida com sucesso.');
    }

}
