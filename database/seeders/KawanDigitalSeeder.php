<?php

namespace Database\Seeders;

use App\Models\Faq;
use App\Models\PricingPlan;
use App\Models\Project;
use App\Models\SiteSetting;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class KawanDigitalSeeder extends Seeder
{
    /**
     * Seed initial content for kawandigital.id landing page.
     */
    public function run(): void
    {
        $this->seedSiteSettings();
        $this->seedPricingPlans();
        $this->seedProjects();
        $this->seedTestimonials();
        $this->seedFaqs();
    }

    private function seedSiteSettings(): void
    {
        $settings = [
            'brand_name' => 'kawandigital.id',
            'whatsapp_number' => '6281234567890',
            'whatsapp_message' => 'Halo kawandigital.id, saya ingin konsultasi pembuatan website untuk usaha saya.',
            'email' => 'halo@kawandigital.id',
            'address' => 'Sidoarjo, Jawa Timur',
            'operational_hours' => 'Senin - Sabtu, 08.00 - 17.00 WIB',
            'hero_title' => 'Website profesional untuk bisnis Anda, siap online dalam 5 hari.',
            'hero_subtitle' => 'Anda bisa melihat preview desain website terlebih dahulu sebelum pelunasan. Alur pengerjaan jelas, materi dikirim lewat WhatsApp, dan tim kami siapkan hingga tayang.',
        ];

        foreach ($settings as $key => $value) {
            SiteSetting::query()->updateOrCreate(
                ['key' => $key],
                ['value' => $value],
            );
        }
    }

    private function seedPricingPlans(): void
    {
        $plans = [
            [
                'name' => 'Landing Page',
                'price_label' => 'Rp 1.490.000',
                'billing_note' => 'Sekali bayar, perpanjangan domain & hosting tahunan terpisah',
                'description' => 'Cocok untuk promosi satu layanan utama atau profil usaha ringkas yang langsung mengarah ke WhatsApp.',
                'features' => [
                    '1 halaman utama responsif ponsel & laptop',
                    'Domain .com / .id & cloud hosting 1 tahun',
                    'Sertifikat SSL & tombol WhatsApp cepat',
                    'Integrasi Google Maps lokasi usaha',
                    'Gratis 2 kali revisi sebelum tayang',
                ],
                'is_highlighted' => false,
                'cta_text' => 'Pilih Paket Landing Page',
                'whatsapp_message' => 'Halo kawandigital.id, saya tertarik dengan paket Landing Page (Rp 1.490.000).',
                'sort_order' => 1,
            ],
            [
                'name' => 'Bisnis Lengkap',
                'price_label' => 'Rp 2.750.000',
                'billing_note' => 'Paket paling sesuai untuk UMKM & jasa lokal aktif',
                'description' => 'Struktur halaman lengkap dengan katalog layanan, portofolio, Google Business Profile, dan panel admin.',
                'features' => [
                    'Halaman profil, layanan, portofolio, & FAQ',
                    'Domain, cloud hosting 1 tahun, & sertifikat SSL',
                    'Optimasi Google Business Profile & SEO lokal dasar',
                    'Panel admin ringan untuk ubah harga & portofolio',
                    'Preview desain terlebih dahulu sebelum pelunasan',
                ],
                'is_highlighted' => true,
                'cta_text' => 'Pilih Paket Bisnis Lengkap',
                'whatsapp_message' => 'Halo kawandigital.id, saya tertarik dengan paket Bisnis Lengkap (Rp 2.750.000).',
                'sort_order' => 2,
            ],
            [
                'name' => 'Custom Web',
                'price_label' => 'Mulai Rp 5.000.000',
                'billing_note' => 'Estimasi mengikuti kompleksitas kebutuhan usaha',
                'description' => 'Untuk perusahaan atau layanan yang membutuhkan halaman multi-kategori, formulir khusus, atau integrasi sistem.',
                'features' => [
                    'Arsitektur halaman & komponen sesuai alur bisnis',
                    'Integrasi formulir pemesanan atau jadwal konsultasi',
                    'Panel kelola konten multi-kategori terstruktur',
                    'Dukungan teknis & panduan penggunaan untuk tim',
                    'Jadwal pengerjaan & rincian biaya disepakati di awal',
                ],
                'is_highlighted' => false,
                'cta_text' => 'Diskusikan Kebutuhan Custom',
                'whatsapp_message' => 'Halo kawandigital.id, saya ingin konsultasi paket Custom Web.',
                'sort_order' => 3,
            ],
        ];

        foreach ($plans as $plan) {
            PricingPlan::query()->updateOrCreate(
                ['name' => $plan['name']],
                $plan,
            );
        }
    }

    private function seedProjects(): void
    {
        $projects = [
            [
                'title' => 'Contoh Tata Letak Website Klinik Gigi',
                'slug' => 'contoh-tata-letak-klinik-gigi',
                'client_name' => 'Contoh Kategori: Klinik Kesehatan & Gigi',
                'category' => 'Kesehatan & Klinik',
                'year' => '2025',
                'thumbnail_path' => null,
                'bg_theme' => 'blue',
                'live_url' => null,
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Contoh Tata Letak Website Kafe & Restoran',
                'slug' => 'contoh-tata-letak-kafe-restoran',
                'client_name' => 'Contoh Kategori: Kuliner & F&B Lokal',
                'category' => 'Kuliner & Kafe',
                'year' => '2025',
                'thumbnail_path' => null,
                'bg_theme' => 'dark',
                'live_url' => null,
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Contoh Tata Letak Website Kontraktor & Renovasi',
                'slug' => 'contoh-tata-letak-kontraktor-renovasi',
                'client_name' => 'Contoh Kategori: Jasa Konstruksi & Interior',
                'category' => 'Kontraktor & Renovasi',
                'year' => '2025',
                'thumbnail_path' => null,
                'bg_theme' => 'light',
                'live_url' => null,
                'is_featured' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Contoh Tata Letak Website Konsultan & Kantor Hukum',
                'slug' => 'contoh-tata-letak-konsultan-hukum',
                'client_name' => 'Contoh Kategori: Jasa Profesional',
                'category' => 'Konsultan & Legal',
                'year' => '2025',
                'thumbnail_path' => null,
                'bg_theme' => 'dark',
                'live_url' => null,
                'is_featured' => true,
                'sort_order' => 4,
            ],
            [
                'title' => 'Contoh Tata Letak Katalog Toko Bahan Bangunan',
                'slug' => 'contoh-tata-letak-toko-bangunan',
                'client_name' => 'Contoh Kategori: Retail & Distributor Lokal',
                'category' => 'Toko Retail & Material',
                'year' => '2025',
                'thumbnail_path' => null,
                'bg_theme' => 'blue',
                'live_url' => null,
                'is_featured' => true,
                'sort_order' => 5,
            ],
        ];

        foreach ($projects as $project) {
            Project::query()->updateOrCreate(
                ['slug' => $project['slug']],
                $project,
            );
        }
    }

    private function seedTestimonials(): void
    {
        $testimonials = [
            [
                'client_name' => '[REAL DATA: Pemilik Klinik Gigi]',
                'business_name' => '[REAL DATA: Kategori Klinik Kesehatan & Gigi]',
                'quote' => '[REAL DATA: Ulasan klien terverifikasi untuk kategori klinik gigi akan diperbarui melalui panel admin.]',
                'rating' => 5,
                'avatar_path' => null,
                'card_type' => 'photo',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'client_name' => '[REAL DATA: Pemilik Kafe Lokal]',
                'business_name' => '[REAL DATA: Kategori Kafe & Restoran]',
                'quote' => '[REAL DATA: Ulasan klien terverifikasi untuk kategori kafe dan restoran akan diperbarui melalui panel admin.]',
                'rating' => 5,
                'avatar_path' => null,
                'card_type' => 'text',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'client_name' => '[REAL DATA: Pengelola Jasa Kontraktor]',
                'business_name' => '[REAL DATA: Kategori Kontraktor & Renovasi]',
                'quote' => '[REAL DATA: Ulasan klien terverifikasi untuk kategori kontraktor dan renovasi akan diperbarui melalui panel admin.]',
                'rating' => 5,
                'avatar_path' => null,
                'card_type' => 'photo',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'client_name' => '[REAL DATA: Pemilik Toko Bahan Bangunan]',
                'business_name' => '[REAL DATA: Kategori Toko Bahan Bangunan]',
                'quote' => '[REAL DATA: Ulasan klien terverifikasi untuk kategori toko bahan bangunan akan diperbarui melalui panel admin.]',
                'rating' => 5,
                'avatar_path' => null,
                'card_type' => 'text',
                'is_active' => true,
                'sort_order' => 4,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::query()->updateOrCreate(
                ['sort_order' => $testimonial['sort_order']],
                $testimonial,
            );
        }
    }

    private function seedFaqs(): void
    {
        $faqs = [
            [
                'question' => 'Berapa lama waktu pengerjaan hingga website aktif?',
                'answer' => 'Untuk paket Landing Page dan Bisnis Lengkap, estimasi pengerjaan adalah 5 hari kerja sejak seluruh materi profil usaha, daftar layanan, dan foto kami terima melalui WhatsApp.',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'question' => 'Bagaimana sistem preview desain sebelum pelunasan?',
                'answer' => 'Kami menyusun draf desain terlebih dahulu dan mengirimkan tautan preview agar Anda dapat memeriksa tampilan serta teks halaman sebelum melakukan pelunasan penuh.',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'question' => 'Berapa batas revisi yang termasuk dalam paket?',
                'answer' => 'Setiap paket menyertakan hingga 2 kali sesi revisi terstruktur untuk penyesuaian teks layanan, susunan foto, maupun detail kontak sebelum domain dihubungkan secara aktif.',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'question' => 'Apakah domain website menjadi milik usaha saya?',
                'answer' => 'Ya. Domain didaftarkan atas identitas usaha Anda, dan seluruh akses panel admin diserahkan setelah website siap tayang.',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'question' => 'Bagaimana biaya perpanjangan domain dan hosting di tahun berikutnya?',
                'answer' => 'Tahun pertama sudah termasuk domain (.com atau .id), cloud hosting, dan sertifikat SSL. Mulai tahun kedua, Anda hanya membayar biaya perpanjangan tahunan domain dan hosting sesuai rincian yang disampaikan sejak awal.',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'question' => 'Apakah saya bisa mengubah harga dan portofolio sendiri setelah tayang?',
                'answer' => 'Bisa. Anda akan mendapatkan akses ke panel admin ringan untuk memperbarui daftar harga, menambah portofolio proyek, mengubah nomor WhatsApp, serta mengatur FAQ secara mandiri.',
                'sort_order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::query()->updateOrCreate(
                ['question' => $faq['question']],
                $faq,
            );
        }
    }
}

