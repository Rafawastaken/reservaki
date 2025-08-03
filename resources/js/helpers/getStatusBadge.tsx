import { Badge } from 'lucide-react';

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'ativo':
            return <Badge className="border-success/20 bg-success/10 text-success">Ativo</Badge>;
        case 'inativo':
            return <Badge className="border-muted bg-muted/50 text-muted-foreground">Inativo</Badge>;
        default:
            return <Badge>{status}</Badge>;
    }
};

export default getStatusBadge;
