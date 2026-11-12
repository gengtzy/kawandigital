<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\HandlesPublicUploads;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TestimonialRequest;
use App\Models\Testimonial;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    use HandlesPublicUploads;

    public function index(): Response
    {
        return Inertia::render('admin/testimonials/index', [
            'testimonials' => Testimonial::query()->ordered()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/testimonials/form', [
            'testimonial' => null,
        ]);
    }

    public function store(TestimonialRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Testimonial::query()->create([
            'client_name' => $validated['client_name'],
            'business_name' => $validated['business_name'],
            'quote' => $validated['quote'],
            'rating' => (int) $validated['rating'],
            'card_type' => $validated['card_type'],
            'is_active' => $request->boolean('is_active'),
            'sort_order' => (int) $validated['sort_order'],
            'avatar_path' => $this->syncPublicImage($request, 'avatar', 'testimonials', null, 'remove_avatar'),
        ]);

        return redirect()
            ->route('admin.testimonials.index')
            ->with('success', 'Testimoni berhasil ditambahkan.');
    }

    public function edit(Testimonial $testimonial): Response
    {
        return Inertia::render('admin/testimonials/form', [
            'testimonial' => $testimonial,
        ]);
    }

    public function update(TestimonialRequest $request, Testimonial $testimonial): RedirectResponse
    {
        $validated = $request->validated();

        $testimonial->update([
            'client_name' => $validated['client_name'],
            'business_name' => $validated['business_name'],
            'quote' => $validated['quote'],
            'rating' => (int) $validated['rating'],
            'card_type' => $validated['card_type'],
            'is_active' => $request->boolean('is_active'),
            'sort_order' => (int) $validated['sort_order'],
            'avatar_path' => $this->syncPublicImage(
                $request,
                'avatar',
                'testimonials',
                $testimonial->avatar_path,
                'remove_avatar',
            ),
        ]);

        return redirect()
            ->route('admin.testimonials.index')
            ->with('success', 'Testimoni berhasil diperbarui.');
    }

    public function toggleActive(Testimonial $testimonial): RedirectResponse
    {
        $testimonial->update([
            'is_active' => ! $testimonial->is_active,
        ]);

        return redirect()
            ->route('admin.testimonials.index')
            ->with(
                'success',
                $testimonial->is_active
                    ? 'Testimoni diaktifkan dan tampil di halaman utama.'
                    : 'Testimoni disembunyikan dari halaman utama.',
            );
    }

    public function destroy(Testimonial $testimonial): RedirectResponse
    {
        $this->deletePublicImage($testimonial->avatar_path);
        $testimonial->delete();

        return redirect()
            ->route('admin.testimonials.index')
            ->with('success', 'Testimoni berhasil dihapus.');
    }
}

