<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PricingPlanRequest;
use App\Models\PricingPlan;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PricingPlanController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/pricing-plans/index', [
            'pricingPlans' => PricingPlan::query()->ordered()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/pricing-plans/form', [
            'pricingPlan' => null,
        ]);
    }

    public function store(PricingPlanRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        PricingPlan::query()->create([
            'name' => $validated['name'],
            'price_label' => $validated['price_label'],
            'billing_note' => $validated['billing_note'],
            'description' => $validated['description'],
            'features' => $validated['features'],
            'is_highlighted' => $request->boolean('is_highlighted'),
            'cta_text' => $validated['cta_text'],
            'whatsapp_message' => $validated['whatsapp_message'] ?: null,
            'sort_order' => (int) $validated['sort_order'],
        ]);

        return redirect()
            ->route('admin.pricing-plans.index')
            ->with('success', 'Paket harga berhasil ditambahkan.');
    }

    public function edit(PricingPlan $pricingPlan): Response
    {
        return Inertia::render('admin/pricing-plans/form', [
            'pricingPlan' => $pricingPlan,
        ]);
    }

    public function update(PricingPlanRequest $request, PricingPlan $pricingPlan): RedirectResponse
    {
        $validated = $request->validated();

        $pricingPlan->update([
            'name' => $validated['name'],
            'price_label' => $validated['price_label'],
            'billing_note' => $validated['billing_note'],
            'description' => $validated['description'],
            'features' => $validated['features'],
            'is_highlighted' => $request->boolean('is_highlighted'),
            'cta_text' => $validated['cta_text'],
            'whatsapp_message' => $validated['whatsapp_message'] ?: null,
            'sort_order' => (int) $validated['sort_order'],
        ]);

        return redirect()
            ->route('admin.pricing-plans.index')
            ->with('success', 'Paket harga berhasil diperbarui.');
    }

    public function destroy(PricingPlan $pricingPlan): RedirectResponse
    {
        $pricingPlan->delete();

        return redirect()
            ->route('admin.pricing-plans.index')
            ->with('success', 'Paket harga berhasil dihapus.');
    }
}

