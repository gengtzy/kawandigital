import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import FlashBanner from '@/components/admin/flash-banner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { PricingPlanItem } from '@/types';

type PricingPlansIndexProps = {
    pricingPlans: PricingPlanItem[];
};

export default function PricingPlansIndex({
    pricingPlans,
}: PricingPlansIndexProps) {
    const handleDelete = (plan: PricingPlanItem) => {
        if (
            !window.confirm(
                `Hapus paket "${plan.name}"? Tindakan ini tidak dapat dibatalkan.`,
            )
        ) {
            return;
        }

        router.delete(`/admin/pricing-plans/${plan.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Kelola Paket Harga" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <FlashBanner />

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Paket Harga
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Atur daftar paket, fitur yang tercakup, serta pesan
                            WhatsApp otomatis tiap paket.
                        </p>
                    </div>

                    <Button asChild>
                        <Link href="/admin/pricing-plans/create">
                            <Plus className="size-4" />
                            Tambah Paket
                        </Link>
                    </Button>
                </div>

                {pricingPlans.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                            <p className="text-sm text-muted-foreground">
                                Belum ada paket harga terdaftar.
                            </p>
                            <Button asChild size="sm">
                                <Link href="/admin/pricing-plans/create">
                                    Tambah Paket Pertama
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="py-0">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[740px] text-left text-sm">
                                <thead className="border-b bg-muted/40 text-xs font-semibold text-muted-foreground uppercase">
                                    <tr>
                                        <th className="px-4 py-3">
                                            Nama Paket
                                        </th>
                                        <th className="px-4 py-3">Harga</th>
                                        <th className="px-4 py-3">Fitur</th>
                                        <th className="px-4 py-3">Sorotan</th>
                                        <th className="px-4 py-3">Urutan</th>
                                        <th className="px-4 py-3 text-right">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {pricingPlans.map((plan) => (
                                        <tr
                                            key={plan.id}
                                            className="hover:bg-muted/20"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="font-semibold">
                                                    {plan.name}
                                                </div>
                                                <div className="mt-0.5 line-clamp-1 max-w-xs text-xs text-muted-foreground">
                                                    {plan.description}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="font-semibold">
                                                    {plan.price_label}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {plan.billing_note}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {plan.features.length} item
                                                fitur
                                            </td>
                                            <td className="px-4 py-3">
                                                {plan.is_highlighted ? (
                                                    <Badge variant="default">
                                                        Paket Unggulan
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary">
                                                        Standar
                                                    </Badge>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 font-mono text-xs">
                                                {plan.sort_order ?? 0}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        asChild
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <Link
                                                            href={`/admin/pricing-plans/${plan.id}/edit`}
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
                                                            handleDelete(plan)
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

PricingPlansIndex.layout = {
    breadcrumbs: [
        {
            title: 'Paket Harga',
            href: '/admin/pricing-plans',
        },
    ],
};
