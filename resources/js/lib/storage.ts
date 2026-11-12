/**
 * Resolve a public storage URL from a relative disk path stored in the database.
 */
export function resolveStorageUrl(path?: string | null): string | null {
    const trimmed = path?.trim();

    if (!trimmed) {
        return null;
    }

    if (
        trimmed.startsWith('http://') ||
        trimmed.startsWith('https://') ||
        trimmed.startsWith('blob:') ||
        trimmed.startsWith('data:') ||
        trimmed.startsWith('/')
    ) {
        return trimmed;
    }

    return `/storage/${trimmed}`;
}

