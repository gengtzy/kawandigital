import { usePage } from '@inertiajs/react';
import { resolveWhatsAppHref } from '@/lib/whatsapp';
import type { SiteSettings } from '@/types';

type BottomCtaSectionProps = {
    siteSettings?: SiteSettings;
};

export default function BottomCtaSection({
    siteSettings: siteSettingsProp,
}: BottomCtaSectionProps) {
    const { props } = usePage();
    const siteSettings = siteSettingsProp ?? props.siteSettings;
    const whatsappHref = resolveWhatsAppHref(
        siteSettings,
        'Halo kawandigital.id, saya ingin konsultasi gratis untuk website usaha saya.',
    );

    return (
        <section
            aria-labelledby="bottom-cta-heading"
            className="rounded-2xl bg-brand-blue px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-14 lg:py-14"
        >
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                <div className="max-w-2xl">
                    <p className="text-xs font-semibold tracking-[0.08em] text-[#DCE7FF] uppercase">
                        Konsultasi Gratis
                    </p>
                    <h2
                        id="bottom-cta-heading"
                        className="mt-3 font-bold tracking-[-0.03em] text-white"
                        style={{
                            fontSize: 'clamp(1.625rem, 3vw, 2.375rem)',
                            lineHeight: 1.15,
                        }}
                    >
                        Siap merapikan tampilan bisnis Anda di Google dan
                        WhatsApp?
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#DCE7FF] sm:text-base">
                        Ceritakan bidang usaha Anda melalui WhatsApp. Kami bantu
                        rekomendasikan struktur halaman dan paket yang paling
                        sesuai tanpa biaya konsultasi.
                    </p>
                </div>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                    {whatsappHref ? (
                        <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-obsidian transition-all duration-300 hover:-translate-y-1 hover:bg-[#DCE7FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-[#CBD5E1] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                        >
                            Konsultasi Gratis via WA
                        </a>
                    ) : (
                        /* TODO: Sediakan siteSettings.whatsapp_url atau siteSettings.whatsapp_number via HandleInertiaRequests */
                        <button
                            type="button"
                            disabled
                            aria-disabled="true"
                            title="Tautan WhatsApp belum diatur pada siteSettings"
                            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-white/80 px-7 py-3 text-sm font-semibold text-obsidian"
                        >
                            WA Segera Hadir
                        </button>
                    )}

                    <a
                        href="#harga"
                        className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/80 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-white/25 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    >
                        Lihat Paket Harga
                    </a>
                </div>
            </div>
        </section>
    );
}

