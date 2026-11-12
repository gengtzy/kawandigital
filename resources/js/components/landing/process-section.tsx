import Reveal from '@/components/landing/reveal';

const PROCESS_STEPS = [
    {
        number: '01',
        title: 'Kirim Materi via WA',
        description:
            'Kirimkan nama usaha, daftar layanan atau harga, foto tempat usaha, serta nomor kontak yang ingin ditampilkan.',
    },
    {
        number: '02',
        title: 'Penyusunan Draf',
        description:
            'Tim kami menyusun tata letak halaman dan merapikan teks profil bisnis agar mudah dibaca di ponsel maupun laptop.',
    },
    {
        number: '03',
        title: 'Review & Revisi',
        description:
            'Anda memeriksa tautan preview desain terlebih dahulu dan menyampaikan penyesuaian sebelum pelunasan.',
    },
    {
        number: '04',
        title: 'Domain Aktif & Online',
        description:
            'Domain, cloud hosting, SSL, dan Google Business Profile dihubungkan hingga website siap diakses pelanggan.',
    },
] as const;

export default function ProcessSection() {
    return (
        <section
            aria-labelledby="process-heading"
            className="w-full bg-brand-blue py-16 text-white sm:py-20 lg:py-24"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="inline-flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.08em] text-[#DCE7FF] uppercase sm:text-xs">
                            <span
                                aria-hidden="true"
                                className="h-2 w-2 shrink-0 rounded-full bg-white"
                            />
                            <span>CARA KERJA</span>
                        </p>

                        <h2
                            id="process-heading"
                            className="mt-4 font-bold tracking-[-0.03em] text-white"
                            style={{
                                fontSize: 'clamp(1.75rem, 3.2vw, 2.625rem)',
                                lineHeight: 1.12,
                            }}
                        >
                            Alur kerja sederhana dalam 4 tahap terukur.
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#DCE7FF]">
                            Tanpa rapat berulang yang menyita waktu. Semua
                            progres dikabari berkala lewat WhatsApp.
                        </p>
                    </div>
                </Reveal>

                <Reveal delayMs={100}>
                    <ol className="mt-12 grid grid-cols-1 divide-y divide-white/20 border-t border-white/20 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-white/20">
                        {PROCESS_STEPS.map((step) => (
                            <li
                                key={step.number}
                                className="flex flex-col justify-between py-6 sm:px-6 sm:py-8 lg:first:pl-0 lg:last:pr-0"
                            >
                                <div>
                                    <p className="text-sm font-bold tracking-[0.06em] text-[#DCE7FF] tabular-nums">
                                        {step.number}
                                    </p>
                                    <h3 className="mt-3 text-xl font-bold tracking-[-0.02em] text-white">
                                        {step.title}
                                    </h3>
                                </div>

                                <p className="mt-4 text-sm leading-relaxed text-[#DCE7FF]">
                                    {step.description}
                                </p>
                            </li>
                        ))}
                    </ol>
                </Reveal>
            </div>
        </section>
    );
}

