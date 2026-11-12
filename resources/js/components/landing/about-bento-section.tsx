export default function AboutBentoSection() {
    return (
        <section
            id="layanan"
            aria-labelledby="layanan-heading"
            className="w-full bg-white py-16 sm:py-20 lg:py-24"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-10">
                    <div className="lg:col-span-4">
                        <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.08em] text-ink-primary uppercase sm:text-xs">
                            <span
                                aria-hidden="true"
                                className="h-2 w-2 shrink-0 rounded-full bg-brand-blue"
                            />
                            <span>TENTANG LAYANAN</span>
                        </p>
                    </div>

                    <div className="lg:col-span-8">
                        <h2
                            id="layanan-heading"
                            className="font-bold tracking-[-0.03em] text-ink-primary"
                            style={{
                                fontSize: 'clamp(1.75rem, 3.2vw, 2.625rem)',
                                lineHeight: 1.12,
                            }}
                        >
                            Kami membangun website yang membantu{' '}
                            <span className="text-brand-blue">
                                bisnis lokal mudah ditemukan pelanggan.
                            </span>
                        </h2>

                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-secondary">
                            Setiap halaman disusun agar calon pembeli cepat
                            memahami jasa atau produk Anda, melihat lokasi
                            usaha, dan menghubungi WhatsApp tanpa hambatan.
                        </p>

                        <div className="mt-6">
                            {/* TODO: Pastikan section id="harga" ditambahkan pada tahap selanjutnya */}
                            <a
                                href="#harga"
                                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1038CC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-obsidian active:bg-[#0D2EA8]"
                            >
                                Lihat Paket Harga
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
                    {/* Card 1: Dark Obsidian */}
                    <article className="flex min-h-[260px] flex-col justify-between rounded-2xl bg-obsidian p-7 text-ink-light sm:p-8 lg:col-span-5">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.08em] text-ink-muted uppercase">
                                Alur Kerja Praktis
                            </p>
                            <h3 className="mt-3 text-xl font-bold tracking-[-0.02em] text-white sm:text-2xl">
                                Tanpa Ribet Teknis
                            </h3>
                        </div>

                        <p className="mt-6 text-sm leading-relaxed text-[#CBD5E1]">
                            Cukup kirim profil usaha, daftar layanan, dan foto
                            lewat WhatsApp. Pengaturan domain, server, serta
                            tata letak halaman kami kerjakan sampai siap tayang.
                        </p>
                    </article>

                    {/* Card 2: Cobalt Blue dengan aksen geometris framing layar mobile */}
                    <article className="relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl bg-brand-blue p-7 text-white sm:p-8 lg:col-span-4">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -top-8 -right-8 h-36 w-36 rounded-3xl border border-white/25"
                        />
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute top-4 right-4 h-24 w-20 rounded-2xl border border-white/30 bg-white/10"
                        >
                            <div className="mx-auto mt-2.5 h-1 w-6 rounded-full bg-white/40" />
                            <div className="mx-2.5 mt-3 space-y-1.5">
                                <div className="h-2 w-10 rounded bg-white/35" />
                                <div className="h-2 w-12 rounded bg-white/25" />
                                <div className="h-5 w-full rounded-md bg-white/25" />
                            </div>
                        </div>

                        <div className="relative max-w-[14rem]">
                            <p className="text-xs font-semibold tracking-[0.08em] text-[#DCE7FF] uppercase">
                                Tampilan Responsif
                            </p>
                            <h3 className="mt-3 text-xl font-bold tracking-[-0.02em] text-white sm:text-2xl">
                                Mobile-First Design
                            </h3>
                        </div>

                        <p className="relative mt-6 text-sm leading-relaxed text-[#DCE7FF]">
                            Tata letak dioptimalkan agar ringan dan nyaman
                            dibaca di layar ponsel pelanggan.
                        </p>
                    </article>

                    {/* Card 3: Soft Slate dengan tipografi besar */}
                    <article className="flex min-h-[260px] flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-soft-slate p-7 text-ink-primary sm:p-8 md:col-span-2 lg:col-span-3">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.08em] text-ink-secondary uppercase">
                                Estimasi Pengerjaan
                            </p>
                            <p
                                className="mt-3 font-bold tracking-[-0.04em] text-ink-primary"
                                style={{
                                    fontSize: 'clamp(2.75rem, 4vw, 3.75rem)',
                                    lineHeight: 1.0,
                                }}
                            >
                                5 Hari
                            </p>
                        </div>

                        <p className="mt-6 text-sm leading-relaxed text-ink-secondary">
                            Proses terstruktur dari pengumpulan materi hingga
                            domain aktif.
                        </p>
                    </article>
                </div>
            </div>
        </section>
    );
}
