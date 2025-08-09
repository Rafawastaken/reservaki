<?php

namespace App\Http\Requests\Property;

use Illuminate\Foundation\Http\FormRequest;

class PropertyUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'address' => ['sometimes', 'string'],
            'postal_code' => ['sometimes', 'string'],
            'city' => ['sometimes', 'string'],
            'district' => ['nullable', 'string'],
            'country' => ['sometimes', 'string'],
            'price_per_night' => ['sometimes', 'numeric', 'min:0'],
            'is_visible' => ['sometimes', 'boolean'],
            'description' => ['nullable', 'string'],

            'features.bedrooms' => ['sometimes', 'integer', 'min:0'],
            'features.bathrooms' => ['sometimes', 'integer', 'min:0'],
            'features.max_guests' => ['sometimes', 'integer', 'min:1'],
            'features.area_m2' => ['nullable', 'integer', 'min:0'],
            'features.extras' => ['nullable', 'string'],

            'has_kitchen' => ['sometimes', 'boolean'],
            'has_air_conditioning' => ['sometimes', 'boolean'],
            'has_heating' => ['sometimes', 'boolean'],
            'has_wifi' => ['sometimes', 'boolean'],
            'has_parking' => ['sometimes', 'boolean'],
            'has_pool' => ['sometimes', 'boolean'],
            'has_washing_machine' => ['sometimes', 'boolean'],

            // imagens novas (opcional)
            'images.*' => ['image', 'mimes:jpg,jpeg,png', 'max:2048'],

            // ids de imagens existentes a remover
            'deleted_image_ids' => ['array'],
            'deleted_image_ids.*' => ['integer'],

            // capa (id de imagem existente OU null)
            'cover_image_id' => ['nullable', 'integer'],
        ];
    }
}
