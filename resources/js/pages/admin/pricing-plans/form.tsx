import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import type { FormEvent } from 'react';
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
import type { PricingPlanItem } from '@/types';

type PricingPlanFormProps = {
    pricingPlan: PricingPlanItem | null;
};

type PricingPlanFormData = {
    name: string;
    price_label: string;
    billing_note: string;
    description: string;
    features: string[];
    is_highlighted: boolean;
    cta_text: string;
    whatsapp_message: string;
    sort_order: number;
};

export default function PricingPlanForm({ pricingPlan }: PricingPlanFormProps) {
    const isEditing = pricingPlan !== null;

    const { data, setData, post, put, processing, errors } =
        useForm<PricingPlanFormData>({
            name: pricingPlan?.name ?? '',
            price_label: pricingPlan?.price_label ?? '',
            billing_note: pricingPlan?.billing_note ?? '',
            description: pricingPlan?.description ?? '',
            features:
                pricingPlan?.features && pricingPlan.features.length > 0
                    ? pricingPlan.features
                    : [''],
            is_highlighted: pricingPlan?.is_highlighted ?? false,
            cta_text: pricingPlan?.cta_text ?? 'Konsultasi Paket Ini',
            whatsapp_message: pricingPlan?.whatsapp_message ?? '',
            sort_order: pricingPlan?.sort_order ?? 0,
        });

    const handleFeatureChange = (index: number, value: string) => {
        const next = [...data.features];
        next[index] = value;
        setData('features', next);
    };

    const handleAddFeature = () => {
        setData('features', [...data.features, '']);
    };

    const handleRemoveFeature = (index: number) => {
        if (data.features.length <= 1) {
            return;
        }
        setData(
            'features',
            data.features.filter((_, i) => i !== index),
        );
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isEditing && pricingPlan) {
            put(`/admin/pricing-plans/${pricingPlan.id}`, {
                preserveScroll: true,
            });
            return;
        }

        post('/admin/pricing-plans', {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head
                title={isEditing ? 'Edit Paket Harga' : 'Tambah Paket Harga'}
            />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div>
                    <Link
                        href="/admin/pricing-plans"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="size-4" />
                        Kembali ke daftar paket
                    </Link>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight">
                        {isEditing ? 'Edit Paket Harga' : 'Tambah Paket Harga'}
                    </h1>
                </div>

                <Card className="max-w-3xl">
                    <CardHeader>
                        <CardTitle>Detail Paket & Fitur</CardTitle>
                        <CardDescription>
                            Pastikan minimal satu baris fitur terisi sebelum
                            menyimpan.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Paket</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        placeholder="Bisnis Lengkap"
                                        required
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="price_label">
                                        Label Harga
                                    </Label>
                                    <Input
                                        id="price_label"
                                        value={data.price_label}
                                        onChange={(e) =>
                                            setData(
                                                'price_label',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Rp 2.750.000"
                                        required
                                    />
                                    <InputError message={errors.price_label} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="billing_note">
                                        Catatan Pembayaran
                                    </Label>
                                    <Input
                                        id="billing_note"
                                        value={data.billing_note}
                                        onChange={(e) =>
                                            setData(
                                                'billing_note',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Termasuk domain & hosting tahun ke-1"
                                        required
                                    />
                                    <InputError message={errors.billing_note} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="cta_text">
                                        Teks Tombol CTA
                                    </Label>
                                    <Input
                                        id="cta_text"
                                        value={data.cta_text}
                                        onChange={(e) =>
                                            setData('cta_text', e.target.value)
                                        }
                                        placeholder="Pilih Bisnis Lengkap"
                                        required
                                    />
                                    <InputError message={errors.cta_text} />
                                </div>

                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="description">
                                        Deskripsi Singkat
                                    </Label>
                                    <textarea
                                        id="description"
                                        rows={2}
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="whatsapp_message">
                                        Pesan WhatsApp Pra-isi (Opsional)
                                    </Label>
                                    <Input
                                        id="whatsapp_message"
                                        value={data.whatsapp_message}
                                        onChange={(e) =>
                                            setData(
                                                'whatsapp_message',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Halo kawandigital.id, saya ingin konsultasi paket Bisnis Lengkap."
                                    />
                                    <InputError
                                        message={errors.whatsapp_message}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sort_order">
                                        Urutan Tampil
                                    </Label>
                                    <Input
                                        id="sort_order"
                                        type="number"
                                        min={0}
                                        value={data.sort_order}
                                        onChange={(e) =>
                                            setData(
                                                'sort_order',
                                                Number(e.target.value) || 0,
                                            )
                                        }
                                    />
                                    <InputError message={errors.sort_order} />
                                </div>

                                <div className="flex items-center gap-3 self-end pb-2">
                                    <Checkbox
                                        id="is_highlighted"
                                        checked={data.is_highlighted}
                                        onCheckedChange={(checked) =>
                                            setData(
                                                'is_highlighted',
                                                Boolean(checked),
                                            )
                                        }
                                    />
                                    <Label htmlFor="is_highlighted">
                                        Tandai sebagai Paket Unggulan
                                    </Label>
                                </div>
                            </div>

                            <div className="space-y-3 rounded-lg border p-4">
                                <div className="flex items-center justify-between gap-2">
                                    <div>
                                        <Label>Daftar Fitur Paket</Label>
                                        <p className="text-xs text-muted-foreground">
                                            Tambahkan atau atur baris fitur yang
                                            akan ditampilkan dengan ikon
                                            centang.
                                        </p>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleAddFeature}
                                    >
                                        <Plus className="size-3.5" />
                                        Tambah Fitur
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    {data.features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <Input
                                                value={feature}
                                                onChange={(e) =>
                                                    handleFeatureChange(
                                                        index,
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder={`Fitur ke-${index + 1}`}
                                                aria-label={`Fitur ke-${index + 1}`}
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                disabled={
                                                    data.features.length <= 1
                                                }
                                                onClick={() =>
                                                    handleRemoveFeature(index)
                                                }
                                                aria-label={`Hapus fitur ke-${index + 1}`}
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                                <InputError message={errors.features} />
                            </div>

                            <div className="flex flex-wrap items-center gap-3 pt-2">
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? 'Menyimpan...'
                                        : isEditing
                                          ? 'Simpan Perubahan'
                                          : 'Simpan Paket'}
                                </Button>
                                <Button asChild type="button" variant="outline">
                                    <Link href="/admin/pricing-plans">
                                        Batal
                                    </Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

PricingPlanForm.layout = {
    breadcrumbs: [
        {
            title: 'Paket Harga',
            href: '/admin/pricing-plans',
        },
        {
            title: 'Formulir',
            href: '#',
        },
    ],
};
