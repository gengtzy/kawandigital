import { Head } from '@inertiajs/react';
import AboutBentoSection from '@/components/landing/about-bento-section';
import DeliverablesSection from '@/components/landing/deliverables-section';
import HeroSection from '@/components/landing/hero-section';
import ProblemSection from '@/components/landing/problem-section';
import PublicLayout from '@/layouts/public-layout';

export default function Home() {
    return (
        <PublicLayout>
            <Head title="kawandigital.id | Jasa Pembuatan Website Bisnis" />
            <HeroSection />
            <AboutBentoSection />
            <ProblemSection />
            <DeliverablesSection />
        </PublicLayout>
    );
}

