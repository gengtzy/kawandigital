import Reveal from '@/components/landing/reveal';

const DELIVERABLES = [
    {
        number: '01',
        text: 'Desain halaman bersih dan responsif di ponsel maupun laptop',
    },
    {
        number: '02',
        text: 'Penulisan struktur teks profil dan layanan agar mudah dipahami pembeli',
    },
    {
        number: '03',
        text: 'Tombol WhatsApp dan telepon cepat di setiap bagian penting',
    },
    {
        number: '04',
        text: 'Integrasi peta lokasi Google Maps dan Google Business Profile',
    },
    {
        number: '05',
        text: 'Optimasi kecepatan muat halaman dan struktur SEO lokal dasar',
    },
    {
        number: '06',
        text: 'Akses panel admin ringan untuk mengubah harga atau menambah portofolio',
    },
] as const;

const OWNER_WORKFLOW_STEPS = [
    {
        step: 'Langkah 1',
        title: 'Kirim materi lewat WhatsApp',
        detail: 'Bagikan nama usaha, daftar layanan atau harga, foto tempat, serta nomor kontak yang aktif.',
    },
    {
        step: 'Langkah 2',
        title: 'Tinjau preview desain',
        detail: 'Kami susun tata letak dan teks halaman terlebih dahulu agar bisa Anda periksa sebelum pelunasan.',
    },
    {
        step: 'Langkah 3',
        title: 'Website aktif beserta akses admin',
        detail: 'Domain, hosting, SSL, dan peta lokasi terpasang rapi. Anda juga menerima akses pembaruan konten.',
    },
] as const;

export default function DeliverablesSection() {
    return (
        <section
            aria-labelledby="deliverables-heading"
            className="w-full bg-white py-16 sm:py-20 lg:py-24"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-12">
                    {/* Kolom Kiri: Daftar bernomor 01 sampai 06 */}
                    <Reveal className="lg:col-span-7">
                        <div>
                            <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.08em] text-ink-primary uppercase sm:text-xs">
                                <span
                                    aria-hidden="true"
                                    className="h-2 w-2 shrink-0 rounded-full bg-brand-blue"
                                />
                                <span>YANG ANDA DAPATKAN</span>
                            </p>

                            <h2
                                id="deliverables-heading"
                                className="mt-4 font-bold tracking-[-0.03em] text-ink-primary"
                                style={{
                                    fontSize: 'clamp(1.75rem, 3.2vw, 2.625rem)',
                                    lineHeight: 1.12,
                                }}
                            >
                                Semua yang dibutuhkan agar{' '}
                                <span className="text-brand-blue">
                                    bisnis tampil meyakinkan online.
                                </span>
                            </h2>

                            <ol className="mt-8 divide-y divide-[#E2E8F0] border-y border-[#E2E8F0]">
                                {DELIVERABLES.map((item) => (
                                    <li
                                        key={item.number}
                                        className="flex items-start gap-4 py-4 sm:gap-6 sm:py-5"
                                    >
                                        <span className="w-7 shrink-0 pt-0.5 text-sm font-bold text-brand-blue tabular-nums">
                                            {item.number}
                                        </span>
                                        <p className="text-sm leading-relaxed font-medium text-ink-primary sm:text-base">
                                            {item.text}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </Reveal>

                    {/* Kolom Kanan: Kartu visual dark-blue (#090D16 ke #1649FF) */}
                    <Reveal
                        className="lg:sticky lg:top-24 lg:col-span-5"
                        delayMs={120}
                    >
                        <aside
                            aria-label="Ringkasan alur tanpa beban teknis"
                            className="rounded-2xl p-7 text-white sm:p-8"
                            style={{
                                background:
                                    'linear-gradient(160deg, #090D16 0%, #0E2366 55%, #1649FF 100%)',
                            }}
                        >
                            <p className="text-xs font-semibold tracking-[0.08em] text-[#DCE7FF] uppercase">
                                Tanpa Beban Teknis
                            </p>
                            <h3 className="mt-3 text-2xl font-bold tracking-[-0.02em] text-white">
                                Fokus kelola usaha, urusan website kami
                                bereskan.
                            </h3>

                            <ol className="mt-6 space-y-4">
                                {OWNER_WORKFLOW_STEPS.map((item) => (
                                    <li
                                        key={item.step}
                                        className="rounded-xl border border-white/15 bg-white/8 p-4"
                                    >
                                        <p className="text-xs font-semibold tracking-[0.06em] text-[#DCE7FF] uppercase">
                                            {item.step}
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-white">
                                            {item.title}
                                        </p>
                                        <p className="mt-1 text-xs leading-relaxed text-[#DCE7FF]">
                                            {item.detail}
                                        </p>
                                    </li>
                                ))}
                            </ol>

                            <p className="mt-6 border-t border-white/20 pt-5 text-xs leading-relaxed text-[#DCE7FF] sm:text-sm">
                                Setelah website aktif, Anda tetap bebas
                                mengelola daftar harga maupun portofolio secara
                                mandiri lewat panel admin yang ringan.
                            </p>
                        </aside>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
