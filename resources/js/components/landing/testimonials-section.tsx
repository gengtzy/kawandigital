import { Star } from 'lucide-react';
import Reveal from '@/components/landing/reveal';
import { resolveStorageUrl } from '@/lib/storage';
import type { TestimonialItem } from '@/types';

type TestimonialsSectionProps = {
    testimonials?: TestimonialItem[];
};

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
    {
        id: 'placeholder-1',
        client_name: '[REAL DATA: Nama Pemilik Usaha]',
        business_name: '[REAL DATA: Klinik / Jasa Lokal]',
        quote: '[REAL DATA: Ulasan klien terverifikasi akan tampil setelah data testimoni ditambahkan melalui panel admin.]',
        rating: 5,
        card_type: 'photo',
    },
    {
        id: 'placeholder-2',
        client_name: '[REAL DATA: Nama Pemilik Usaha]',
        business_name: '[REAL DATA: Kafe / Kuliner]',
        quote: '[REAL DATA: Pengalaman klien mengenai kemudahan preview desain sebelum pelunasan akan ditampilkan di sini.]',
        rating: 5,
        card_type: 'text',
    },
    {
        id: 'placeholder-3',
        client_name: '[REAL DATA: Nama Pemilik Usaha]',
        business_name: '[REAL DATA: Kontraktor / Retail]',
        quote: '[REAL DATA: Testimoni nyata dari pelaku UMKM yang sudah online bersama kawandigital.id.]',
        rating: 5,
        card_type: 'photo',
    },
];

function getInitials(name: string): string {
    const cleaned = name.replace(/\[[^\]]+\]/g, '').trim();
    if (!cleaned) {
        return 'KD';
    }

    const parts = cleaned.split(/\s+/).slice(0, 2);
    return parts.map((part) => part[0]?.toUpperCase() ?? '').join('') || 'KD';
}

export default function TestimonialsSection({
    testimonials,
}: TestimonialsSectionProps) {
    const activeTestimonials =
        testimonials && testimonials.length > 0
            ? testimonials
            : DEFAULT_TESTIMONIALS;

    return (
        <section
            aria-labelledby="testimonials-heading"
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
                            <span>ULASAN KLIEN</span>
                        </p>

                        <h2
                            id="testimonials-heading"
                            className="mt-4 font-bold tracking-[-0.03em] text-white"
                            style={{
                                fontSize: 'clamp(1.75rem, 3.2vw, 2.625rem)',
                                lineHeight: 1.12,
                            }}
                        >
                            Tanggapan pemilik usaha{' '}
                            <span className="text-brand-blue">
                                setelah website aktif.
                            </span>
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#CBD5E1]">
                            Slot ini terhubung ke data ulasan terverifikasi dari
                            panel admin.
                        </p>
                    </div>
                </Reveal>

                <div
                    className={`mt-12 grid grid-cols-1 gap-6 ${
                        activeTestimonials.length === 4
                            ? 'md:grid-cols-2 lg:grid-cols-4'
                            : 'md:grid-cols-3'
                    }`}
                >
                    {activeTestimonials.map((item, index) => {
                        const isDarkCard = item.card_type === 'photo';
                        const clampedRating = Math.min(
                            5,
                            Math.max(1, Math.round(item.rating)),
                        );
                        const avatarUrl = resolveStorageUrl(item.avatar_path);

                        return (
                            <Reveal
                                key={item.id}
                                delayMs={index * 90}
                                className="flex"
                            >
                                <article
                                    className={`flex w-full flex-col justify-between rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8 ${
                                        isDarkCard
                                            ? 'border border-white/15 bg-[#0F1624] text-ink-light'
                                            : 'bg-white text-ink-primary'
                                    }`}
                                >
                                    <div>
                                        <div
                                            className="flex items-center gap-1"
                                            aria-label={`Rating ${clampedRating} dari 5`}
                                        >
                                            {Array.from({
                                                length: clampedRating,
                                            }).map((_, starIndex) => (
                                                <Star
                                                    key={starIndex}
                                                    aria-hidden="true"
                                                    className={`h-4 w-4 fill-current ${
                                                        isDarkCard
                                                            ? 'text-[#DCE7FF]'
                                                            : 'text-brand-blue'
                                                    }`}
                                                />
                                            ))}
                                        </div>

                                        <blockquote
                                            className={`mt-5 text-sm leading-relaxed sm:text-base ${
                                                isDarkCard
                                                    ? 'text-[#CBD5E1]'
                                                    : 'text-ink-primary'
                                            }`}
                                        >
                                            &ldquo;{item.quote}&rdquo;
                                        </blockquote>
                                    </div>

                                    <div
                                        className={`mt-6 flex items-center gap-3.5 border-t pt-5 ${
                                            isDarkCard
                                                ? 'border-white/10'
                                                : 'border-[#E2E8F0]'
                                        }`}
                                    >
                                        {avatarUrl ? (
                                            <img
                                                src={avatarUrl}
                                                alt={`Foto ${item.client_name}`}
                                                width={40}
                                                height={40}
                                                loading="lazy"
                                                className="h-10 w-10 shrink-0 rounded-full object-cover"
                                            />
                                        ) : (
                                            <span
                                                aria-hidden="true"
                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold tracking-tight ${
                                                    isDarkCard
                                                        ? 'bg-brand-blue text-white'
                                                        : 'bg-obsidian text-white'
                                                }`}
                                            >
                                                {getInitials(item.client_name)}
                                            </span>
                                        )}
                                        <div className="min-w-0">
                                            <p
                                                className={`truncate text-sm font-bold ${
                                                    isDarkCard
                                                        ? 'text-white'
                                                        : 'text-ink-primary'
                                                }`}
                                            >
                                                {item.client_name}
                                            </p>
                                            <p
                                                className={`truncate text-xs ${
                                                    isDarkCard
                                                        ? 'text-ink-muted'
                                                        : 'text-ink-secondary'
                                                }`}
                                            >
                                                {item.business_name}
                                            </p>
                                        </div>
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
