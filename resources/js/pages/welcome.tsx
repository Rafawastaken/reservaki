import CTA from '@/components/reservaki/landing/cta';
import Features from '@/components/reservaki/landing/features';
import Footer from '@/components/reservaki/landing/footer';
import Header from '@/components/reservaki/landing/header';
import Hero from '@/components/reservaki/landing/hero';
import Steps from '@/components/reservaki/landing/steps';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <div className="bg-gradient-subtle min-h-screen">
            <Head title="Reservaki - Sistema de gerenciamento de alojamento local" />
            <Header />
            <Hero />
            <Features />
            <Steps />
            <CTA />
            <Footer />
        </div>
    );
}
