import type { SiteSettings } from '@/types';

export const DEFAULT_WA_MESSAGE =
    'Halo kawandigital.id, saya ingin konsultasi pembuatan website bisnis.';

/**
 * Resolve a safe WhatsApp URL from shared Inertia siteSettings.
 * Returns null when neither a valid URL nor a valid phone number is configured.
 */
export function resolveWhatsAppHref(
    siteSettings?: SiteSettings,
    customMessage?: string,
): string | null {
    const rawUrl = siteSettings?.whatsapp_url?.trim();
    const message =
        customMessage?.trim() ||
        siteSettings?.whatsapp_message?.trim() ||
        DEFAULT_WA_MESSAGE;

    if (rawUrl && /^https?:\/\//i.test(rawUrl)) {
        if (rawUrl.includes('text=')) {
            return rawUrl;
        }

        const separator = rawUrl.includes('?') ? '&' : '?';

        return `${rawUrl}${separator}text=${encodeURIComponent(message)}`;
    }

    const rawPhone = (
        siteSettings?.whatsapp_number ??
        siteSettings?.whatsapp ??
        siteSettings?.phone ??
        ''
    ).trim();

    const digits = rawPhone.replace(/\D/g, '');

    if (digits.length < 8) {
        return null;
    }

    const normalized = digits.startsWith('0') ? `62${digits.slice(1)}` : digits;

    return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

/**
 * Return the raw WhatsApp number/label for display when configured in siteSettings.
 */
export function formatWhatsAppDisplay(
    siteSettings?: SiteSettings,
): string | null {
    const raw = (
        siteSettings?.whatsapp_number ??
        siteSettings?.whatsapp ??
        siteSettings?.phone ??
        ''
    ).trim();

    return raw.length > 0 ? raw : null;
}

