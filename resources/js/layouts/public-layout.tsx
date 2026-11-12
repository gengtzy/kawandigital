import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { formatWhatsAppDisplay, resolveWhatsAppHref } from '@/lib/whatsapp';
import type { PublicLayoutProps } from '@/types';

const NAV_ITEMS = [
    { label: 'Portofolio', hash: '#portofolio' },
    { label: 'Layanan', hash: '#layanan' },
    { label: 'Harga', hash: '#harga' },
    { label: 'FAQ', hash: '#faq' },
] as const;

export default function PublicLayout({
    children,
    siteSettings: siteSettingsProp,
    footerTopSlot,
}: PublicLayoutProps) {
    const { props, url } = usePage();
    const siteSettings = siteSettingsProp ?? props.siteSettings;
    const brandName =
        siteSettings?.brand_name?.trim() ||
        siteSettings?.site_name?.trim() ||
        'kawandigital.id';
    const whatsappHref = resolveWhatsAppHref(siteSettings);
    const whatsappDisplay = formatWhatsAppDisplay(siteSettings);
    const email = siteSettings?.email?.trim() || null;
    const location =
        siteSettings?.address?.trim() || siteSettings?.city?.trim() || null;
    const workingHours =
        siteSettings?.operational_hours?.trim() ||
        siteSettings?.working_hours?.trim() ||
        null;

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const isHomePage =
        url === '/' || url.startsWith('/#') || url.startsWith('/?');
    const anchorPrefix = isHomePage ? '' : '/';

    useEffect(() => {
        if (!mobileMenuOpen) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setMobileMenuOpen(false);
                menuButtonRef.current?.focus();
            }
        };

        const handlePointerDown = (event: MouseEvent | TouchEvent) => {
            if (
                headerRef.current &&
                !headerRef.current.contains(event.target as Node)
            ) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('touchstart', handlePointerDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handlePointerDown);
            document.removeEventListener('touchstart', handlePointerDown);
        };
    }, [mobileMenuOpen]);

    const renderWhatsAppCta = (className: string) => {
        if (whatsappHref) {
            return (
                <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                    onClick={() => setMobileMenuOpen(false)}
                >
                    Konsultasi WA
                </a>
            );
        }

        // TODO: Sediakan siteSettings.whatsapp_url atau siteSettings.whatsapp_number via HandleInertiaRequests
        return (
            <button
                type="button"
                disabled
                aria-disabled="true"
                title="Tautan WhatsApp belum diatur pada siteSettings"
                className={`${className} opacity-70`}
            >
                WA Segera Hadir
            </button>
        );
    };

    return (
        <div
            id="top"
            className="flex min-h-screen flex-col overflow-x-clip bg-white text-ink-primary"
        >
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-brand-blue focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-white"
            >
                Lewati ke konten utama
            </a>

            <header
                ref={headerRef}
                className="pointer-events-none fixed inset-x-0 top-3 z-50 px-4 sm:top-4 sm:px-6"
            >
                <div className="mx-auto max-w-5xl">
                    {/* Floating pill container: shadow memisahkan navbar gelap dari permukaan terang di bawahnya */}
                    <div className="pointer-events-auto flex min-h-[56px] items-center justify-between gap-2 rounded-full bg-obsidian px-3 py-1.5 text-ink-light shadow-lg ring-1 shadow-obsidian/15 ring-white/10 sm:px-4">
                        <Link
                            href="/"
                            className="inline-flex min-h-[44px] items-center rounded-full px-2.5 text-sm font-bold tracking-[-0.02em] text-ink-light transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-base"
                        >
                            {brandName}
                        </Link>

                        <nav
                            aria-label="Navigasi utama"
                            className="hidden items-center gap-1 md:flex"
                        >
                            {NAV_ITEMS.map((item) => (
                                <a
                                    key={item.hash}
                                    href={`${anchorPrefix}${item.hash}`}
                                    className="inline-flex min-h-[44px] items-center rounded-full px-3.5 text-sm font-medium text-[#CBD5E1] transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-white/15"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2">
                            {renderWhatsAppCta(
                                'hidden sm:inline-flex min-h-[44px] items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-obsidian transition-all duration-300 hover:-translate-y-1 hover:bg-[#DCE7FF] active:bg-[#CBD5E1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue motion-reduce:transition-none motion-reduce:hover:translate-y-0',
                            )}

                            <button
                                ref={menuButtonRef}
                                type="button"
                                onClick={() =>
                                    setMobileMenuOpen((open) => !open)
                                }
                                aria-expanded={mobileMenuOpen}
                                aria-controls="mobile-nav-drawer"
                                aria-label={
                                    mobileMenuOpen
                                        ? 'Tutup menu navigasi'
                                        : 'Buka menu navigasi'
                                }
                                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-sm font-medium text-ink-light transition-colors hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-white/20 md:hidden"
                            >
                                <span>{mobileMenuOpen ? 'Tutup' : 'Menu'}</span>
                                <svg
                                    aria-hidden="true"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    className="h-4 w-4 shrink-0"
                                >
                                    {mobileMenuOpen ? (
                                        <path
                                            d="M4 4L12 12M12 4L4 12"
                                            stroke="currentColor"
                                            strokeWidth="1.75"
                                            strokeLinecap="round"
                                        />
                                    ) : (
                                        <path
                                            d="M2.5 5.5H13.5M2.5 10.5H13.5"
                                            stroke="currentColor"
                                            strokeWidth="1.75"
                                            strokeLinecap="round"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {mobileMenuOpen && (
                        <nav
                            id="mobile-nav-drawer"
                            aria-label="Navigasi seluler"
                            className="pointer-events-auto mt-2.5 rounded-2xl bg-obsidian p-3 text-ink-light shadow-xl ring-1 shadow-obsidian/25 ring-white/10 md:hidden"
                        >
                            <ul className="flex flex-col gap-1">
                                {NAV_ITEMS.map((item) => (
                                    <li key={item.hash}>
                                        <a
                                            href={`${anchorPrefix}${item.hash}`}
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                            className="flex min-h-[44px] w-full items-center rounded-xl px-4 text-sm font-medium text-[#CBD5E1] transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-white/15"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-2.5 border-t border-white/10 pt-2.5 sm:hidden">
                                {renderWhatsAppCta(
                                    'flex min-h-[44px] w-full items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-obsidian transition-colors hover:bg-[#DCE7FF] active:bg-[#CBD5E1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue',
                                )}
                            </div>
                        </nav>
                    )}
                </div>
            </header>

            <main
                id="main-content"
                tabIndex={-1}
                className="flex-1 focus:outline-none"
            >
                {children}
            </main>

            <footer className="w-full overflow-hidden bg-obsidian text-ink-light">
                <div className="mx-auto max-w-6xl px-4 pt-14 pb-6 sm:px-6 sm:pt-16 lg:px-8">
                    {footerTopSlot ? (
                        <div className="mb-14 sm:mb-16">{footerTopSlot}</div>
                    ) : null}

                    <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
                        <div className="md:col-span-5">
                            <Link
                                href="/"
                                className="inline-flex min-h-[44px] items-center rounded-lg text-lg font-bold tracking-[-0.02em] text-ink-light transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                {brandName}
                            </Link>
                            <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
                                {siteSettings?.tagline?.trim() ||
                                    'Partner pembuatan website untuk bisnis lokal dan UMKM dengan struktur rapi dan fokus pada konversi.'}
                            </p>
                            <div className="mt-5">
                                {renderWhatsAppCta(
                                    'inline-flex min-h-[44px] items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-obsidian transition-all duration-300 hover:-translate-y-1 hover:bg-[#DCE7FF] active:bg-[#CBD5E1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue motion-reduce:transition-none motion-reduce:hover:translate-y-0',
                                )}
                            </div>
                        </div>

                        <nav
                            aria-label="Navigasi footer"
                            className="md:col-span-3"
                        >
                            <h2 className="text-xs font-semibold tracking-[0.08em] text-ink-muted uppercase">
                                Navigasi
                            </h2>
                            <ul className="mt-3 flex flex-col gap-1">
                                {NAV_ITEMS.map((item) => (
                                    <li key={item.hash}>
                                        <a
                                            href={`${anchorPrefix}${item.hash}`}
                                            className="inline-flex min-h-[44px] items-center text-sm text-[#CBD5E1] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="md:col-span-4">
                            <h2 className="text-xs font-semibold tracking-[0.08em] text-ink-muted uppercase">
                                Kontak
                            </h2>
                            <address className="mt-3 flex flex-col gap-2.5 text-sm text-[#CBD5E1] not-italic">
                                <div>
                                    <span className="block text-xs text-ink-muted">
                                        WhatsApp
                                    </span>
                                    {whatsappHref ? (
                                        <a
                                            href={whatsappHref}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex min-h-[44px] items-center text-ink-light underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                        >
                                            {whatsappDisplay ??
                                                'Chat via WhatsApp'}
                                        </a>
                                    ) : (
                                        <span className="inline-flex min-h-[44px] items-center text-ink-muted">
                                            [REAL DATA: WhatsApp siteSettings]
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <span className="block text-xs text-ink-muted">
                                        Email
                                    </span>
                                    {email ? (
                                        <a
                                            href={`mailto:${email}`}
                                            className="inline-flex min-h-[44px] items-center break-all text-ink-light underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                        >
                                            {email}
                                        </a>
                                    ) : (
                                        <span className="inline-flex min-h-[44px] items-center text-ink-muted">
                                            [REAL DATA: Email siteSettings]
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <span className="block text-xs text-ink-muted">
                                        Lokasi
                                    </span>
                                    <span className="inline-flex min-h-[44px] items-center text-[#CBD5E1]">
                                        {location ??
                                            '[REAL DATA: Alamat siteSettings]'}
                                    </span>
                                </div>

                                {workingHours ? (
                                    <div>
                                        <span className="block text-xs text-ink-muted">
                                            Jam Operasional
                                        </span>
                                        <span className="inline-flex min-h-[44px] items-center text-[#CBD5E1]">
                                            {workingHours}
                                        </span>
                                    </div>
                                ) : null}
                            </address>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
                        <p>
                            &copy; {new Date().getFullYear()} {brandName}.
                        </p>
                        <a
                            href="#top"
                            className="inline-flex min-h-[44px] items-center self-start text-[#CBD5E1] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:self-auto"
                        >
                            Kembali ke atas
                        </a>
                    </div>
                </div>

                {/* Oversized wordmark SVG terkalibrasi penuh: terbaca utuh kiri-kanan, terpotong rapi di tepi bawah */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none w-full overflow-hidden pt-4 select-none sm:pt-6"
                >
                    <svg
                        viewBox="0 0 1200 122"
                        preserveAspectRatio="xMidYMax meet"
                        className="block h-auto w-full"
                    >
                        <text
                            x="600"
                            y="128"
                            textAnchor="middle"
                            fill="#64748B"
                            fontSize="140"
                            fontWeight="700"
                            letterSpacing="-4"
                            className="font-sans"
                        >
                            {brandName}
                        </text>
                    </svg>
                </div>
            </footer>
        </div>
    );
}
