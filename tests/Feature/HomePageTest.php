<?php

namespace Tests\Feature;

use App\Models\Faq;
use App\Models\Project;
use App\Models\Testimonial;
use Database\Seeders\KawanDigitalSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class HomePageTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_renders_seeded_landing_data_and_shared_site_settings(): void
    {
        $this->seed(KawanDigitalSeeder::class);

        $response = $this->get(route('home'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('home')
            ->where('siteSettings.brand_name', 'kawandigital.id')
            ->where('siteSettings.whatsapp_number', '6281234567890')
            ->where('siteSettings.email', 'halo@kawandigital.id')
            ->where('siteSettings.address', 'Sidoarjo, Jawa Timur')
            ->has('projects', 5)
            ->has('pricingPlans', 3)
            ->has('testimonials', 4)
            ->has('faqs', 6)
            ->where('pricingPlans.1.name', 'Bisnis Lengkap')
            ->where('pricingPlans.1.is_highlighted', true),
        );
    }

    public function test_home_page_excludes_inactive_or_non_featured_records(): void
    {
        $this->seed(KawanDigitalSeeder::class);

        Project::query()->create([
            'title' => 'Proyek Non-Featured',
            'slug' => 'proyek-non-featured',
            'client_name' => 'Contoh Kategori: Non Featured',
            'category' => 'Lainnya',
            'year' => '2025',
            'bg_theme' => 'light',
            'is_featured' => false,
            'sort_order' => 99,
        ]);

        Testimonial::query()->create([
            'client_name' => '[REAL DATA: Nonaktif]',
            'business_name' => '[REAL DATA: Nonaktif]',
            'quote' => '[REAL DATA: Tidak tampil]',
            'rating' => 5,
            'card_type' => 'text',
            'is_active' => false,
            'sort_order' => 99,
        ]);

        Faq::query()->create([
            'question' => 'Pertanyaan nonaktif',
            'answer' => 'Tidak boleh tampil',
            'sort_order' => 99,
            'is_active' => false,
        ]);

        $response = $this->get(route('home'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('home')
            ->has('projects', 5)
            ->has('testimonials', 4)
            ->has('faqs', 6),
        );
    }
}

