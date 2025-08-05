// resources/js/helpers/getStatusBadge.tsx
import { Badge } from '@/components/ui/badge';

const getStatusBadge = (isVisible: boolean) => {
    return isVisible ? (
        <Badge className="border-success/20 bg-success/10 text-success">Ativo</Badge>
    ) : (
        <Badge className="border-muted bg-muted/50 text-muted-foreground">Inativo</Badge>
    );
};

export default getStatusBadge;
