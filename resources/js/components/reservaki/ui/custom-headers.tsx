import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface ActionHeaderProps {
    title?: string;
    description?: string;
    buttonText?: string;
    action?: string; // URL/key de rota (opcional)
    onButtonClick?: () => void; // callback em vez de action
}

interface RegularHeaderProps {
    title: string;
    description: string;
    marginBottom?: string;
}

export function ActionHeader({ title, description, buttonText, action, onButtonClick }: ActionHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="mb-2 text-3xl font-bold">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
            </div>
            {onButtonClick ? (
                <Button variant="default" onClick={onButtonClick}>
                    <Plus className="mr-2 h-4 w-4" />
                    {buttonText}
                </Button>
            ) : (
                <Button variant="default" asChild>
                    <Link href={route(`${action}`)}>
                        <Plus className="mr-2 h-4 w-4" />
                        {buttonText}
                    </Link>
                </Button>
            )}
        </div>
    );
}

export function RegularHeader({ title, description, marginBottom = 'mb-3' }: RegularHeaderProps) {
    return (
        <div className={marginBottom}>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
        </div>
    );
}
