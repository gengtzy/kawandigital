import { usePage } from '@inertiajs/react';
import { resolveWhatsAppHref } from '@/lib/whatsapp';
import type { SiteSettings } from '@/types';

type HeroSectionProps = {
    siteSettings?: SiteSettings;
};

type ClientCategoryCard = {
    initials: string;
    category: string;
    scope: string;
    positionClass: string;
};

const CLIENT_CATEGORY_CARDS: readonly ClientCategoryCard[] = [
    {
        initials: 'KG',
        category: 'Klinik Gigi',
        scope: 'Profil layanan & jadwal praktik',
        positionClass: 'top-8 left-0',
    },
    {
        initials: 'KR',
        category: 'Kafe & Resto',
        scope: 'Daftar menu & peta lokasi',
        positionClass: 'bottom-6 left-4',
    },
    {
        initials: 'JR',
        category: 'Jasa Renovasi',
        scope: 'Galeri hasil kerja & kontak WA',
        positionClass: 'top-6 right-0',
    },
    {
        initials: 'TR',
        category: 'Toko Retail',
        scope: 'Katalog produk & jam operasional',
        positionClass: 'bottom-8 right-4',
    },
];

const INCLUDED_ITEMS = [
    'Domain bisnis',
    'Cloud hosting 1 tahun',
    'Sertifikat SSL',
    'Google Business Profile',
] as const;

export default function HeroSection({
    siteSettings: siteSettingsProp,
}: HeroSectionProps) {
    const { props } = usePage();
    const siteSettings = siteSettingsProp ?? props.siteSettings;
    const whatsappHref = resolveWhatsAppHref(
        siteSettings,
        'Halo kawandigital.id, saya ingin tanya pembuatan website bisnis.',
    );

    return (
        <section
            aria-labelledby="hero-heading"
            className="relative w-full overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-28"
            style={{
                background: 'linear-gradient(180deg, #DCE7FF 0%, #FFFFFF 100%)',
            }}
        >
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Kartu kategori klien di area whitespace kiri-kanan pada layar desktop lebar (xl+) */}
                <div aria-hidden="true" className="hidden xl:block">
                    {CLIENT_CATEGORY_CARDS.map((card) => (
                        <div
                            key={card.category}
                            className={`absolute ${card.positionClass} w-52 rounded-2xl border border-[#CBD5E1] bg-white/95 p-3.5 shadow-sm`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-obsidian text-xs font-bold tracking-tight text-white">
                                    {card.initials}
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-ink-primary">
                                        {card.category}
                                    </p>
                                    <p className="truncate text-xs text-ink-secondary">
                                        {card.scope}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mx-auto max-w-3xl text-center">
                    <p className="inline-flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.08em] text-ink-primary uppercase sm:text-xs">
                        <span
                            aria-hidden="true"
                            className="h-2 w-2 shrink-0 rounded-full bg-brand-blue"
                        />
                        <span>JASA PEMBUATAN WEBSITE BISNIS</span>
                    </p>

                    <h1
                        id="hero-heading"
                        className="mt-5 font-bold tracking-[-0.03em] text-ink-primary"
                        style={{
                            fontSize: 'clamp(2.125rem, 4.6vw, 3.625rem)',
                            lineHeight: 1.12,
                        }}
                    >
                        Website profesional untuk bisnis Anda,{' '}
                        <span className="text-brand-blue">
                            siap online dalam 5 hari.
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#334155] sm:text-lg">
                        Anda bisa melihat preview desain website terlebih dahulu
                        sebelum pelunasan. Alur pengerjaan jelas, materi dikirim
                        lewat WhatsApp, dan tim kami siapkan hingga tayang.
                    </p>

                    <ul
                        aria-label="Cakupan layanan yang disertakan"
                        className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-ink-secondary sm:text-sm"
                    >
                        {INCLUDED_ITEMS.map((item, index) => (
                            <li
                                key={item}
                                className="inline-flex items-center gap-2"
                            >
                                {index > 0 ? (
                                    <span
                                        aria-hidden="true"
                                        className="hidden h-1 w-1 rounded-full bg-[#64748B] sm:inline-block"
                                    />
                                ) : null}
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
                        {whatsappHref ? (
                            <a
                                href={whatsappHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-obsidian px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1E293B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue active:bg-[#0F172A]"
                            >
                                Tanya via WhatsApp
                            </a>
                        ) : (
                            /* TODO: Sediakan siteSettings.whatsapp_url atau siteSettings.whatsapp_number via HandleInertiaRequests */
                            <button
                                type="button"
                                disabled
                                aria-disabled="true"
                                title="Tautan WhatsApp belum diatur pada siteSettings"
                                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-obsidian/70 px-7 py-3 text-sm font-semibold text-white"
                            >
                                WA Segera Hadir
                            </button>
                        )}

                        {/* TODO: Pastikan section id="portofolio" ditambahkan pada tahap selanjutnya */}
                        <a
                            href="#portofolio"
                            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#64748B] bg-white px-7 py-3 text-sm font-semibold text-ink-primary transition-colors hover:border-ink-primary hover:bg-soft-slate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue active:bg-[#E2E8F0]"
                        >
                            Lihat Contoh Website
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

