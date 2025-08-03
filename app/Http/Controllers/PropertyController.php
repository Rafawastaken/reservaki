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
        $properties = auth()->user()->properties()->with(['features', 'images'])->get();
        return Inertia::render('properties/index', ["properties" => $properties]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string'],
            'postal_code' => ['required', 'string'],
            'city' => ['required', 'string'],
            'district' => ['nullable', 'string'],
            'price_per_night' => ['required', 'numeric', 'min:0'],
            'description' => ['nullable', 'string'],
            'features.bedrooms' => ['required', 'integer', 'min:0'],
            'features.bathrooms' => ['required', 'integer', 'min:0'],
            'features.max_guests' => ['required', 'integer', 'min:1'],
            'features.*' => ['boolean'],
            'images.*' => ['image', 'mimes:jpg,jpeg,png', 'max:2048'],
        ]);

        $property = auth()->user()->properties()->create($validated);
        $property->features()->create($request->input('features'));

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

        return redirect()->route('properties.index')->with('success', 'Propriedade criada com sucesso.');
    }

    public function create(): Response
    {
        return Inertia::render('properties/create');
    }
}
