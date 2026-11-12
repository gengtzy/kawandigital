<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class PricingPlanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $rawFeatures = $this->input('features');

        if (is_array($rawFeatures)) {
            $cleaned = array_values(array_filter(
                array_map(static fn ($item) => is_string($item) ? trim($item) : '', $rawFeatures),
                static fn (string $item) => $item !== '',
            ));

            $this->merge(['features' => $cleaned]);
        }
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:120'],
            'price_label' => ['required', 'string', 'max:80'],
            'billing_note' => ['required', 'string', 'max:120'],
            'description' => ['required', 'string', 'max:500'],
            'features' => ['required', 'array', 'min:1'],
            'features.*' => ['required', 'string', 'max:200'],
            'is_highlighted' => ['required', 'boolean'],
            'cta_text' => ['required', 'string', 'max:80'],
            'whatsapp_message' => ['nullable', 'string', 'max:500'],
            'sort_order' => ['required', 'integer', 'min:0', 'max:9999'],
        ];
    }
}

