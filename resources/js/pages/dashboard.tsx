import { Head, Link, usePage } from '@inertiajs/react';
import {
    CircleHelp,
    ExternalLink,
    FolderKanban,
    MessageSquareQuote,
    Settings,
    Tag,
} from 'lucide-react';
import FlashBanner from '@/components/admin/flash-banner';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { formatWhatsAppDisplay } from '@/lib/whatsapp';
import { dashboard } from '@/routes';
import type { AdminDashboardStats } from '@/types';

type DashboardProps = {
    stats?: AdminDashboardStats;
};

const DEFAULT_STATS: AdminDashboardStats = {
    projects_count: 0,
    featured_projects_count: 0,
    pricing_plans_count: 0,
    active_testimonials_count: 0,
    total_testimonials_count: 0,
    active_faqs_count: 0,
    total_faqs_count: 0,
};

export default function Dashboard({ stats }: DashboardProps) {
    const { siteSettings } = usePage().props;
    const metrics = stats ?? DEFAULT_STATS;
    const whatsappDisplay = formatWhatsAppDisplay(siteSettings);

    const summaryCards = [
        {
            label: 'Total Portofolio',
            value: metrics.projects_count,
            detail: `${metrics.featured_projects_count} ditampilkan di halaman utama`,
            href: '/admin/projects',
            cta: 'Kelola Portofolio',
            icon: FolderKanban,
        },
        {
            label: 'Paket Harga',
            value: metrics.pricing_plans_count,
            detail: 'Paket aktif pada bagian harga',
            href: '/admin/pricing-plans',
            cta: 'Kelola Paket',
            icon: Tag,
        },
        {
            label: 'Testimoni Aktif',
            value: metrics.active_testimonials_count,
            detail: `dari ${metrics.total_testimonials_count} total testimoni`,
            href: '/admin/testimonials',
            cta: 'Kelola Testimoni',
            icon: MessageSquareQuote,
        },
        {
            label: 'FAQ Aktif',
            value: metrics.active_faqs_count,
            detail: `dari ${metrics.total_faqs_count} total pertanyaan`,
            href: '/admin/faqs',
            cta: 'Kelola FAQ',
            icon: CircleHelp,
        },
    ];

    return (
        <>
            <Head title="Dashboard Admin" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <FlashBanner />

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Ringkasan Konten Website
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Kelola portofolio, paket harga, testimoni, FAQ, dan
                            kontak WhatsApp untuk{' '}
                            {siteSettings?.brand_name || 'kawandigital.id'}.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Button asChild variant="outline" size="sm">
                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ExternalLink className="size-4" />
                                Lihat Website
                            </a>
                        </Button>
                        <Button asChild size="sm">
                            <Link href="/admin/settings">
                                <Settings className="size-4" />
                                Pengaturan Situs
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {summaryCards.map((item) => (
                        <Card
                            key={item.label}
                            className="justify-between gap-4"
                        >
                            <CardHeader className="pb-0">
                                <div className="flex items-center justify-between gap-2">
                                    <CardDescription className="font-medium">
                                        {item.label}
                                    </CardDescription>
                                    <item.icon className="size-4 text-brand-blue" />
                                </div>
                                <CardTitle className="mt-1 text-3xl font-bold tracking-tight">
                                    {item.value}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-3">
                                <p className="text-xs text-muted-foreground">
                                    {item.detail}
                                </p>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className="w-fit"
                                >
                                    <Link href={item.href}>{item.cta}</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Pintasan Pengelolaan</CardTitle>
                            <CardDescription>
                                Akses cepat ke halaman tambah atau pembaruan
                                konten landing page.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-3 sm:grid-cols-2">
                            <Link
                                href="/admin/projects/create"
                                className="flex flex-col gap-1 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                            >
                                <span className="text-sm font-semibold">
                                    + Tambah Portofolio Baru
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    Unggah tangkapan layar website klien atau
                                    atur tema tampilan.
                                </span>
                            </Link>
                            <Link
                                href="/admin/pricing-plans/create"
                                className="flex flex-col gap-1 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                            >
                                <span className="text-sm font-semibold">
                                    + Tambah Paket Harga
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    Susun daftar fitur dan pesan WhatsApp
                                    otomatis per paket.
                                </span>
                            </Link>
                            <Link
                                href="/admin/testimonials/create"
                                className="flex flex-col gap-1 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                            >
                                <span className="text-sm font-semibold">
                                    + Tambah Testimoni Klien
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    Ganti data placeholder dengan ulasan asli
                                    pemilik usaha.
                                </span>
                            </Link>
                            <Link
                                href="/admin/faqs/create"
                                className="flex flex-col gap-1 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                            >
                                <span className="text-sm font-semibold">
                                    + Tambah Pertanyaan FAQ
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    Jawab pertanyaan umum calon klien seputar
                                    layanan dan alur kerja.
                                </span>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="justify-between">
                        <CardHeader>
                            <CardTitle>Kontak WhatsApp Aktif</CardTitle>
                            <CardDescription>
                                Seluruh tombol konsultasi di website mengarah ke
                                nomor berikut.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="rounded-lg border bg-muted/40 p-3.5 text-sm">
                                <p className="text-xs text-muted-foreground">
                                    Nomor WhatsApp
                                </p>
                                <p className="mt-0.5 font-mono font-semibold">
                                    {whatsappDisplay ?? 'Belum diatur'}
                                </p>
                                <p className="mt-3 text-xs text-muted-foreground">
                                    Email Kontak
                                </p>
                                <p className="mt-0.5 truncate font-medium">
                                    {siteSettings?.email || 'Belum diatur'}
                                </p>
                            </div>

                            <Button asChild className="w-full">
                                <Link href="/admin/settings">
                                    Edit Nomor WhatsApp & Teks Hero
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
