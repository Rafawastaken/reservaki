<?php

namespace App\Http\Controllers;

use App\Http\Requests\Property\PropertyCreateRequest;
use App\Http\Requests\Property\PropertyUpdateRequest;
use App\Models\Property;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class PropertyController extends Controller
{
    public function index(): Response
    {
        $properties = auth()->user()->properties()->with(['features', 'images'])->orderBy('created_at', 'desc')->get();
        return Inertia::render('properties/index', ["properties" => $properties]);
    }

    public function destroy(Property $property): RedirectResponse
    {
        abort_if($property->user_id !== auth()->id(), 403);

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

    public function toggleActive(Property $property): RedirectResponse
    {
        abort_if($property->user_id !== auth()->id(), 403);
        $property->is_visible = !$property->is_visible;
        $property->save();
        return to_route('properties.index')->with('success', 'Propriedade atualizada com sucesso.');
    }

    public function edit(Property $property): Response
    {
        abort_if($property->user_id !== auth()->id(), 403);

        $property->load(['features', 'images' => fn($q) => $q->orderBy('order')]);

        // prepara urls de imagem
        $images = $property->images->map(fn($img) => [
            'id' => $img->id,
            'url' => Storage::disk('public')->url($img->path),
            'is_cover' => (bool)$img->is_cover,
            'order' => $img->order,
        ]);

        return Inertia::render('properties/edit', [
            'property' => [
                'id' => $property->id,
                'name' => $property->name,
                'address' => $property->address,
                'postal_code' => $property->postal_code,
                'city' => $property->city,
                'district' => $property->district,
                'country' => $property->country,
                'price_per_night' => $property->price_per_night,
                'is_visible' => (bool)$property->is_visible,
                'description' => $property->description,
                'features' => [
                    'bedrooms' => $property->features->bedrooms,
                    'bathrooms' => $property->features->bathrooms,
                    'max_guests' => $property->features->max_guests,
                    'area_m2' => $property->features->area_m2,
                    'extras' => $property->features->extras,
                ],
                // amenities diretas no payload
                'has_kitchen' => (bool)$property->features->has_kitchen,
                'has_air_conditioning' => (bool)$property->features->has_air_conditioning,
                'has_heating' => (bool)$property->features->has_heating,
                'has_wifi' => (bool)$property->features->has_wifi,
                'has_parking' => (bool)$property->features->has_parking,
                'has_pool' => (bool)$property->features->has_pool,
                'has_washing_machine' => (bool)$property->features->has_washing_machine,

                'images' => $images,
            ],
        ]);
    }

    public function update(PropertyUpdateRequest $request, Property $property): RedirectResponse
    {
        abort_if($property->user_id !== auth()->id(), 403);

        $data = $request->validated();

        DB::transaction(function () use ($property, $data, $request) {
            // 1) Atualiza campos da propriedade
            $property->fill([
                'name' => $data['name'] ?? $property->name,
                'address' => $data['address'] ?? $property->address,
                'postal_code' => $data['postal_code'] ?? $property->postal_code,
                'city' => $data['city'] ?? $property->city,
                'district' => $data['district'] ?? $property->district,
                'country' => $data['country'] ?? $property->country,
                'price_per_night' => $data['price_per_night'] ?? $property->price_per_night,
                'is_visible' => $data['is_visible'] ?? $property->is_visible,
                'description' => $data['description'] ?? $property->description,
            ])->save();

            // 2) Atualiza features + amenities
            $features = $property->features;
            $features->fill([
                'bedrooms' => data_get($data, 'features.bedrooms', $features->bedrooms),
                'bathrooms' => data_get($data, 'features.bathrooms', $features->bathrooms),
                'max_guests' => data_get($data, 'features.max_guests', $features->max_guests),
                'area_m2' => data_get($data, 'features.area_m2', $features->area_m2),
                'extras' => data_get($data, 'features.extras', $features->extras),

                'has_kitchen' => $data['has_kitchen'] ?? $features->has_kitchen,
                'has_air_conditioning' => $data['has_air_conditioning'] ?? $features->has_air_conditioning,
                'has_heating' => $data['has_heating'] ?? $features->has_heating,
                'has_wifi' => $data['has_wifi'] ?? $features->has_wifi,
                'has_parking' => $data['has_parking'] ?? $features->has_parking,
                'has_pool' => $data['has_pool'] ?? $features->has_pool,
                'has_washing_machine' => $data['has_washing_machine'] ?? $features->has_washing_machine,
            ])->save();

            // 3) Remoção de imagens existentes
            $toDelete = $data['deleted_image_ids'] ?? [];
            if (!empty($toDelete)) {
                $imgs = $property->images()->whereIn('id', $toDelete)->get();
                foreach ($imgs as $img) {
                    Storage::disk('public')->delete($img->path);
                }
                $property->images()->whereIn('id', $toDelete)->delete();
            }

            // 4) Upload de novas imagens (mantém ordem contínua)
            $nextOrder = (int)$property->images()->max('order') + 1;
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $idx => $image) {
                    $path = $image->store('properties', 'public');
                    $property->images()->create([
                        'path' => $path,
                        'order' => $nextOrder + $idx,
                        'is_cover' => false,
                    ]);
                }
            }

            // 5) Definir capa
            // se veio cover_image_id, marca-a; senão, se não houver nenhuma capa, define a de menor order
            if (array_key_exists('cover_image_id', $data)) {
                $property->images()->update(['is_cover' => false]);

                $coverId = $data['cover_image_id'];
                if (!empty($coverId)) {
                    $property->images()->where('id', $coverId)->update(['is_cover' => true]);
                } else {
                    // fallback: primeira por ordem
                    $first = $property->images()->orderBy('order')->first();
                    if ($first) $first->update(['is_cover' => true]);
                }
            } else {
                if (!$property->images()->where('is_cover', true)->exists()) {
                    $first = $property->images()->orderBy('order')->first();
                    if ($first) $first->update(['is_cover' => true]);
                }
            }
        });

        return to_route('properties.index')->with('success', 'Propriedade atualizada com sucesso.');
    }

    public function store(PropertyCreateRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $base = Str::slug($validated['name']);
        $slug = $base;
        $i = 1;

        while (Property::query()->where('slug', '=', $slug)->exists()) {
            $slug = $base . '-' . $i;
            $i++;
        }

        // 1) Cria Propriedade, usando null coalescing para opcionais
        $property = auth()->user()->properties()->create([
            'name' => $validated['name'],
            'slug' => $slug,
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

}
