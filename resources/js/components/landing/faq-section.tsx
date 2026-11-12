import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Reveal from '@/components/landing/reveal';
import type { FaqItem } from '@/types';

type FaqSectionProps = {
    faqs?: FaqItem[];
};

const DEFAULT_FAQS: FaqItem[] = [
    {
        id: 'waktu-pengerjaan',
        question: 'Berapa lama waktu pengerjaan hingga website aktif?',
        answer: 'Untuk paket Landing Page dan Bisnis Lengkap, estimasi pengerjaan adalah 5 hari kerja sejak seluruh materi profil usaha, daftar layanan, dan foto kami terima.',
    },
    {
        id: 'preview-dan-pembayaran',
        question: 'Bagaimana sistem pembayaran dan preview desainnya?',
        answer: 'Kami menyusun draf desain terlebih dahulu agar Anda dapat melihat tampilan website melalui tautan preview sebelum pelunasan penuh.',
    },
    {
        id: 'revisi-desain',
        question: 'Apakah saya bisa meminta revisi teks atau tata letak?',
        answer: 'Bisa. Setiap paket menyertakan sesi review dan revisi sebelum domain dihubungkan, sehingga teks layanan, foto, dan tombol WhatsApp sesuai dengan usaha Anda.',
    },
    {
        id: 'kepemilikan-domain',
        question: 'Apakah domain dan akun website menjadi milik usaha saya?',
        answer: 'Ya, domain didaftarkan untuk identitas bisnis Anda dan seluruh akses panel admin ringan diserahkan setelah website tayang.',
    },
    {
        id: 'biaya-perpanjangan',
        question: 'Berapa biaya perpanjangan di tahun berikutnya?',
        answer: 'Tahun pertama sudah termasuk domain .com/.id, cloud hosting, dan sertifikat SSL. Mulai tahun kedua, biaya perpanjangan mengikuti tarif domain dan hosting tahunan yang diinformasikan secara terbuka sejak awal.',
    },
    {
        id: 'kelola-konten',
        question: 'Apakah harga atau portofolio bisa saya ubah sendiri nanti?',
        answer: 'Bisa. Anda mendapat akses panel admin ringan untuk memperbarui daftar harga, menambah foto portofolio, maupun mengganti nomor WhatsApp tanpa perlu menyentuh kode.',
    },
];

export default function FaqSection({ faqs }: FaqSectionProps) {
    const activeFaqs = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS;
    const [openId, setOpenId] = useState<FaqItem['id'] | null>(
        activeFaqs[0]?.id ?? null,
    );

    return (
        <section
            id="faq"
            aria-labelledby="faq-heading"
            className="w-full bg-white py-16 sm:py-20 lg:py-24"
        >
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <div className="text-center">
                        <p className="inline-flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.08em] text-ink-primary uppercase sm:text-xs">
                            <span
                                aria-hidden="true"
                                className="h-2 w-2 shrink-0 rounded-full bg-brand-blue"
                            />
                            <span>PERTANYAAN UMUM</span>
                        </p>

                        <h2
                            id="faq-heading"
                            className="mt-4 font-bold tracking-[-0.03em] text-ink-primary"
                            style={{
                                fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
                                lineHeight: 1.12,
                            }}
                        >
                            Hal yang sering ditanyakan{' '}
                            <span className="text-brand-blue">
                                sebelum mulai.
                            </span>
                        </h2>
                    </div>
                </Reveal>

                <Reveal delayMs={80}>
                    <div className="mt-10 space-y-3">
                        {activeFaqs.map((faq) => {
                            const isOpen = openId === faq.id;
                            const buttonId = `faq-trigger-${faq.id}`;
                            const panelId = `faq-panel-${faq.id}`;

                            return (
                                <div
                                    key={faq.id}
                                    className="rounded-lg bg-[#F4F6F9]"
                                >
                                    <h3>
                                        <button
                                            id={buttonId}
                                            type="button"
                                            aria-expanded={isOpen}
                                            aria-controls={panelId}
                                            onClick={() =>
                                                setOpenId(
                                                    isOpen ? null : faq.id,
                                                )
                                            }
                                            className="flex min-h-[52px] w-full items-center justify-between gap-4 rounded-lg px-5 py-4 text-left text-sm font-semibold text-ink-primary transition-colors hover:bg-[#EBF0F6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:px-6 sm:text-base"
                                        >
                                            <span>{faq.question}</span>
                                            <ChevronDown
                                                aria-hidden="true"
                                                className={`h-5 w-5 shrink-0 text-ink-primary transition-transform duration-200 motion-reduce:transition-none ${
                                                    isOpen ? 'rotate-180' : ''
                                                }`}
                                            />
                                        </button>
                                    </h3>

                                    <div
                                        id={panelId}
                                        role="region"
                                        aria-labelledby={buttonId}
                                        hidden={!isOpen}
                                        className="px-5 pb-5 text-sm leading-relaxed text-ink-secondary sm:px-6 sm:text-base"
                                    >
                                        {faq.answer}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

