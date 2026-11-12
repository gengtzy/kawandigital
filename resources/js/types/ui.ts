import type { ReactNode } from 'react';
import type { BreadcrumbItem } from '@/types/navigation';

export type AppLayoutProps = {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
};

export type AppVariant = 'header' | 'sidebar';

export type FlashToast = {
    type: 'success' | 'info' | 'warning' | 'error';
    message: string;
};

export type AuthLayoutProps = {
    children?: ReactNode;
    name?: string;
    title?: string;
    description?: string;
};

export type SiteSettings = {
    site_name?: string | null;
    tagline?: string | null;
    whatsapp?: string | null;
    whatsapp_number?: string | null;
    whatsapp_url?: string | null;
    whatsapp_message?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    city?: string | null;
    working_hours?: string | null;
    instagram_url?: string | null;
    [key: string]: unknown;
};

export type PublicLayoutProps = {
    children: ReactNode;
    siteSettings?: SiteSettings;
    footerTopSlot?: ReactNode;
};
