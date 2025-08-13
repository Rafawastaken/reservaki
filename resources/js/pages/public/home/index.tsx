import CTA from '@/components/reservaki/landing/cta';
import Features from '@/components/reservaki/landing/features';
import Footer from '@/components/reservaki/landing/footer';
import Header from '@/components/reservaki/landing/header';
import Hero from '@/components/reservaki/landing/hero';
import Steps from '@/components/reservaki/landing/steps';
import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <PublicLayout>
            <Head title="Reservaki - Sistema de gerenciamento de alojamento local" />
            <Header />
            <Hero />
            <Features />
            <Steps />
            <CTA />
            <Footer />
        </PublicLayout>
    );
}
