import { Head, useForm } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';
import type { FormEvent } from 'react';
import FlashBanner from '@/components/admin/flash-banner';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resolveWhatsAppHref } from '@/lib/whatsapp';

type SiteSettingsFormProps = {
    settings: {
        brand_name: string;
        whatsapp_number: string;
        whatsapp_message: string;
        email: string;
        address: string;
        operational_hours: string;
        hero_title: string;
        hero_subtitle: string;
    };
};

export default function SiteSettingsIndex({ settings }: SiteSettingsFormProps) {
    const { data, setData, put, processing, errors } = useForm({
        brand_name: settings.brand_name ?? 'kawandigital.id',
        whatsapp_number: settings.whatsapp_number ?? '',
        whatsapp_message: settings.whatsapp_message ?? '',
        email: settings.email ?? '',
        address: settings.address ?? '',
        operational_hours: settings.operational_hours ?? '',
        hero_title: settings.hero_title ?? '',
        hero_subtitle: settings.hero_subtitle ?? '',
    });

    const previewWhatsAppUrl = resolveWhatsAppHref({
        whatsapp_number: data.whatsapp_number,
        whatsapp_message: data.whatsapp_message,
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        put('/admin/settings', {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Pengaturan Situs" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <FlashBanner />

                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Pengaturan Situs
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Atur identitas brand, nomor WhatsApp, kontak footer, dan
                        teks utama bagian Hero.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Kontak & WhatsApp</CardTitle>
                            <CardDescription>
                                Seluruh tombol konsultasi dan informasi kontak
                                di footer menggunakan pengaturan di bawah ini.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="brand_name">
                                        Nama Brand
                                    </Label>
                                    <Input
                                        id="brand_name"
                                        value={data.brand_name}
                                        onChange={(e) =>
                                            setData(
                                                'brand_name',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                    <InputError message={errors.brand_name} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="whatsapp_number">
                                        Nomor WhatsApp (Format 628xxx)
                                    </Label>
                                    <Input
                                        id="whatsapp_number"
                                        value={data.whatsapp_number}
                                        onChange={(e) =>
                                            setData(
                                                'whatsapp_number',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="6281234567890"
                                    />
                                    <InputError
                                        message={errors.whatsapp_number}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Kontak</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        placeholder="halo@kawandigital.id"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="operational_hours">
                                        Jam Operasional
                                    </Label>
                                    <Input
                                        id="operational_hours"
                                        value={data.operational_hours}
                                        onChange={(e) =>
                                            setData(
                                                'operational_hours',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Senin - Sabtu, 08.00 - 17.00 WIB"
                                    />
                                    <InputError
                                        message={errors.operational_hours}
                                    />
                                </div>

                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="address">
                                        Lokasi / Alamat
                                    </Label>
                                    <Input
                                        id="address"
                                        value={data.address}
                                        onChange={(e) =>
                                            setData('address', e.target.value)
                                        }
                                        placeholder="Sidoarjo, Jawa Timur"
                                    />
                                    <InputError message={errors.address} />
                                </div>

                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="whatsapp_message">
                                        Pesan Default WhatsApp
                                    </Label>
                                    <textarea
                                        id="whatsapp_message"
                                        rows={2}
                                        value={data.whatsapp_message}
                                        onChange={(e) =>
                                            setData(
                                                'whatsapp_message',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                    />
                                    <InputError
                                        message={errors.whatsapp_message}
                                    />
                                </div>
                            </div>

                            <div className="rounded-lg border bg-muted/40 p-3.5 text-sm">
                                <p className="text-xs font-medium text-muted-foreground">
                                    Pratinjau Tautan WhatsApp (wa.me)
                                </p>
                                {previewWhatsAppUrl ? (
                                    <a
                                        href={previewWhatsAppUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs break-all text-brand-blue hover:underline"
                                    >
                                        <span>{previewWhatsAppUrl}</span>
                                        <ExternalLink className="size-3.5 shrink-0" />
                                    </a>
                                ) : (
                                    <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                                        Masukkan minimal 8 digit nomor WhatsApp
                                        untuk mengaktifkan tombol konsultasi.
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Teks Utama Hero</CardTitle>
                            <CardDescription>
                                Bagian teks setelah tanda koma terakhir pada
                                judul utama otomatis diberi warna biru brand.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="hero_title">
                                    Judul Utama Hero
                                </Label>
                                <Input
                                    id="hero_title"
                                    value={data.hero_title}
                                    onChange={(e) =>
                                        setData('hero_title', e.target.value)
                                    }
                                    required
                                />
                                <InputError message={errors.hero_title} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="hero_subtitle">
                                    Subjudul Hero
                                </Label>
                                <textarea
                                    id="hero_subtitle"
                                    rows={3}
                                    value={data.hero_subtitle}
                                    onChange={(e) =>
                                        setData('hero_subtitle', e.target.value)
                                    }
                                    required
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                />
                                <InputError message={errors.hero_subtitle} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center gap-3">
                        <Button type="submit" disabled={processing}>
                            {processing
                                ? 'Menyimpan...'
                                : 'Simpan Pengaturan Situs'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

SiteSettingsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Pengaturan Situs',
            href: '/admin/settings',
        },
    ],
};
