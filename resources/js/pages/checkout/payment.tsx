import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { router, usePage } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface ContractProps {
    contract: {
        id: number;
        price_cents: number;
        billing_period: 'monthly' | 'yearly';
    };

    [key: string]: unknown;
}

function formatPrice(cents: number) {
    return (cents / 100).toLocaleString('pt-PT', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
    });
}

export default function PaymentPage() {
    const { contract } = usePage<ContractProps>().props;
    const [submitting, setSubmitting] = useState(false);

    const handlePay = () => {
        setSubmitting(true);
        router.post(
            route('contract.pay', { contract: contract.id }),
            {},
            {
                onFinish: () => setSubmitting(false),
            },
        );
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 to-background/80 p-6">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Confirmação de Pagamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2 text-center">
                        <p className="text-sm text-muted-foreground">Plano seleccionado</p>
                        <p className="text-lg font-semibold">
                            {contract.billing_period === 'monthly' ? 'Mensal' : 'Anual'} — {formatPrice(contract.price_cents)}
                        </p>
                    </div>

                    <Button className="w-full" size="lg" disabled={submitting} onClick={handlePay}>
                        {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Pagar agora
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">Serás redireccionado(a) automaticamente após a confirmação.</p>
                </CardContent>
            </Card>
        </div>
    );
}
