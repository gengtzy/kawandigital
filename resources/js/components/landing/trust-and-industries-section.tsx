import { Check } from 'lucide-react';
import Reveal from '@/components/landing/reveal';

const TRUST_REASONS = [
    'Calon pembeli bisa memeriksa rincian layanan sebelum bertanya lewat chat.',
    'Alamat, jam operasional, dan peta Google Maps langsung terlihat tanpa harus bertanya ulang.',
    'Tautan website resmi lebih meyakinkan saat dicantumkan di Google Maps, kartu nama, dan bio media sosial.',
    'Informasi promo, harga terbaru, dan contoh pekerjaan dapat diperbarui kapan saja melalui panel admin.',
] as const;

const INDUSTRIES = [
    'Klinik Kesehatan & Gigi',
    'Kafe & Restoran',
    'Kontraktor & Renovasi',
    'Bengkel & Otomotif',
    'Salon & Barbershop',
    'Konsultan & Kantor Hukum',
    'Lembaga Kursus',
    'Toko Retail & Distributor',
    'Jasa Logistik & Travel',
    'Properti & Arsitek',
] as const;

export default function TrustAndIndustriesSection() {
    return (
        <section
            aria-labelledby="trust-heading"
            className="w-full bg-white py-16 sm:py-20 lg:py-24"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Bagian atas: Reality Check 2 kolom */}
                <Reveal>
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
                        <div className="lg:col-span-6">
                            <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.08em] text-ink-primary uppercase sm:text-xs">
                                <span
                                    aria-hidden="true"
                                    className="h-2 w-2 shrink-0 rounded-full bg-brand-blue"
                                />
                                <span>KEBIASAAN PEMBELI SAAT INI</span>
                            </p>

                            <h2
                                id="trust-heading"
                                className="mt-4 font-bold tracking-[-0.03em] text-ink-primary"
                                style={{
                                    fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
                                    lineHeight: 1.14,
                                }}
                            >
                                Sebelum menghubungi admin, pelanggan mengecek
                                reputasi usaha Anda lebih dulu.
                            </h2>

                            <p className="mt-4 text-base leading-relaxed text-ink-secondary">
                                Di tengah banyak pilihan jasa serupa, usaha
                                dengan informasi jelas dan alamat resmi lebih
                                sering dipilih dibanding akun yang sulit
                                diverifikasi.
                            </p>
                        </div>

                        <div className="lg:col-span-6">
                            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-8">
                                <h3 className="text-lg font-bold tracking-[-0.02em] text-ink-primary">
                                    Alasan website bisnis meningkatkan
                                    kepercayaan
                                </h3>

                                <ul className="mt-5 space-y-4">
                                    {TRUST_REASONS.map((reason) => (
                                        <li
                                            key={reason}
                                            className="flex items-start gap-3 text-sm leading-relaxed text-ink-secondary sm:text-base"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DCE7FF]"
                                            >
                                                <Check className="h-3.5 w-3.5 stroke-[2.5] text-brand-blue" />
                                            </span>
                                            <span className="text-ink-primary">
                                                {reason}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Bagian bawah: 10 Kategori Bisnis Lokal */}
                <Reveal delayMs={100}>
                    <div className="mt-16 border-t border-[#E2E8F0] pt-16 sm:mt-20 sm:pt-20">
                        <div className="mx-auto max-w-2xl text-center">
                            <h3
                                className="font-bold tracking-[-0.03em] text-ink-primary"
                                style={{
                                    fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)',
                                    lineHeight: 1.15,
                                }}
                            >
                                Cocok untuk{' '}
                                <span className="text-brand-blue">
                                    berbagai jenis usaha
                                </span>
                            </h3>
                            <p className="mt-3 text-base leading-relaxed text-ink-secondary">
                                Struktur konten dan tata letak menyesuaikan
                                kebutuhan tiap bidang bisnis lokal.
                            </p>
                        </div>

                        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {INDUSTRIES.map((industry, index) => (
                                <li
                                    key={industry}
                                    className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-soft-slate px-5 py-4"
                                >
                                    <span className="text-sm font-semibold text-ink-primary sm:text-base">
                                        {industry}
                                    </span>
                                    <span className="text-xs font-semibold text-ink-secondary tabular-nums">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
