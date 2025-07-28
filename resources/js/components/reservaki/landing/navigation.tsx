// resources/ts/Components/Navigation.tsx
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { BarChart3, Calendar, Home, Search, Settings } from 'lucide-react';
import type { ReactNode } from 'react';

interface NavigationProps {
    className?: string;
    isPublic?: boolean;
}

/** Link que sabe se está ativo com base em page.url (Inertia) */
function NavLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
    const { url } = usePage(); // ex.: "/dashboard/reservas?page=2"
    const isActive = url === href || url.startsWith(`${href}/`); // início da rota também conta

    return (
        <Link
            href={href}
            className={cn('text-sm font-medium transition-colors hover:text-primary', isActive ? 'text-primary' : 'text-muted-foreground', className)}
            preserveScroll // opcional; evita “scroll-jank” em SPA
        >
            {children}
        </Link>
    );
}

export function Navigation({ className, isPublic = true }: NavigationProps) {
    /* ---------- Navegação pública ---------- */
    if (isPublic) {
        return (
            <nav className={cn('flex items-center space-x-6', className)}>
                <NavLink href="/">Início</NavLink>
                <NavLink href="/explorar">Explorar</NavLink>
                <NavLink href="/como-funciona">Como Funciona</NavLink>
            </nav>
        );
    }

    /* ---------- Navegação do dashboard ---------- */
    const dashboardItems = [
        { icon: Home, label: 'Dashboard', href: '/dashboard' },
        { icon: Search, label: 'Propriedades', href: '/dashboard/propriedades' },
        { icon: Calendar, label: 'Reservas', href: '/dashboard/reservas' },
        { icon: BarChart3, label: 'Relatórios', href: '/dashboard/relatorios' },
        { icon: Settings, label: 'Definições', href: '/dashboard/definicoes' },
    ];

    return (
        <nav className={cn('flex flex-col space-y-2', className)}>
            {dashboardItems.map(({ icon: Icon, label, href }) => {
                const { url } = usePage();
                const isActive = url === href || url.startsWith(`${href}/`);

                return (
                    <Link
                        key={href}
                        href={href}
                        className={cn(
                            'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                            isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                        )}
                        preserveScroll
                    >
                        <Icon className="h-4 w-4" />
                        <span>{label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
