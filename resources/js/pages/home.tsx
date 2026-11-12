import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import AboutBentoSection from '@/components/landing/about-bento-section';
import BottomCtaSection from '@/components/landing/bottom-cta-section';
import DeliverablesSection from '@/components/landing/deliverables-section';
import FaqSection from '@/components/landing/faq-section';
import HeroSection from '@/components/landing/hero-section';
import PortfolioSection from '@/components/landing/portfolio-section';
import PricingSection from '@/components/landing/pricing-section';
import ProblemSection from '@/components/landing/problem-section';
import ProcessSection from '@/components/landing/process-section';
import TestimonialsSection from '@/components/landing/testimonials-section';
import TrustAndIndustriesSection from '@/components/landing/trust-and-industries-section';
import PublicLayout from '@/layouts/public-layout';
import type {
    FaqItem,
    PricingPlanItem,
    ProjectItem,
    TestimonialItem,
} from '@/types';

type HomeProps = {
    projects?: ProjectItem[];
    pricingPlans?: PricingPlanItem[];
    testimonials?: TestimonialItem[];
    faqs?: FaqItem[];
};

export default function Home({
    projects,
    pricingPlans,
    testimonials,
    faqs,
}: HomeProps) {
    return (
        <>
            <Head title="kawandigital.id | Jasa Pembuatan Website Bisnis" />
            <HeroSection />
            <AboutBentoSection />
            <ProblemSection />
            <DeliverablesSection />
            <PricingSection plans={pricingPlans} />
            <PortfolioSection projects={projects} />
            <ProcessSection />
            <TrustAndIndustriesSection />
            <TestimonialsSection testimonials={testimonials} />
            <FaqSection faqs={faqs} />
        </>
    );
}

Home.layout = (page: ReactNode) => (
    <PublicLayout footerTopSlot={<BottomCtaSection />}>{page}</PublicLayout>
);
