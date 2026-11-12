<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class PricingPlan extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'price_label',
        'billing_note',
        'description',
        'features',
        'is_highlighted',
        'cta_text',
        'whatsapp_message',
        'sort_order',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'features' => 'array',
            'is_highlighted' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    /**
     * @param  Builder<PricingPlan>  $query
     * @return Builder<PricingPlan>
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }
}

