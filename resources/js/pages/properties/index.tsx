import AddPropertyCta from '@/components/reservaki/cards/add-property-cta';
import PropertyCard from '@/components/reservaki/cards/property-card';
import StatsCard from '@/components/reservaki/cards/stats-card';
import { ActionHeader } from '@/components/reservaki/ui/custom-headers';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SharedData } from '@/types';
import type { Property } from '@/types/property';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Propriedades',
        href: '/properties',
    },
];

interface PropertyPageProps extends SharedData {
    properties: Property[];
}

export default function index() {
    const { properties } = usePage<PropertyPageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Minhas Propriedades" />
            <ActionHeader
                title="Minhas Propriedades"
                description="Gere as suas propriedades e mantenha as informações atualizadas"
                buttonText="Adicionar Propriedade"
                action={'properties.create'}
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
                {properties.length > 0 && properties.map((property) => <PropertyCard property={property} key={property.id} />)}
            </div>

            <AddPropertyCta />
        </AppLayout>
    );
}
