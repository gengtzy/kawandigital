<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SiteSettingRequest;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SiteSettingController extends Controller
{
    /**
     * @var list<string>
     */
    private const MANAGED_KEYS = [
        'brand_name',
        'whatsapp_number',
        'whatsapp_message',
        'email',
        'address',
        'operational_hours',
        'hero_title',
        'hero_subtitle',
    ];

    public function index(): Response
    {
        $stored = SiteSetting::query()
            ->whereIn('key', self::MANAGED_KEYS)
            ->pluck('value', 'key')
            ->all();

        $settings = [];
        foreach (self::MANAGED_KEYS as $key) {
            $settings[$key] = $stored[$key] ?? '';
        }

        return Inertia::render('admin/settings/index', [
            'settings' => $settings,
        ]);
    }

    public function update(SiteSettingRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        foreach (self::MANAGED_KEYS as $key) {
            SiteSetting::query()->updateOrCreate(
                ['key' => $key],
                ['value' => $validated[$key] ?? null],
            );
        }

        return redirect()
            ->route('admin.settings.index')
            ->with('success', 'Pengaturan situs berhasil disimpan.');
    }
}

