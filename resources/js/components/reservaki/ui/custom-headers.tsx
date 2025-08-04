import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface ActionHeaderProps {
    title?: string;
    description?: string;
    buttonText?: string;
    action?: string;
}

function ActionHeader({ title, description, buttonText, action }: ActionHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="mb-2 text-3xl font-bold">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
            </div>
            <Button variant={'default'} asChild>
                <Link href={route(`${action}`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    {buttonText}
                </Link>
            </Button>
        </div>
    );
}

export { ActionHeader };
