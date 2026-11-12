import Reveal from '@/components/landing/reveal';

export default function ProblemSection() {
    return (
        <section
            aria-labelledby="problem-heading"
            className="w-full bg-soft-slate py-16 sm:py-20 lg:py-24"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="inline-flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.08em] text-ink-primary uppercase sm:text-xs">
                            <span
                                aria-hidden="true"
                                className="h-2 w-2 shrink-0 rounded-full bg-brand-blue"
                            />
                            <span>KONDISI DI LAPANGAN</span>
                        </p>

                        <h2
                            id="problem-heading"
                            className="mt-4 font-bold tracking-[-0.03em] text-ink-primary"
                            style={{
                                fontSize: 'clamp(1.75rem, 3.2vw, 2.625rem)',
                                lineHeight: 1.12,
                            }}
                        >
                            Pelanggan sudah mencari layanan Anda di Google.{' '}
                            <span className="text-brand-blue">
                                Pertanyaannya, siapa yang mereka temukan?
                            </span>
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-secondary">
                            Saat calon pembeli membandingkan pilihan di kota
                            mereka, kejelasan profil usaha dan kemudahan kontak
                            menentukan bisnis mana yang lebih dulu dihubungi.
                        </p>
                    </div>
                </Reveal>

                <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Kartu 1: Kompetitor Muncul Lebih Dulu */}
                    <Reveal className="flex">
                        <article className="flex w-full flex-col justify-between gap-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-all duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8">
                            <div>
                                <h3 className="text-xl font-bold tracking-[-0.02em] text-ink-primary">
                                    Kompetitor Muncul Lebih Dulu
                                </h3>
                                <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                                    Calon pelanggan mengetik nama jasa di
                                    pencarian lokal. Bisnis yang punya website
                                    resmi dan Google Business Profile langsung
                                    tampil lengkap dengan arah lokasi dan
                                    kontak.
                                </p>
                            </div>

                            {/* Mockup UI kartu hasil pencarian lokal */}
                            <div
                                aria-label="Ilustrasi perbandingan hasil pencarian lokal di kota"
                                className="rounded-xl border border-[#E2E8F0] bg-soft-slate p-4 sm:p-5"
                            >
                                <div className="flex items-center justify-between rounded-lg border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-xs text-ink-secondary">
                                    <span>
                                        Pencarian: jasa layanan terdekat
                                    </span>
                                    <span className="font-semibold text-brand-blue">
                                        Cari
                                    </span>
                                </div>

                                <div className="mt-3 space-y-3">
                                    <div className="rounded-lg border border-brand-blue bg-white p-3.5">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <p className="text-sm font-bold text-ink-primary">
                                                Bisnis dengan Website Resmi
                                            </p>
                                            <span className="rounded-md bg-[#DCE7FF] px-2.5 py-0.5 text-[11px] font-semibold text-brand-blue">
                                                Website + Maps
                                            </span>
                                        </div>
                                        <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary">
                                            Menampilkan daftar layanan, jam
                                            buka, peta lokasi, serta tombol
                                            WhatsApp yang bisa langsung diklik.
                                        </p>
                                    </div>

                                    <div className="rounded-lg border border-[#CBD5E1] bg-white/80 p-3.5">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <p className="text-sm font-semibold text-ink-primary">
                                                Usaha Tanpa Website
                                            </p>
                                            <span className="rounded-md bg-[#E2E8F0] px-2.5 py-0.5 text-[11px] font-medium text-ink-primary">
                                                Info Terbatas
                                            </span>
                                        </div>
                                        <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary">
                                            Sulit ditemukan lewat kata kunci
                                            layanan dan tidak memiliki halaman
                                            khusus untuk menjelaskan harga
                                            maupun portofolio.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </Reveal>

                    {/* Kartu 2: Link Bio Media Sosial Terbatas */}
                    <Reveal className="flex" delayMs={100}>
                        <article className="flex w-full flex-col justify-between gap-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-all duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8">
                            <div>
                                <h3 className="text-xl font-bold tracking-[-0.02em] text-ink-primary">
                                    Link Bio Media Sosial Terbatas
                                </h3>
                                <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                                    Halaman bio hanya menampung deretan tautan
                                    terpisah. Website bisnis merangkum rincian
                                    harga, contoh hasil kerja, dan tombol kontak
                                    dalam satu alur yang mudah diperiksa.
                                </p>
                            </div>

                            {/* Mockup UI perbandingan link bio vs website bisnis */}
                            <div
                                aria-label="Ilustrasi perbandingan tampilan informasi antara halaman bio biasa dan website bisnis"
                                className="grid grid-cols-1 gap-3 rounded-xl border border-[#E2E8F0] bg-soft-slate p-4 sm:grid-cols-2 sm:p-5"
                            >
                                <div className="flex flex-col justify-between rounded-lg border border-[#CBD5E1] bg-white p-3.5">
                                    <div>
                                        <p className="text-xs font-semibold tracking-[0.06em] text-ink-secondary uppercase">
                                            Halaman Bio Biasa
                                        </p>
                                        <div className="mt-3 space-y-2">
                                            <div className="rounded-md border border-[#E2E8F0] bg-soft-slate px-3 py-2 text-xs font-medium text-ink-primary">
                                                Tautan Chat Admin
                                            </div>
                                            <div className="rounded-md border border-[#E2E8F0] bg-soft-slate px-3 py-2 text-xs font-medium text-ink-primary">
                                                Tautan File Daftar Harga
                                            </div>
                                            <div className="rounded-md border border-[#E2E8F0] bg-soft-slate px-3 py-2 text-xs font-medium text-ink-primary">
                                                Tautan Peta Lokasi
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-xs leading-relaxed text-ink-secondary">
                                        Pembeli harus membuka banyak halaman
                                        terpisah untuk melihat harga dan contoh
                                        karya.
                                    </p>
                                </div>

                                <div className="flex flex-col justify-between rounded-lg border border-brand-blue bg-white p-3.5">
                                    <div>
                                        <p className="text-xs font-semibold tracking-[0.06em] text-brand-blue uppercase">
                                            Website Bisnis
                                        </p>
                                        <div className="mt-3 space-y-2">
                                            <div className="rounded-md bg-soft-slate px-3 py-2">
                                                <p className="text-xs font-semibold text-ink-primary">
                                                    Harga & Paket Jelas
                                                </p>
                                                <p className="text-[11px] text-ink-secondary">
                                                    Tertata per kategori layanan
                                                </p>
                                            </div>
                                            <div className="rounded-md bg-soft-slate px-3 py-2">
                                                <p className="text-xs font-semibold text-ink-primary">
                                                    Portofolio Terkurasi
                                                </p>
                                                <p className="text-[11px] text-ink-secondary">
                                                    Bukti pekerjaan langsung
                                                    terlihat
                                                </p>
                                            </div>
                                            <div className="rounded-md bg-obsidian px-3 py-2 text-center text-xs font-semibold text-white">
                                                Kontak WhatsApp Langsung
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-xs leading-relaxed text-ink-secondary">
                                        Semua informasi penting tersedia dalam
                                        satu halaman resmi.
                                    </p>
                                </div>
                            </div>
                        </article>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
