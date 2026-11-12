import type { Auth } from '@/types/auth';
import type { SiteSettings } from '@/types/ui';

declare module 'react' {
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            siteSettings?: SiteSettings;
            flash?: {
                success?: string | null;
            };
            [key: string]: unknown;
        };
    }
}
