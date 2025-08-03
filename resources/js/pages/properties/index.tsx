import AddPropertyCta from '@/components/reservaki/cards/add-property-cta';
import PropertyCard from '@/components/reservaki/cards/property-card';
import StatsCard from '@/components/reservaki/cards/stats-card';
import { ActionHeader } from '@/components/reservaki/ui/custom-headers';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Propriedades',
        href: '/properties',
    },
];

// Define the PropertyStatus type
type PropertyStatus = 'ativo' | 'inativo';

const properties = [
    {
        id: '1',
        name: 'Apartamento Vista Mar',
        location: 'Foz do Douro, Porto',
        status: 'ativo' as PropertyStatus,
        price: 85,
        maxGuests: 4,
        rating: 4.8,
        reviews: 24,
        bookings: 8,
        revenue: 680,
        images: 12,
        description: 'Apartamento moderno com vista deslumbrante sobre o mar',
    },
    {
        id: '2',
        name: 'Villa Moderna',
        location: 'Cascais, Lisboa',
        status: 'ativo' as PropertyStatus,
        price: 120,
        maxGuests: 6,
        rating: 4.9,
        reviews: 31,
        bookings: 12,
        revenue: 1440,
        images: 18,
        description: 'Villa contemporânea com piscina e jardim privado',
    },
    {
        id: '3',
        name: 'Casa Rústica',
        location: 'Ílhavo, Aveiro',
        status: 'inativo' as PropertyStatus,
        price: 65,
        maxGuests: 3,
        rating: 4.7,
        reviews: 18,
        bookings: 5,
        revenue: 325,
        images: 8,
        description: 'Casa tradicional no centro histórico',
    },
];

export default function index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Minhas Propriedades" />
            <ActionHeader
                title="Minhas Propriedades"
                description="Gere as suas propriedades e mantenha as informações atualizadas"
                buttonText="Adicionar Propriedade"
                onButtonClick={() => console.log('Adicionar Propriedade')}
            />
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <StatsCard title="Total de Propriedades" value="5" textColor="text-primary" />
                <StatsCard title="Propriedades Ativas" value="3" textColor="text-success" />
                <StatsCard title="Propriedades Inativas" value="2" textColor="text-destructive" />
                <StatsCard title="Avaliação Média" value="4.6" textColor="text-slate-800" />
            </div>

            {/* Properties List */}
            <div className="space-y-4">
                {properties.map((property) => (
                    <PropertyCard property={property} key={property.id} />
                ))}
            </div>

            <AddPropertyCta />
        </AppLayout>
    );
}
