import { Head, Link, router } from '@inertiajs/react';
import { ExternalLink, Pencil, Plus, Trash2 } from 'lucide-react';
import FlashBanner from '@/components/admin/flash-banner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { resolveStorageUrl } from '@/lib/storage';
import type { ProjectItem } from '@/types';

type ProjectsIndexProps = {
    projects: ProjectItem[];
};

const THEME_LABELS: Record<ProjectItem['bg_theme'], string> = {
    blue: 'Biru Brand',
    dark: 'Obsidian Gelap',
    light: 'Slate Terang',
};

const THEME_DOT_CLASSES: Record<ProjectItem['bg_theme'], string> = {
    blue: 'bg-[#1649FF]',
    dark: 'bg-[#090D16] ring-1 ring-border',
    light: 'bg-[#F6F8FB] ring-1 ring-border',
};

export default function ProjectsIndex({ projects }: ProjectsIndexProps) {
    const handleDelete = (project: ProjectItem) => {
        if (
            !window.confirm(
                `Hapus portofolio "${project.title}"? Tindakan ini tidak dapat dibatalkan.`,
            )
        ) {
            return;
        }

        router.delete(`/admin/projects/${project.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Kelola Portofolio" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <FlashBanner />

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Portofolio
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Kelola contoh website atau proyek klien yang tampil
                            pada halaman utama.
                        </p>
                    </div>

                    <Button asChild>
                        <Link href="/admin/projects/create">
                            <Plus className="size-4" />
                            Tambah Portofolio
                        </Link>
                    </Button>
                </div>

                {projects.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                            <p className="text-sm text-muted-foreground">
                                Belum ada data portofolio.
                            </p>
                            <Button asChild size="sm">
                                <Link href="/admin/projects/create">
                                    Tambah Portofolio Pertama
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="py-0">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[760px] text-left text-sm">
                                <thead className="border-b bg-muted/40 text-xs font-semibold text-muted-foreground uppercase">
                                    <tr>
                                        <th className="px-4 py-3">Pratinjau</th>
                                        <th className="px-4 py-3">
                                            Judul & Klien
                                        </th>
                                        <th className="px-4 py-3">
                                            Kategori & Tahun
                                        </th>
                                        <th className="px-4 py-3">Tema</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Urutan</th>
                                        <th className="px-4 py-3 text-right">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {projects.map((project) => {
                                        const thumbUrl = resolveStorageUrl(
                                            project.thumbnail_path,
                                        );

                                        return (
                                            <tr
                                                key={project.id}
                                                className="hover:bg-muted/20"
                                            >
                                                <td className="px-4 py-3">
                                                    {thumbUrl ? (
                                                        <img
                                                            src={thumbUrl}
                                                            alt={project.title}
                                                            width={80}
                                                            height={52}
                                                            className="h-13 w-20 rounded-md border object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-13 w-20 items-center justify-center rounded-md border bg-muted/40 px-1 text-center text-[11px] text-muted-foreground">
                                                            Frame UI
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="font-semibold text-foreground">
                                                        {project.title}
                                                    </div>
                                                    <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                                                        <span>
                                                            {
                                                                project.client_name
                                                            }
                                                        </span>
                                                        {project.live_url && (
                                                            <a
                                                                href={
                                                                    project.live_url
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1 text-brand-blue hover:underline"
                                                            >
                                                                <ExternalLink className="size-3" />
                                                                Kunjungi
                                                            </a>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-muted-foreground">
                                                    <div>
                                                        {project.category}
                                                    </div>
                                                    <div className="text-xs">
                                                        {project.year}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="inline-flex items-center gap-2 text-xs font-medium">
                                                        <span
                                                            className={`size-3 rounded-full ${THEME_DOT_CLASSES[project.bg_theme]}`}
                                                        />
                                                        {
                                                            THEME_LABELS[
                                                                project.bg_theme
                                                            ]
                                                        }
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    {project.is_featured ? (
                                                        <Badge variant="default">
                                                            Tampil
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="secondary">
                                                            Tersembunyi
                                                        </Badge>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 font-mono text-xs">
                                                    {project.sort_order ?? 0}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            asChild
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            <Link
                                                                href={`/admin/projects/${project.id}/edit`}
                                                            >
                                                                <Pencil className="size-3.5" />
                                                                Edit
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    project,
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="size-3.5" />
                                                            Hapus
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}
            </div>
        </>
    );
}

ProjectsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Portofolio',
            href: '/admin/projects',
        },
    ],
};
