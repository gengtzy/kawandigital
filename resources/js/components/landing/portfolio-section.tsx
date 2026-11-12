import Reveal from '@/components/landing/reveal';
import { resolveStorageUrl } from '@/lib/storage';
import type { ProjectItem } from '@/types';

type PortfolioSectionProps = {
    projects?: ProjectItem[];
};

const DEFAULT_PROJECTS: ProjectItem[] = [
    {
        id: 'sample-klinik-gigi',
        title: 'Contoh Tata Letak Website Klinik Gigi',
        slug: 'contoh-klinik-gigi',
        client_name: 'Contoh Kategori: Klinik Kesehatan',
        category: 'Kesehatan & Klinik',
        year: '2025',
        thumbnail_path: null,
        bg_theme: 'blue',
        live_url: null,
    },
    {
        id: 'sample-kafe-resto',
        title: 'Contoh Tata Letak Website Kafe & Restoran',
        slug: 'contoh-kafe-resto',
        client_name: 'Contoh Kategori: Kuliner Lokal',
        category: 'Kuliner & F&B',
        year: '2025',
        thumbnail_path: null,
        bg_theme: 'dark',
        live_url: null,
    },
    {
        id: 'sample-kontraktor',
        title: 'Contoh Tata Letak Website Kontraktor & Renovasi',
        slug: 'contoh-kontraktor',
        client_name: 'Contoh Kategori: Konstruksi',
        category: 'Jasa Renovasi & Bangunan',
        year: '2025',
        thumbnail_path: null,
        bg_theme: 'light',
        live_url: null,
    },
    {
        id: 'sample-konsultan',
        title: 'Contoh Tata Letak Website Konsultan & Kantor Hukum',
        slug: 'contoh-konsultan',
        client_name: 'Contoh Kategori: Jasa Profesional',
        category: 'Konsultan Bisnis',
        year: '2025',
        thumbnail_path: null,
        bg_theme: 'dark',
        live_url: null,
    },
    {
        id: 'sample-retail',
        title: 'Contoh Tata Letak Katalog Toko Retail Lokal',
        slug: 'contoh-toko-retail',
        client_name: 'Contoh Kategori: Retail & Distribusi',
        category: 'Toko Retail',
        year: '2025',
        thumbnail_path: null,
        bg_theme: 'blue',
        live_url: null,
    },
];

const THEME_SURFACE_CLASSES: Record<ProjectItem['bg_theme'], string> = {
    blue: 'bg-brand-blue text-white',
    dark: 'bg-obsidian text-ink-light',
    light: 'bg-soft-slate text-ink-primary border border-[#E2E8F0]',
};

function ProjectPreviewMockup({ project }: { project: ProjectItem }) {
    const isLight = project.bg_theme === 'light';

    return (
        <div className="flex h-full w-full items-center justify-center p-5 sm:p-8">
            <div className="relative flex w-full max-w-xl items-end gap-4">
                {/* Browser Frame Mockup */}
                <div
                    className={`w-full rounded-xl border p-3.5 shadow-lg sm:p-4 ${
                        isLight
                            ? 'border-[#CBD5E1] bg-white text-ink-primary'
                            : 'border-white/20 bg-[#090D16]/75 text-white'
                    }`}
                >
                    <div
                        className={`flex items-center justify-between border-b pb-2.5 ${
                            isLight ? 'border-[#E2E8F0]' : 'border-white/15'
                        }`}
                    >
                        <div className="flex items-center gap-1.5">
                            <span
                                className={`h-2 w-2 rounded-full ${isLight ? 'bg-[#CBD5E1]' : 'bg-white/35'}`}
                            />
                            <span
                                className={`h-2 w-2 rounded-full ${isLight ? 'bg-[#CBD5E1]' : 'bg-white/35'}`}
                            />
                            <span
                                className={`h-2 w-2 rounded-full ${isLight ? 'bg-[#CBD5E1]' : 'bg-white/35'}`}
                            />
                        </div>
                        <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                                isLight
                                    ? 'bg-soft-slate text-ink-secondary'
                                    : 'bg-white/10 text-[#DCE7FF]'
                            }`}
                        >
                            {project.category}
                        </span>
                    </div>

                    <div className="mt-4 space-y-2.5">
                        <p
                            className={`text-xs font-semibold tracking-[0.06em] uppercase ${
                                isLight ? 'text-brand-blue' : 'text-[#DCE7FF]'
                            }`}
                        >
                            {project.client_name}
                        </p>
                        <div
                            className={`h-3.5 w-3/4 rounded ${
                                isLight ? 'bg-[#E2E8F0]' : 'bg-white/20'
                            }`}
                        />
                        <div
                            className={`h-2.5 w-1/2 rounded ${
                                isLight ? 'bg-[#F1F5F9]' : 'bg-white/10'
                            }`}
                        />
                        <div className="grid grid-cols-3 gap-2 pt-2">
                            <div
                                className={`h-12 rounded-lg ${
                                    isLight ? 'bg-soft-slate' : 'bg-white/10'
                                }`}
                            />
                            <div
                                className={`h-12 rounded-lg ${
                                    isLight ? 'bg-soft-slate' : 'bg-white/10'
                                }`}
                            />
                            <div
                                className={`h-12 rounded-lg ${
                                    isLight ? 'bg-soft-slate' : 'bg-white/10'
                                }`}
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile Frame Overlay */}
                <div
                    className={`hidden w-28 shrink-0 rounded-2xl border p-2.5 shadow-xl sm:block ${
                        isLight
                            ? 'border-[#CBD5E1] bg-obsidian text-white'
                            : 'border-white/25 bg-white text-ink-primary'
                    }`}
                >
                    <div
                        className={`mx-auto h-1 w-6 rounded-full ${
                            isLight ? 'bg-white/35' : 'bg-[#CBD5E1]'
                        }`}
                    />
                    <div className="mt-2.5 space-y-1.5">
                        <div
                            className={`h-2 w-12 rounded-sm ${
                                isLight ? 'bg-white/30' : 'bg-[#CBD5E1]'
                            }`}
                        />
                        <div
                            className={`h-10 rounded-lg ${
                                isLight ? 'bg-white/10' : 'bg-soft-slate'
                            }`}
                        />
                        <div className="h-4 rounded-full bg-brand-blue" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PortfolioSection({ projects }: PortfolioSectionProps) {
    const activeProjects =
        projects && projects.length > 0 ? projects : DEFAULT_PROJECTS;

    return (
        <section
            id="portofolio"
            aria-labelledby="portofolio-heading"
            className="w-full bg-white py-16 sm:py-20 lg:py-24"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
                        <div className="lg:col-span-7">
                            <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.08em] text-ink-primary uppercase sm:text-xs">
                                <span
                                    aria-hidden="true"
                                    className="h-2 w-2 shrink-0 rounded-full bg-brand-blue"
                                />
                                <span>PORTOFOLIO PILIHAN</span>
                            </p>

                            <h2
                                id="portofolio-heading"
                                className="mt-4 font-bold tracking-[-0.03em] text-ink-primary"
                                style={{
                                    fontSize: 'clamp(1.75rem, 3.2vw, 2.625rem)',
                                    lineHeight: 1.12,
                                }}
                            >
                                Portofolio Pilihan{' '}
                                <span className="text-brand-blue">
                                    untuk berbagai sektor usaha.
                                </span>
                            </h2>
                        </div>

                        <p className="text-base leading-relaxed text-ink-secondary lg:col-span-5">
                            Struktur setiap website disesuaikan dengan karakter
                            bisnis agar calon pelanggan cepat menemukan layanan,
                            portofolio, dan kontak WhatsApp.
                        </p>
                    </div>
                </Reveal>

                {/* Grid asimetris: Baris 1 (2 col), Baris 2 (1 full-width), Baris 3 (2 col) */}
                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
                    {activeProjects.map((project, index) => {
                        const isWideCard = index === 2;
                        const thumbnailUrl = resolveStorageUrl(
                            project.thumbnail_path,
                        );

                        return (
                            <Reveal
                                key={project.id}
                                delayMs={(index % 2) * 90}
                                className={isWideCard ? 'md:col-span-2' : ''}
                            >
                                <article className="group flex flex-col">
                                    <div
                                        className={`overflow-hidden rounded-2xl transition-all duration-300 group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 ${
                                            isWideCard
                                                ? 'min-h-[260px] sm:min-h-[320px]'
                                                : 'min-h-[240px] sm:min-h-[280px]'
                                        } ${THEME_SURFACE_CLASSES[project.bg_theme]}`}
                                    >
                                        {thumbnailUrl ? (
                                            <img
                                                src={thumbnailUrl}
                                                alt={`Tampilan website ${project.title}`}
                                                width={1200}
                                                height={750}
                                                loading="lazy"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <ProjectPreviewMockup
                                                project={project}
                                            />
                                        )}
                                    </div>

                                    <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                                        <h3 className="text-lg font-bold tracking-[-0.02em] text-ink-primary">
                                            {project.live_url ? (
                                                <a
                                                    href={project.live_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="underline decoration-[#CBD5E1] underline-offset-4 transition-colors hover:text-brand-blue hover:decoration-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                                                >
                                                    {project.title}
                                                </a>
                                            ) : (
                                                project.title
                                            )}
                                        </h3>

                                        <p className="shrink-0 text-sm text-ink-secondary">
                                            {project.category} ({project.year})
                                        </p>
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
