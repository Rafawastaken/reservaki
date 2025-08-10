import AddPropertyCta from '@/components/reservaki/cards/add-property-cta';
import PropertyCard from '@/components/reservaki/cards/property-card';
import StatsCard from '@/components/reservaki/cards/stats-card';
import { ActionHeader } from '@/components/reservaki/ui/custom-headers';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SharedData } from '@/types';
import type { Property } from '@/types/property';
import { Head, router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Propriedades', href: '/properties' }];

interface PropertyPageProps extends SharedData {
    properties: Property[];
}

export default function Index() {
    const { properties } = usePage<PropertyPageProps>().props;

    console.log(properties);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Minhas Propriedades" />
            <ActionHeader
                title="Minhas Propriedades"
                description="Gere as suas propriedades e mantenha as informações atualizadas"
                buttonText="Adicionar Propriedade"
                onButtonClick={() => router.visit(route('properties.create'))}
            />
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <StatsCard title="Total de Propriedades" value={properties.length.toString()} textColor="text-primary" />
                <StatsCard title="Propriedades Ativas" value={properties.filter((p) => p.is_visible).length.toString()} textColor="text-success" />
                <StatsCard
                    title="Propriedades Inativas"
                    value={properties.filter((p) => !p.is_visible).length.toString()}
                    textColor="text-destructive"
                />
                <StatsCard title="Avaliação Média" value="—" textColor="text-slate-800" />
            </div>
            {/* Lista de Propriedades */}
            <div className="space-y-4">
                {properties.map((property) => (
                    <PropertyCard property={property} key={property.id} />
                ))}
            </div>
            {/* CTA */}
            <AddPropertyCta onButtonClick={() => router.visit(route('properties.create'))} />
        </AppLayout>
    );
}
