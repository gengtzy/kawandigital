import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import FlashBanner from '@/components/admin/flash-banner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { FaqItem } from '@/types';

type FaqsIndexProps = {
    faqs: FaqItem[];
};

export default function FaqsIndex({ faqs }: FaqsIndexProps) {
    const handleToggleActive = (faq: FaqItem) => {
        router.patch(
            `/admin/faqs/${faq.id}/toggle-active`,
            {},
            { preserveScroll: true },
        );
    };

    const handleDelete = (faq: FaqItem) => {
        if (
            !window.confirm(
                `Hapus pertanyaan "${faq.question}"? Tindakan ini tidak dapat dibatalkan.`,
            )
        ) {
            return;
        }

        router.delete(`/admin/faqs/${faq.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Kelola FAQ" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <FlashBanner />

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            FAQ (Pertanyaan Umum)
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Kelola daftar pertanyaan dan jawaban seputar layanan
                            pembuatan website.
                        </p>
                    </div>

                    <Button asChild>
                        <Link href="/admin/faqs/create">
                            <Plus className="size-4" />
                            Tambah FAQ
                        </Link>
                    </Button>
                </div>

                {faqs.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                            <p className="text-sm text-muted-foreground">
                                Belum ada pertanyaan FAQ tersimpan.
                            </p>
                            <Button asChild size="sm">
                                <Link href="/admin/faqs/create">
                                    Tambah FAQ Pertama
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="py-0">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[720px] text-left text-sm">
                                <thead className="border-b bg-muted/40 text-xs font-semibold text-muted-foreground uppercase">
                                    <tr>
                                        <th className="px-4 py-3">Urutan</th>
                                        <th className="px-4 py-3">
                                            Pertanyaan & Jawaban
                                        </th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3 text-right">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {faqs.map((faq) => (
                                        <tr
                                            key={faq.id}
                                            className="hover:bg-muted/20"
                                        >
                                            <td className="px-4 py-3 font-mono text-xs">
                                                {faq.sort_order ?? 0}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="font-semibold">
                                                    {faq.question}
                                                </div>
                                                <p className="mt-0.5 line-clamp-2 max-w-xl text-xs text-muted-foreground">
                                                    {faq.answer}
                                                </p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <Button
                                                    type="button"
                                                    variant={
                                                        faq.is_active
                                                            ? 'default'
                                                            : 'secondary'
                                                    }
                                                    size="sm"
                                                    onClick={() =>
                                                        handleToggleActive(faq)
                                                    }
                                                >
                                                    {faq.is_active
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
                                                            href={`/admin/faqs/${faq.id}/edit`}
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
                                                            handleDelete(faq)
                                                        }
                                                    >
                                                        <Trash2 className="size-3.5" />
                                                        Hapus
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}
            </div>
        </>
    );
}

FaqsIndex.layout = {
    breadcrumbs: [
        {
            title: 'FAQ',
            href: '/admin/faqs',
        },
    ],
};
