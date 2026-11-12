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
    brand_name?: string | null;
    site_name?: string | null;
    tagline?: string | null;
    hero_title?: string | null;
    hero_subtitle?: string | null;
    whatsapp?: string | null;
    whatsapp_number?: string | null;
    whatsapp_url?: string | null;
    whatsapp_message?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    city?: string | null;
    operational_hours?: string | null;
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
    sort_order?: number;
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
    is_featured?: boolean;
    sort_order?: number;
};

export type TestimonialItem = {
    id: number | string;
    client_name: string;
    business_name: string;
    quote: string;
    rating: number;
    avatar_path?: string | null;
    card_type: 'photo' | 'text';
    is_active?: boolean;
    sort_order?: number;
};

export type FaqItem = {
    id: number | string;
    question: string;
    answer: string;
    sort_order?: number;
    is_active?: boolean;
};

export type AdminDashboardStats = {
    projects_count: number;
    featured_projects_count: number;
    pricing_plans_count: number;
    active_testimonials_count: number;
    total_testimonials_count: number;
    active_faqs_count: number;
    total_faqs_count: number;
};
