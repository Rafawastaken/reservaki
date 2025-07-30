import { Navigation } from '@/components/reservaki/landing/navigation';
import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function Header() {
    const { auth } = usePage<SharedData>().props;

    console.log(auth);

    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <h1 className="text-xl font-bold text-primary">Reservaki</h1>
                        <Navigation />
                    </div>
                    <div className="flex items-center space-x-3">
                        {auth.user ? (
                            <Button variant="hero" asChild>
                                <Link href={route('dashboard')}>Área do Proprietário</Link>
                            </Button>
                        ) : (
                            <>
                                <Button variant="ghost" asChild>
                                    <Link href={route('login')}>Entrar</Link>
                                </Button>

                                <Button variant="hero" asChild>
                                    <Link href={route('register')}>Começar a usar</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
