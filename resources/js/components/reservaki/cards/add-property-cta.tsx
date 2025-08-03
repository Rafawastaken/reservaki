import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export default function AddPropertyCta() {
    return (
        <Card className="cursor-pointer border-2 border-dashed p-8 text-center transition-colors hover:border-primary/50">
            <div className="space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                    <Plus className="h-8 w-8 text-accent-foreground" />
                </div>
                <div>
                    <h3 className="mb-2 text-lg font-semibold">Adicionar Nova Propriedade</h3>
                    <p className="mb-4 text-muted-foreground">Expanda o seu negócio adicionando mais propriedades ao seu portfólio</p>
                    <Button>Começar Agora</Button>
                </div>
            </div>
        </Card>
    );
}
