<?php

namespace App\Http\Requests\Property;

use Illuminate\Foundation\Http\FormRequest;

class PropertyCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
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
        ];
    }
}
