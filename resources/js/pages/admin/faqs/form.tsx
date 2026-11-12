import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
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
import type { FaqItem } from '@/types';

type FaqFormProps = {
    faq: FaqItem | null;
};

type FaqFormData = {
    question: string;
    answer: string;
    sort_order: number;
    is_active: boolean;
};

export default function FaqForm({ faq }: FaqFormProps) {
    const isEditing = faq !== null;

    const { data, setData, post, put, processing, errors } =
        useForm<FaqFormData>({
            question: faq?.question ?? '',
            answer: faq?.answer ?? '',
            sort_order: faq?.sort_order ?? 0,
            is_active: faq?.is_active ?? true,
        });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isEditing && faq) {
            put(`/admin/faqs/${faq.id}`, {
                preserveScroll: true,
            });
            return;
        }

        post('/admin/faqs', {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title={isEditing ? 'Edit FAQ' : 'Tambah FAQ'} />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <div>
                    <Link
                        href="/admin/faqs"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="size-4" />
                        Kembali ke daftar FAQ
                    </Link>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight">
                        {isEditing ? 'Edit FAQ' : 'Tambah FAQ'}
                    </h1>
                </div>

                <Card className="max-w-3xl">
                    <CardHeader>
                        <CardTitle>Pertanyaan & Jawaban</CardTitle>
                        <CardDescription>
                            Tulis jawaban yang lugas agar calon klien langsung
                            memahami prosedur layanan.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="question">Pertanyaan</Label>
                                <Input
                                    id="question"
                                    value={data.question}
                                    onChange={(e) =>
                                        setData('question', e.target.value)
                                    }
                                    placeholder="Berapa lama waktu pengerjaan website?"
                                    required
                                />
                                <InputError message={errors.question} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="answer">Jawaban</Label>
                                <textarea
                                    id="answer"
                                    rows={4}
                                    value={data.answer}
                                    onChange={(e) =>
                                        setData('answer', e.target.value)
                                    }
                                    required
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                />
                                <InputError message={errors.answer} />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
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
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) =>
                                            setData(
                                                'is_active',
                                                Boolean(checked),
                                            )
                                        }
                                    />
                                    <Label htmlFor="is_active">
                                        Aktifkan di halaman utama
                                    </Label>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 pt-2">
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? 'Menyimpan...'
                                        : isEditing
                                          ? 'Simpan Perubahan'
                                          : 'Simpan FAQ'}
                                </Button>
                                <Button asChild type="button" variant="outline">
                                    <Link href="/admin/faqs">Batal</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

FaqForm.layout = {
    breadcrumbs: [
        {
            title: 'FAQ',
            href: '/admin/faqs',
        },
        {
            title: 'Formulir',
            href: '#',
        },
    ],
};
