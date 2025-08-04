import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Adicionar Propriedade',
        href: '/properties/create',
    },
];

export default function AddProperty() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Adicionar Propriedade" />
        </AppLayout>
    );
}
