<?php

namespace Database\Seeders;

use App\Models\Property;
use App\Models\PropertyFeature;
use App\Models\PropertyImage;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PropertyDemoSeeder extends Seeder
{
    public function run(): void
    {
        // Utilizador “dono” das propriedades (ajusta o email se quiseres)
        $user = User::query()->first() ?? User::factory()->create([
            'name' => 'Proprietário Demo',
            'email' => 'owner@example.com',
            'password' => bcrypt('password'),
        ]);

        $cities = [
            ['city' => 'Lisboa', 'district' => 'Lisboa'],
            ['city' => 'Porto', 'district' => 'Porto'],
            ['city' => 'Faro', 'district' => 'Faro'],
            ['city' => 'Coimbra', 'district' => 'Coimbra'],
            ['city' => 'Braga', 'district' => 'Braga'],
            ['city' => 'Aveiro', 'district' => 'Aveiro'],
        ];

        // Placeholder PNG 1x1 cinzento (caso não existam imagens locais)
        $placeholderPng = base64_decode(
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='
        );

        // Opcional: coloca imagens reais em resources/seeders/images (jpg/png) para usar em vez do placeholder
        $localImages = [];
        $seedImagesPath = resource_path('seeders/images');
        if (is_dir($seedImagesPath)) {
            foreach (scandir($seedImagesPath) as $f) {
                if (preg_match('/\.(jpe?g|png)$/i', $f)) {
                    $localImages[] = $seedImagesPath . DIRECTORY_SEPARATOR . $f;
                }
            }
        }

        // Gera 12 propriedades demo
        for ($i = 1; $i <= 12; $i++) {
            $pick = $cities[array_rand($cities)];
            $name = fake()->randomElement(['Casa', 'Apartamento', 'Estúdio', 'Villa']) . ' ' .
                fake()->streetName() . ' ' . fake()->randomNumber(2);

            $property = Property::create([
                'user_id' => 2,
                'name' => $name,
                // slug gerado no Model (se tiveres o booted()); caso não, adiciona 'slug' => Str::slug($name)
                'address' => fake()->streetAddress(),
                'postal_code' => fake('pt_PT')->postcode(),
                'city' => $pick['city'],
                'district' => $pick['district'],
                'country' => 'Portugal',
                'price_per_night' => fake()->numberBetween(40, 220),
                'is_visible' => (bool)random_int(0, 1),
                'description' => fake()->paragraph(),
            ]);

            // Features + amenities
            $bedrooms = fake()->numberBetween(1, 4);
            $bathrooms = fake()->numberBetween(1, 3);
            $maxGuests = max(1, $bedrooms * 2);

            $property->features()->create([
                'bedrooms' => $bedrooms,
                'bathrooms' => $bathrooms,
                'max_guests' => $maxGuests,
                'area_m2' => fake()->numberBetween(40, 180),
                'extras' => fake()->boolean() ? 'Varanda com vista' : null,
                'has_kitchen' => (bool)random_int(0, 1),
                'has_air_conditioning' => (bool)random_int(0, 1),
                'has_heating' => (bool)random_int(0, 1),
                'has_wifi' => true,
                'has_parking' => (bool)random_int(0, 1),
                'has_pool' => (bool)random_int(0, 1),
                'has_washing_machine' => (bool)random_int(0, 1),
            ]);

            // Imagens (3 a 5 por propriedade)
            $imagesCount = random_int(3, 5);
            for ($k = 0; $k < $imagesCount; $k++) {
                $path = 'properties/' . Str::uuid()->toString() . '.png';

                if (!empty($localImages)) {
                    // Copia uma imagem local
                    $file = $localImages[array_rand($localImages)];
                    Storage::disk('public')->put($path, file_get_contents($file));
                } else {
                    // Placeholder base64
                    Storage::disk('public')->put($path, $placeholderPng);
                }

                $property->images()->create([
                    'path' => $path,
                    'order' => $k,
                    'is_cover' => $k === 0,
                ]);
            }
        }
    }
}
