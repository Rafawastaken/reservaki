import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ActionHeaderProps {
    title?: string;
    description?: string;
    buttonText?: string;
    onButtonClick?: () => void;
}

function ActionHeader({ title, description, buttonText, onButtonClick }: ActionHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="mb-2 text-3xl font-bold">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
            </div>
            <Button onClick={onButtonClick}>
                <Plus className="mr-2 h-4 w-4" />
                {buttonText}
            </Button>
        </div>
    );
}

export { ActionHeader };
