import { usePage } from '@inertiajs/react';
import { CheckCircle2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function FlashBanner() {
    const { flash } = usePage().props;
    const message = flash?.success ?? null;
    const [dismissedMessage, setDismissedMessage] = useState<string | null>(
        null,
    );

    useEffect(() => {
        if (message && message !== dismissedMessage) {
            setDismissedMessage(null);
        }
    }, [message, dismissedMessage]);

    if (!message || message === dismissedMessage) {
        return null;
    }

    return (
        <Alert
            role="status"
            className="border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-100"
        >
            <CheckCircle2 className="text-emerald-600 dark:text-emerald-400" />
            <div className="flex items-start justify-between gap-4">
                <div>
                    <AlertTitle className="font-semibold">Berhasil</AlertTitle>
                    <AlertDescription className="text-emerald-800 dark:text-emerald-200">
                        {message}
                    </AlertDescription>
                </div>
                <button
                    type="button"
                    onClick={() => setDismissedMessage(message)}
                    aria-label="Tutup notifikasi"
                    className="rounded-md p-1 text-emerald-700 transition-colors hover:bg-emerald-100 dark:text-emerald-300 dark:hover:bg-emerald-900/60"
                >
                    <X className="size-4" />
                </button>
            </div>
        </Alert>
    );
}

