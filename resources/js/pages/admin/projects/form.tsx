import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, ImagePlus, Trash2 } from 'lucide-react';
import { type FormEvent, useEffect, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { resolveStorageUrl } from '@/lib/storage';
import type { ProjectItem } from '@/types';

type ProjectFormProps = {
    project: ProjectItem | null;
};

export default function ProjectForm({ project }: ProjectFormProps) {
    const isEditing = project !== null;

    const [title, setTitle] = useState(project?.title ?? '');
    const [slug, setSlug] = useState(project?.slug ?? '');
    const [clientName, setClientName] = useState(project?.client_name ?? '');
    const [category, setCategory] = useState(project?.category ?? '');
    const [year, setYear] = useState(
        project?.year ? String(project.year) : String(new Date().getFullYear()),
    );
    const [bgTheme, setBgTheme] = useState<ProjectItem['bg_theme']>(
        project?.bg_theme ?? 'blue',
    );
    const [liveUrl, setLiveUrl] = useState(project?.live_url ?? '');
    const [isFeatured, setIsFeatured] = useState(project?.is_featured ?? true);
    const [sortOrder, setSortOrder] = useState(
        project?.sort_order !== undefined ? String(project.sort_order) : '0',
    );
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [removeThumbnail, setRemoveThumbnail] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        resolveStorageUrl(project?.thumbnail_path),
    );
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!thumbnailFile) {
            return;
        }

        const objectUrl = URL.createObjectURL(thumbnailFile);
        setPreviewUrl(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [thumbnailFile]);

    const handleFileChange = (file: File | null) => {
        setThumbnailFile(file);
        if (file) {
            setRemoveThumbnail(false);
        } else {
            setPreviewUrl(
                removeThumbnail
                    ? null
                    : resolveStorageUrl(project?.thumbnail_path),
            );
        }
    };

    const handleRemoveExistingThumbnail = () => {
        setThumbnailFile(null);
        setRemoveThumbnail(true);
        setPreviewUrl(null);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload: Record<string, unknown> = {
            title,
            slug,
            client_name: clientName,
            category,
            year,
            bg_theme: bgTheme,
            live_url: liveUrl,
            is_featured: isFeatured ? 1 : 0,
            sort_order: Number(sortOrder) || 0,
            remove_thumbnail: removeThumbnail ? 1 : 0,
        };

        if (thumbnailFile) {
            payload.thumbnail = thumbnailFile;
        }

        if (isEditing && project) {
            payload._method = 'put';
        }

        const targetUrl =
            isEditing && project
                ? `/admin/projects/${project.id}`
                : '/admin/projects';

        router.post(targetUrl, payload as Record<string, never>, {
            forceFormData: true,
            preserveScroll: true,
            onStart: () => {
                setProcessing(true);
                setErrors({});
            },
            onError: (validationErrors) => {
                setErrors(validationErrors);
            },
            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    return (
        <>
            <Head title={isEditing ? 'Edit Portofolio' : 'Tambah Portofolio'} />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <Link
                            href="/admin/projects"
                            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="size-4" />
                            Kembali ke daftar portofolio
                        </Link>
                        <h1 className="mt-2 text-2xl font-bold tracking-tight">
                            {isEditing
                                ? 'Edit Portofolio'
                                : 'Tambah Portofolio'}
                        </h1>
                    </div>
                </div>

                <Card className="max-w-3xl">
                    <CardHeader>
                        <CardTitle>Informasi Proyek</CardTitle>
                        <CardDescription>
                            Bila thumbnail belum diunggah, landing page akan
                            menampilkan mockup UI sesuai tema kartu.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="title">
                                        Judul Portofolio
                                    </Label>
                                    <Input
                                        id="title"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        placeholder="Contoh: Website Klinik Gigi Sehat"
                                        required
                                    />
                                    <InputError message={errors.title} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="slug">
                                        Slug URL (Opsional)
                                    </Label>
                                    <Input
                                        id="slug"
                                        value={slug}
                                        onChange={(e) =>
                                            setSlug(e.target.value)
                                        }
                                        placeholder="otomatis-dari-judul"
                                    />
                                    <InputError message={errors.slug} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="client_name">
                                        Nama Klien / Label Usaha
                                    </Label>
                                    <Input
                                        id="client_name"
                                        value={clientName}
                                        onChange={(e) =>
                                            setClientName(e.target.value)
                                        }
                                        placeholder="Klinik Gigi Harmoni"
                                        required
                                    />
                                    <InputError message={errors.client_name} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Kategori</Label>
                                    <Input
                                        id="category"
                                        value={category}
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                        placeholder="Kesehatan & Klinik"
                                        required
                                    />
                                    <InputError message={errors.category} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="year">Tahun</Label>
                                    <Input
                                        id="year"
                                        value={year}
                                        onChange={(e) =>
                                            setYear(e.target.value)
                                        }
                                        placeholder="2025"
                                        required
                                    />
                                    <InputError message={errors.year} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bg_theme">
                                        Tema Latar Kartu
                                    </Label>
                                    <Select
                                        value={bgTheme}
                                        onValueChange={(value) =>
                                            setBgTheme(
                                                value as ProjectItem['bg_theme'],
                                            )
                                        }
                                    >
                                        <SelectTrigger
                                            id="bg_theme"
                                            className="w-full"
                                        >
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="blue">
                                                Biru Brand (#1649FF)
                                            </SelectItem>
                                            <SelectItem value="dark">
                                                Obsidian Gelap (#090D16)
                                            </SelectItem>
                                            <SelectItem value="light">
                                                Slate Terang (#F6F8FB)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.bg_theme} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sort_order">
                                        Urutan Tampil
                                    </Label>
                                    <Input
                                        id="sort_order"
                                        type="number"
                                        min={0}
                                        value={sortOrder}
                                        onChange={(e) =>
                                            setSortOrder(e.target.value)
                                        }
                                    />
                                    <InputError message={errors.sort_order} />
                                </div>

                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="live_url">
                                        URL Website Live (Opsional)
                                    </Label>
                                    <Input
                                        id="live_url"
                                        type="url"
                                        value={liveUrl}
                                        onChange={(e) =>
                                            setLiveUrl(e.target.value)
                                        }
                                        placeholder="https://contoh-klien.id"
                                    />
                                    <InputError message={errors.live_url} />
                                </div>
                            </div>

                            <div className="space-y-3 rounded-lg border p-4">
                                <Label htmlFor="thumbnail">
                                    Gambar Thumbnail (Maks. 2MB)
                                </Label>
                                <Input
                                    id="thumbnail"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleFileChange(
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                />
                                <InputError message={errors.thumbnail} />

                                {previewUrl ? (
                                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end">
                                        <img
                                            src={previewUrl}
                                            alt="Pratinjau thumbnail"
                                            className="h-36 w-56 rounded-lg border object-cover"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={
                                                handleRemoveExistingThumbnail
                                            }
                                        >
                                            <Trash2 className="size-3.5" />
                                            Hapus Gambar
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <ImagePlus className="size-4" />
                                        <span>
                                            Belum ada gambar. Tampilan memakai
                                            frame mockup bawaan.
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="is_featured"
                                    checked={isFeatured}
                                    onCheckedChange={(checked) =>
                                        setIsFeatured(Boolean(checked))
                                    }
                                />
                                <Label htmlFor="is_featured">
                                    Tampilkan di halaman utama (Featured)
                                </Label>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 pt-2">
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? 'Menyimpan...'
                                        : isEditing
                                          ? 'Simpan Perubahan'
                                          : 'Simpan Portofolio'}
                                </Button>
                                <Button asChild type="button" variant="outline">
                                    <Link href="/admin/projects">Batal</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

ProjectForm.layout = {
    breadcrumbs: [
        {
            title: 'Portofolio',
            href: '/admin/projects',
        },
        {
            title: 'Formulir',
            href: '#',
        },
    ],
};
