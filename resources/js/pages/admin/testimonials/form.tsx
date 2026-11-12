import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Trash2 } from 'lucide-react';
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
import type { TestimonialItem } from '@/types';

type TestimonialFormProps = {
    testimonial: TestimonialItem | null;
};

export default function TestimonialForm({ testimonial }: TestimonialFormProps) {
    const isEditing = testimonial !== null;

    const [clientName, setClientName] = useState(
        testimonial?.client_name ?? '',
    );
    const [businessName, setBusinessName] = useState(
        testimonial?.business_name ?? '',
    );
    const [quote, setQuote] = useState(testimonial?.quote ?? '');
    const [rating, setRating] = useState(
        testimonial?.rating ? String(testimonial.rating) : '5',
    );
    const [cardType, setCardType] = useState<TestimonialItem['card_type']>(
        testimonial?.card_type ?? 'text',
    );
    const [isActive, setIsActive] = useState(testimonial?.is_active ?? true);
    const [sortOrder, setSortOrder] = useState(
        testimonial?.sort_order !== undefined
            ? String(testimonial.sort_order)
            : '0',
    );
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [removeAvatar, setRemoveAvatar] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        resolveStorageUrl(testimonial?.avatar_path),
    );
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!avatarFile) {
            return;
        }

        const objectUrl = URL.createObjectURL(avatarFile);
        setPreviewUrl(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [avatarFile]);

    const handleFileChange = (file: File | null) => {
        setAvatarFile(file);
        if (file) {
            setRemoveAvatar(false);
        } else {
            setPreviewUrl(
                removeAvatar
                    ? null
                    : resolveStorageUrl(testimonial?.avatar_path),
            );
        }
    };

    const handleRemoveExistingAvatar = () => {
        setAvatarFile(null);
        setRemoveAvatar(true);
        setPreviewUrl(null);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload: Record<string, unknown> = {
            client_name: clientName,
            business_name: businessName,
            quote,
            rating: Number(rating) || 5,
            card_type: cardType,
            is_active: isActive ? 1 : 0,
            sort_order: Number(sortOrder) || 0,
            remove_avatar: removeAvatar ? 1 : 0,
        };

        if (avatarFile) {
            payload.avatar = avatarFile;
        }

        if (isEditing && testimonial) {
            payload._method = 'put';
        }

        const targetUrl =
            isEditing && testimonial
                ? `/admin/testimonials/${testimonial.id}`
                : '/admin/testimonials';

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
            <Head title={isEditing ? 'Edit Testimoni' : 'Tambah Testimoni'} />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div>
                    <Link
                        href="/admin/testimonials"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="size-4" />
                        Kembali ke daftar testimoni
                    </Link>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight">
                        {isEditing ? 'Edit Testimoni' : 'Tambah Testimoni'}
                    </h1>
                </div>

                <Card className="max-w-3xl">
                    <CardHeader>
                        <CardTitle>Detail Testimoni Klien</CardTitle>
                        <CardDescription>
                            Pastikan nama klien, jenis usaha, dan kutipan
                            berasal dari ulasan asli klien.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="client_name">
                                        Nama Klien
                                    </Label>
                                    <Input
                                        id="client_name"
                                        value={clientName}
                                        onChange={(e) =>
                                            setClientName(e.target.value)
                                        }
                                        placeholder="drg. Rina Kusuma"
                                        required
                                    />
                                    <InputError message={errors.client_name} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="business_name">
                                        Nama Usaha
                                    </Label>
                                    <Input
                                        id="business_name"
                                        value={businessName}
                                        onChange={(e) =>
                                            setBusinessName(e.target.value)
                                        }
                                        placeholder="Klinik Gigi Harmoni Sidoarjo"
                                        required
                                    />
                                    <InputError
                                        message={errors.business_name}
                                    />
                                </div>

                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="quote">
                                        Kutipan Ulasan
                                    </Label>
                                    <textarea
                                        id="quote"
                                        rows={3}
                                        value={quote}
                                        onChange={(e) =>
                                            setQuote(e.target.value)
                                        }
                                        required
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                    />
                                    <InputError message={errors.quote} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="rating">Rating (1-5)</Label>
                                    <Select
                                        value={rating}
                                        onValueChange={setRating}
                                    >
                                        <SelectTrigger
                                            id="rating"
                                            className="w-full"
                                        >
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="5">
                                                5 Bintang
                                            </SelectItem>
                                            <SelectItem value="4">
                                                4 Bintang
                                            </SelectItem>
                                            <SelectItem value="3">
                                                3 Bintang
                                            </SelectItem>
                                            <SelectItem value="2">
                                                2 Bintang
                                            </SelectItem>
                                            <SelectItem value="1">
                                                1 Bintang
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.rating} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="card_type">
                                        Gaya Kartu Testimoni
                                    </Label>
                                    <Select
                                        value={cardType}
                                        onValueChange={(value) =>
                                            setCardType(
                                                value as TestimonialItem['card_type'],
                                            )
                                        }
                                    >
                                        <SelectTrigger
                                            id="card_type"
                                            className="w-full"
                                        >
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="text">
                                                Kartu Terang (Teks)
                                            </SelectItem>
                                            <SelectItem value="photo">
                                                Kartu Gelap (Foto)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.card_type} />
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
                            </div>

                            <div className="space-y-3 rounded-lg border p-4">
                                <Label htmlFor="avatar">
                                    Foto / Avatar Klien (Opsional, Maks. 2MB)
                                </Label>
                                <Input
                                    id="avatar"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleFileChange(
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                />
                                <InputError message={errors.avatar} />

                                {previewUrl && (
                                    <div className="mt-2 flex items-center gap-4">
                                        <img
                                            src={previewUrl}
                                            alt="Pratinjau avatar"
                                            className="size-16 rounded-full border object-cover"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={handleRemoveExistingAvatar}
                                        >
                                            <Trash2 className="size-3.5" />
                                            Hapus Foto
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="is_active"
                                    checked={isActive}
                                    onCheckedChange={(checked) =>
                                        setIsActive(Boolean(checked))
                                    }
                                />
                                <Label htmlFor="is_active">
                                    Aktifkan dan tampilkan di halaman utama
                                </Label>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 pt-2">
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? 'Menyimpan...'
                                        : isEditing
                                          ? 'Simpan Perubahan'
                                          : 'Simpan Testimoni'}
                                </Button>
                                <Button asChild type="button" variant="outline">
                                    <Link href="/admin/testimonials">
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

TestimonialForm.layout = {
    breadcrumbs: [
        {
            title: 'Testimoni',
            href: '/admin/testimonials',
        },
        {
            title: 'Formulir',
            href: '#',
        },
    ],
};
