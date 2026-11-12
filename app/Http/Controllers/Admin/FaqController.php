<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\FaqRequest;
use App\Models\Faq;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/faqs/index', [
            'faqs' => Faq::query()->ordered()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/faqs/form', [
            'faq' => null,
        ]);
    }

    public function store(FaqRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Faq::query()->create([
            'question' => $validated['question'],
            'answer' => $validated['answer'],
            'sort_order' => (int) $validated['sort_order'],
            'is_active' => $request->boolean('is_active'),
        ]);

        return redirect()
            ->route('admin.faqs.index')
            ->with('success', 'FAQ berhasil ditambahkan.');
    }

    public function edit(Faq $faq): Response
    {
        return Inertia::render('admin/faqs/form', [
            'faq' => $faq,
        ]);
    }

    public function update(FaqRequest $request, Faq $faq): RedirectResponse
    {
        $validated = $request->validated();

        $faq->update([
            'question' => $validated['question'],
            'answer' => $validated['answer'],
            'sort_order' => (int) $validated['sort_order'],
            'is_active' => $request->boolean('is_active'),
        ]);

        return redirect()
            ->route('admin.faqs.index')
            ->with('success', 'FAQ berhasil diperbarui.');
    }

    public function toggleActive(Faq $faq): RedirectResponse
    {
        $faq->update([
            'is_active' => ! $faq->is_active,
        ]);

        return redirect()
            ->route('admin.faqs.index')
            ->with(
                'success',
                $faq->is_active
                    ? 'FAQ diaktifkan dan tampil di halaman utama.'
                    : 'FAQ disembunyikan dari halaman utama.',
            );
    }

    public function destroy(Faq $faq): RedirectResponse
    {
        $faq->delete();

        return redirect()
            ->route('admin.faqs.index')
            ->with('success', 'FAQ berhasil dihapus.');
    }
}

