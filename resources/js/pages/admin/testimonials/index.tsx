import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Star, Trash2 } from 'lucide-react';
import FlashBanner from '@/components/admin/flash-banner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { resolveStorageUrl } from '@/lib/storage';
import type { TestimonialItem } from '@/types';

type TestimonialsIndexProps = {
    testimonials: TestimonialItem[];
};

export default function TestimonialsIndex({
    testimonials,
}: TestimonialsIndexProps) {
    const handleToggleActive = (item: TestimonialItem) => {
        router.patch(
            `/admin/testimonials/${item.id}/toggle-active`,
            {},
            { preserveScroll: true },
        );
    };

    const handleDelete = (item: TestimonialItem) => {
        if (
            !window.confirm(
                `Hapus testimoni dari "${item.client_name}"? Tindakan ini tidak dapat dibatalkan.`,
            )
        ) {
            return;
        }

        router.delete(`/admin/testimonials/${item.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Kelola Testimoni" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <FlashBanner />

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Testimoni Klien
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Kelola ulasan pemilik usaha yang ditampilkan di
                            halaman utama.
                        </p>
                    </div>

                    <Button asChild>
                        <Link href="/admin/testimonials/create">
                            <Plus className="size-4" />
                            Tambah Testimoni
                        </Link>
                    </Button>
                </div>

                {testimonials.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                            <p className="text-sm text-muted-foreground">
                                Belum ada testimoni tersimpan.
                            </p>
                            <Button asChild size="sm">
                                <Link href="/admin/testimonials/create">
                                    Tambah Testimoni Pertama
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="py-0">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[780px] text-left text-sm">
                                <thead className="border-b bg-muted/40 text-xs font-semibold text-muted-foreground uppercase">
                                    <tr>
                                        <th className="px-4 py-3">Klien</th>
                                        <th className="px-4 py-3">Ulasan</th>
                                        <th className="px-4 py-3">Rating</th>
                                        <th className="px-4 py-3">Tipe</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3 text-right">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {testimonials.map((item) => {
                                        const avatarUrl = resolveStorageUrl(
                                            item.avatar_path,
                                        );

                                        return (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-muted/20"
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        {avatarUrl ? (
                                                            <img
                                                                src={avatarUrl}
                                                                alt={
                                                                    item.client_name
                                                                }
                                                                width={40}
                                                                height={40}
                                                                className="size-10 shrink-0 rounded-full border object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                                                                {item.client_name
                                                                    .slice(0, 2)
                                                                    .toUpperCase()}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <div className="font-semibold">
                                                                {
                                                                    item.client_name
                                                                }
                                                            </div>
                                                            <div className="text-xs text-muted-foreground">
                                                                {
                                                                    item.business_name
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <p className="line-clamp-2 max-w-sm text-xs text-muted-foreground">
                                                        {item.quote}
                                                    </p>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="inline-flex items-center gap-1 text-xs font-medium">
                                                        <Star className="size-3.5 fill-amber-400 text-amber-400" />
                                                        {item.rating}/5
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Badge variant="outline">
                                                        {item.card_type ===
                                                        'photo'
                                                            ? 'Gelap / Foto'
                                                            : 'Terang / Teks'}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Button
                                                        type="button"
                                                        variant={
                                                            item.is_active
                                                                ? 'default'
                                                                : 'secondary'
                                                        }
                                                        size="sm"
                                                        onClick={() =>
                                                            handleToggleActive(
                                                                item,
                                                            )
                                                        }
                                                    >
                                                        {item.is_active
                                                            ? 'Aktif'
                                                            : 'Nonaktif'}
                                                    </Button>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            asChild
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            <Link
                                                                href={`/admin/testimonials/${item.id}/edit`}
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
                                                                    item,
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

TestimonialsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Testimoni',
            href: '/admin/testimonials',
        },
    ],
};
