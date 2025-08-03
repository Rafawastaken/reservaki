import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { CogIcon, Home, HouseIcon, LayoutGrid, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Propriedades',
        href: '/properties',
        icon: HouseIcon,
    },
    {
        title: 'Configurações',
        href: '/settings',
        icon: CogIcon,
    },
];

export function AppSidebar() {
    const currentPath = window.location.pathname;

    return (
        <div className="w-full max-w-xs flex-shrink-0">
            <Card className="p-4">
                <div className="space-y-6">
                    <div className="space-y-2 text-center">
                        <div className="bg-gradient-primary mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                            <Home className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <div>
                            <h2 className="font-semibold">Olá, NOME </h2>
                            <p className="text-sm text-muted-foreground">Proprietário desde 2023</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {mainNavItems.map((item, index) => (
                            <Button
                                key={`${item.href}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start truncate', {
                                    'bg-muted': currentPath === item.href,
                                })}
                            >
                                <a href={item.href} className="flex items-center space-x-2 overflow-hidden text-ellipsis whitespace-nowrap">
                                    {item.icon && <item.icon className="h-5 w-5 flex-shrink-0" />}
                                    <span className="truncate">{item.title}</span>
                                </a>
                            </Button>
                        ))}
                    </div>
                    <div className="border-t pt-4">
                        <Button className="w-full">
                            <Plus className="mr-2 h-4 w-4" />
                            Nova Propriedade
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
