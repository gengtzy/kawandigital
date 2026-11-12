import { usePage } from '@inertiajs/react';
import { Check } from 'lucide-react';
import Reveal from '@/components/landing/reveal';
import { resolveWhatsAppHref } from '@/lib/whatsapp';
import type { PricingPlanItem, SiteSettings } from '@/types';

type PricingSectionProps = {
    plans?: PricingPlanItem[];
    siteSettings?: SiteSettings;
};

const DEFAULT_PRICING_PLANS: PricingPlanItem[] = [
    {
        id: 'landing-page',
        name: 'Landing Page',
        price_label: 'Rp 1.490.000',
        billing_note:
            'Sekali bayar, perpanjangan domain & hosting tahunan terpisah',
        description:
            'Cocok untuk promosi satu layanan utama atau profil usaha ringkas yang langsung mengarah ke WhatsApp.',
        features: [
            '1 halaman utama responsif ponsel & laptop',
            'Domain .com / .id & cloud hosting 1 tahun',
            'Sertifikat SSL & tombol WhatsApp cepat',
            'Integrasi Google Maps lokasi usaha',
            'Gratis 2 kali revisi sebelum tayang',
        ],
        is_highlighted: false,
        cta_text: 'Pilih Paket Landing Page',
        whatsapp_message:
            'Halo kawandigital.id, saya tertarik dengan paket Landing Page (Rp 1.490.000).',
    },
    {
        id: 'bisnis-lengkap',
        name: 'Bisnis Lengkap',
        price_label: 'Rp 2.750.000',
        billing_note: 'Paket paling sesuai untuk UMKM & jasa lokal aktif',
        description:
            'Struktur halaman lengkap dengan katalog layanan, portofolio, Google Business Profile, dan panel admin.',
        features: [
            'Halaman profil, layanan, portofolio, & FAQ',
            'Domain, cloud hosting 1 tahun, & sertifikat SSL',
            'Optimasi Google Business Profile & SEO lokal dasar',
            'Panel admin ringan untuk ubah harga & portofolio',
            'Preview desain terlebih dahulu sebelum pelunasan',
        ],
        is_highlighted: true,
        cta_text: 'Pilih Paket Bisnis Lengkap',
        whatsapp_message:
            'Halo kawandigital.id, saya tertarik dengan paket Bisnis Lengkap (Rp 2.750.000).',
    },
    {
        id: 'custom-web',
        name: 'Custom Web',
        price_label: 'Mulai Rp 5.000.000',
        billing_note: 'Estimasi mengikuti kompleksitas kebutuhan usaha',
        description:
            'Untuk perusahaan atau layanan yang membutuhkan halaman multi-kategori, formulir khusus, atau integrasi sistem.',
        features: [
            'Arsitektur halaman & komponen sesuai alur bisnis',
            'Integrasi formulir pemesanan atau jadwal konsultasi',
            'Panel kelola konten multi-kategori terstruktur',
            'Dukungan teknis & panduan penggunaan untuk tim',
            'Jadwal pengerjaan & rincian biaya disepakati di awal',
        ],
        is_highlighted: false,
        cta_text: 'Diskusikan Kebutuhan Custom',
        whatsapp_message:
            'Halo kawandigital.id, saya ingin konsultasi paket Custom Web.',
    },
];

export default function PricingSection({
    plans,
    siteSettings: siteSettingsProp,
}: PricingSectionProps) {
    const { props } = usePage();
    const siteSettings = siteSettingsProp ?? props.siteSettings;
    const activePlans =
        plans && plans.length > 0 ? plans : DEFAULT_PRICING_PLANS;

    return (
        <section
            id="harga"
            aria-labelledby="harga-heading"
            className="w-full bg-obsidian py-16 text-ink-light sm:py-20 lg:py-24"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="inline-flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.08em] text-ink-light uppercase sm:text-xs">
                            <span
                                aria-hidden="true"
                                className="h-2 w-2 shrink-0 rounded-full bg-brand-blue ring-1 ring-white/40"
                            />
                            <span>PAKET HARGA TRANSPARAN</span>
                        </p>

                        <h2
                            id="harga-heading"
                            className="mt-4 font-bold tracking-[-0.03em] text-white"
                            style={{
                                fontSize: 'clamp(1.75rem, 3.2vw, 2.625rem)',
                                lineHeight: 1.12,
                            }}
                        >
                            Satu harga jelas{' '}
                            <span className="text-brand-blue">
                                untuk mulai online.
                            </span>
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#CBD5E1]">
                            Semua biaya disampaikan di awal sebelum pengerjaan
                            dimulai. Anda dapat meninjau preview desain terlebih
                            dahulu sebelum melakukan pelunasan.
                        </p>
                    </div>
                </Reveal>

                <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {activePlans.map((plan, index) => {
                        const whatsappHref = resolveWhatsAppHref(
                            siteSettings,
                            plan.whatsapp_message ??
                                `Halo kawandigital.id, saya tertarik dengan paket ${plan.name} (${plan.price_label}).`,
                        );

                        return (
                            <Reveal
                                key={plan.id}
                                delayMs={index * 90}
                                className="flex"
                            >
                                <article
                                    className={`flex w-full flex-col justify-between rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8 ${
                                        plan.is_highlighted
                                            ? 'border-brand-blue bg-[#0F1624] ring-1 ring-brand-blue'
                                            : 'border-white/15 bg-[#0F1624]'
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="text-xl font-bold tracking-[-0.02em] text-white">
                                                {plan.name}
                                            </h3>
                                            {plan.is_highlighted ? (
                                                <span className="rounded-full bg-[#DCE7FF] px-3 py-1 text-[11px] font-semibold text-brand-blue">
                                                    Rekomendasi Bisnis
                                                </span>
                                            ) : null}
                                        </div>

                                        <p className="mt-4 text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl">
                                            {plan.price_label}
                                        </p>
                                        <p className="mt-1.5 text-xs text-ink-muted">
                                            {plan.billing_note}
                                        </p>

                                        <p className="mt-4 text-sm leading-relaxed text-[#CBD5E1]">
                                            {plan.description}
                                        </p>

                                        <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                                            {plan.features.map((feature) => (
                                                <li
                                                    key={feature}
                                                    className="flex items-start gap-3 text-sm leading-relaxed text-[#CBD5E1]"
                                                >
                                                    <span
                                                        aria-hidden="true"
                                                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DCE7FF]"
                                                    >
                                                        <Check className="h-3.5 w-3.5 stroke-[2.5] text-brand-blue" />
                                                    </span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-8 pt-2">
                                        {whatsappHref ? (
                                            <a
                                                href={whatsappHref}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`inline-flex min-h-[44px] w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
                                                    plan.is_highlighted
                                                        ? 'bg-brand-blue text-white hover:bg-[#1038CC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-[#0D2EA8]'
                                                        : 'bg-white text-obsidian hover:bg-[#DCE7FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue active:bg-[#CBD5E1]'
                                                }`}
                                            >
                                                {plan.cta_text}
                                            </a>
                                        ) : (
                                            /* TODO: Sediakan siteSettings.whatsapp_url atau siteSettings.whatsapp_number via HandleInertiaRequests */
                                            <button
                                                type="button"
                                                disabled
                                                aria-disabled="true"
                                                title="Tautan WhatsApp belum diatur pada siteSettings"
                                                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-white/75 px-6 py-3 text-sm font-semibold text-obsidian"
                                            >
                                                WA Segera Hadir
                                            </button>
                                        )}
                                    </div>
                                </article>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
