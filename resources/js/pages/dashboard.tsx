import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div>
                <h1 className="mb-2 text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Bem-vindo de volta! Aqui está um resumo da sua atividade.</p>
            </div>
        </AppLayout>
    );
}
