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

export type PricingPlanItem = {
    id: number | string;
    name: string;
    price_label: string;
    billing_note: string;
    description: string;
    features: string[];
    is_highlighted: boolean;
    cta_text: string;
    whatsapp_message?: string | null;
};

export type ProjectItem = {
    id: number | string;
    title: string;
    slug: string;
    client_name: string;
    category: string;
    year: string | number;
    thumbnail_path?: string | null;
    bg_theme: 'blue' | 'dark' | 'light';
    live_url?: string | null;
};

export type TestimonialItem = {
    id: number | string;
    client_name: string;
    business_name: string;
    quote: string;
    rating: number;
    card_type: 'photo' | 'text';
};

export type FaqItem = {
    id: number | string;
    question: string;
    answer: string;
};
