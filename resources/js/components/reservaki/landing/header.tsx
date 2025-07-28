import { Navigation } from '@/components/reservaki/landing/navigation';
import { Button } from '@/components/ui/button';

export default function Header() {
    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <h1 className="text-xl font-bold text-primary">Reservaki</h1>
                        <Navigation />
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button variant="ghost">Entrar</Button>
                        <Button variant="hero">Área do Proprietário</Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
