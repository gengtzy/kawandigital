<?php

namespace Tests\Feature\Admin;

use App\Models\Faq;
use App\Models\PricingPlan;
use App\Models\Project;
use App\Models\SiteSetting;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_cannot_access_admin_routes(): void
    {
        $this->get(route('admin.projects.index'))->assertRedirect(route('login'));
        $this->get(route('admin.pricing-plans.index'))->assertRedirect(route('login'));
        $this->get(route('admin.testimonials.index'))->assertRedirect(route('login'));
        $this->get(route('admin.faqs.index'))->assertRedirect(route('login'));
        $this->get(route('admin.settings.index'))->assertRedirect(route('login'));
    }

    public function test_dashboard_displays_actual_database_counts(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        Project::query()->create([
            'title' => 'Website Klinik',
            'slug' => 'website-klinik',
            'client_name' => 'Klinik A',
            'category' => 'Kesehatan',
            'year' => '2025',
            'bg_theme' => 'blue',
            'is_featured' => true,
            'sort_order' => 1,
        ]);

        PricingPlan::query()->create([
            'name' => 'Starter',
            'price_label' => 'Rp 1.490.000',
            'billing_note' => 'Sekali bayar',
            'description' => 'Paket awal',
            'features' => ['Desain responsif'],
            'is_highlighted' => false,
            'cta_text' => 'Pilih Starter',
            'sort_order' => 1,
        ]);

        Testimonial::query()->create([
            'client_name' => 'Budi',
            'business_name' => 'Toko Budi',
            'quote' => 'Sangat membantu usaha kami.',
            'rating' => 5,
            'card_type' => 'text',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        Faq::query()->create([
            'question' => 'Berapa lama selesai?',
            'answer' => 'Sekitar 5 hari kerja.',
            'sort_order' => 1,
            'is_active' => true,
        ]);

        $this->get(route('dashboard'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('dashboard')
                ->where('stats.projects_count', 1)
                ->where('stats.featured_projects_count', 1)
                ->where('stats.pricing_plans_count', 1)
                ->where('stats.active_testimonials_count', 1)
                ->where('stats.active_faqs_count', 1),
            );
    }

    public function test_admin_can_crud_projects_with_thumbnail_upload_and_cleanup(): void
    {
        Storage::fake('public');

        $user = User::factory()->create();
        $this->actingAs($user);

        $firstThumb = UploadedFile::fake()->image('klinik.jpg', 800, 500);

        $this->post(route('admin.projects.store'), [
            'title' => 'Website Klinik Gigi Harmoni',
            'slug' => '',
            'client_name' => 'Klinik Harmoni',
            'category' => 'Kesehatan',
            'year' => '2025',
            'bg_theme' => 'blue',
            'live_url' => 'https://harmoni.example.com',
            'is_featured' => true,
            'sort_order' => 1,
            'thumbnail' => $firstThumb,
        ])
            ->assertRedirect(route('admin.projects.index'))
            ->assertSessionHas('success');

        $project = Project::query()->firstOrFail();
        $this->assertSame('website-klinik-gigi-harmoni', $project->slug);
        $this->assertNotNull($project->thumbnail_path);
        Storage::disk('public')->assertExists($project->thumbnail_path);

        $oldPath = $project->thumbnail_path;
        $secondThumb = UploadedFile::fake()->image('klinik-v2.png', 800, 500);

        $this->post(route('admin.projects.update', $project), [
            '_method' => 'put',
            'title' => 'Website Klinik Harmoni Baru',
            'slug' => 'klinik-harmoni-baru',
            'client_name' => 'Klinik Harmoni',
            'category' => 'Kesehatan',
            'year' => '2026',
            'bg_theme' => 'dark',
            'live_url' => '',
            'is_featured' => false,
            'sort_order' => 2,
            'thumbnail' => $secondThumb,
        ])
            ->assertRedirect(route('admin.projects.index'))
            ->assertSessionHas('success');

        $project->refresh();
        $this->assertSame('klinik-harmoni-baru', $project->slug);
        $this->assertFalse($project->is_featured);
        $this->assertNotSame($oldPath, $project->thumbnail_path);
        Storage::disk('public')->assertMissing($oldPath);
        Storage::disk('public')->assertExists($project->thumbnail_path);

        $updatedPath = $project->thumbnail_path;

        $this->delete(route('admin.projects.destroy', $project))
            ->assertRedirect(route('admin.projects.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
        Storage::disk('public')->assertMissing($updatedPath);
    }

    public function test_admin_can_crud_pricing_plans_and_validates_features(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->post(route('admin.pricing-plans.store'), [
            'name' => 'Paket UMKM',
            'price_label' => 'Rp 1.900.000',
            'billing_note' => 'Tahun pertama',
            'description' => 'Cocok untuk usaha jasa lokal.',
            'features' => ['   '],
            'is_highlighted' => false,
            'cta_text' => 'Konsultasi',
            'whatsapp_message' => 'Halo',
            'sort_order' => 1,
        ])->assertSessionHasErrors('features');

        $this->post(route('admin.pricing-plans.store'), [
            'name' => 'Paket Bisnis',
            'price_label' => 'Rp 2.750.000',
            'billing_note' => 'Sekali bayar tahun ke-1',
            'description' => 'Paket lengkap siap online.',
            'features' => ['Domain .com 1 tahun', 'Integrasi WhatsApp', ''],
            'is_highlighted' => true,
            'cta_text' => 'Pilih Paket Bisnis',
            'whatsapp_message' => 'Halo, saya minat Paket Bisnis',
            'sort_order' => 1,
        ])
            ->assertRedirect(route('admin.pricing-plans.index'))
            ->assertSessionHas('success');

        $plan = PricingPlan::query()->firstOrFail();
        $this->assertCount(2, $plan->features);
        $this->assertTrue($plan->is_highlighted);

        $this->put(route('admin.pricing-plans.update', $plan), [
            'name' => 'Paket Bisnis Plus',
            'price_label' => 'Rp 2.950.000',
            'billing_note' => 'Sekali bayar tahun ke-1',
            'description' => 'Diperbarui.',
            'features' => ['Domain .id 1 tahun'],
            'is_highlighted' => false,
            'cta_text' => 'Pilih Bisnis Plus',
            'whatsapp_message' => '',
            'sort_order' => 3,
        ])
            ->assertRedirect(route('admin.pricing-plans.index'))
            ->assertSessionHas('success');

        $plan->refresh();
        $this->assertSame('Paket Bisnis Plus', $plan->name);
        $this->assertSame(['Domain .id 1 tahun'], $plan->features);
        $this->assertFalse($plan->is_highlighted);

        $this->delete(route('admin.pricing-plans.destroy', $plan))
            ->assertRedirect(route('admin.pricing-plans.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseMissing('pricing_plans', ['id' => $plan->id]);
    }

    public function test_admin_can_crud_and_toggle_testimonials_with_avatar(): void
    {
        Storage::fake('public');

        $user = User::factory()->create();
        $this->actingAs($user);

        $avatar = UploadedFile::fake()->image('client.jpg', 200, 200);

        $this->post(route('admin.testimonials.store'), [
            'client_name' => 'Bu Sari',
            'business_name' => 'Katering Sari Rasa',
            'quote' => 'Preview desainnya jelas sebelum kami melunasi.',
            'rating' => 5,
            'card_type' => 'photo',
            'is_active' => true,
            'sort_order' => 1,
            'avatar' => $avatar,
        ])
            ->assertRedirect(route('admin.testimonials.index'))
            ->assertSessionHas('success');

        $testimonial = Testimonial::query()->firstOrFail();
        $this->assertNotNull($testimonial->avatar_path);
        Storage::disk('public')->assertExists($testimonial->avatar_path);

        $this->patch(route('admin.testimonials.toggle-active', $testimonial))
            ->assertRedirect(route('admin.testimonials.index'))
            ->assertSessionHas('success');

        $testimonial->refresh();
        $this->assertFalse($testimonial->is_active);

        $avatarPath = $testimonial->avatar_path;

        $this->delete(route('admin.testimonials.destroy', $testimonial))
            ->assertRedirect(route('admin.testimonials.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseMissing('testimonials', ['id' => $testimonial->id]);
        Storage::disk('public')->assertMissing($avatarPath);
    }

    public function test_admin_can_crud_and_toggle_faqs(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->post(route('admin.faqs.store'), [
            'question' => 'Apakah bisa revisi desain?',
            'answer' => 'Bisa, sebelum website ditayangkan.',
            'sort_order' => 1,
            'is_active' => true,
        ])
            ->assertRedirect(route('admin.faqs.index'))
            ->assertSessionHas('success');

        $faq = Faq::query()->firstOrFail();

        $this->patch(route('admin.faqs.toggle-active', $faq))
            ->assertRedirect(route('admin.faqs.index'))
            ->assertSessionHas('success');

        $faq->refresh();
        $this->assertFalse($faq->is_active);

        $this->put(route('admin.faqs.update', $faq), [
            'question' => 'Apakah revisi dibatasi?',
            'answer' => 'Revisi tata letak fleksibel sebelum domain aktif.',
            'sort_order' => 2,
            'is_active' => true,
        ])
            ->assertRedirect(route('admin.faqs.index'))
            ->assertSessionHas('success');

        $faq->refresh();
        $this->assertSame('Apakah revisi dibatasi?', $faq->question);
        $this->assertTrue($faq->is_active);

        $this->delete(route('admin.faqs.destroy', $faq))
            ->assertRedirect(route('admin.faqs.index'))
            ->assertSessionHas('success');

        $this->assertDatabaseMissing('faqs', ['id' => $faq->id]);
    }

    public function test_admin_can_update_site_settings_and_reflects_on_home(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->put(route('admin.settings.update'), [
            'brand_name' => 'kawandigital.id',
            'whatsapp_number' => '6289999888877',
            'whatsapp_message' => 'Halo tim kawandigital.id!',
            'email' => 'tim@kawandigital.id',
            'address' => 'Surabaya, Jawa Timur',
            'operational_hours' => 'Senin - Jumat, 09.00 - 17.00 WIB',
            'hero_title' => 'Website bisnis rapi, siap online dalam 5 hari.',
            'hero_subtitle' => 'Lihat preview desain terlebih dahulu.',
        ])
            ->assertRedirect(route('admin.settings.index'))
            ->assertSessionHas('success');

        $this->assertSame(
            '6289999888877',
            SiteSetting::query()->where('key', 'whatsapp_number')->value('value'),
        );

        $this->get(route('home'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('siteSettings.whatsapp_number', '6289999888877')
                ->where('siteSettings.email', 'tim@kawandigital.id'),
            );
    }
}

