import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Bell } from 'lucide-react';
import { Button } from './ui/button';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto py-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-primary">Reservaki</h1>
                    <div className="flex items-center space-x-3">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-4 w-4" />
                            {/*mostrar notificacoes*/}
                            {/*<span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-destructive"></span>*/}
                        </Button>
                        <Button variant="outline">Sair</Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
