import { Card, CardContent } from '@/components/ui/card';
import { Calendar, CreditCard, Shield } from 'lucide-react';

export default function Features() {
    const features = [
        {
            icon: Shield,
            title: 'Sem Intermediação',
            description: 'Gere diretamente as suas reservas sem pagar comissões a terceiros',
        },
        {
            icon: Calendar,
            title: 'Check-in Digital',
            description: 'Automatize o processo de entrada dos seus hóspedes',
        },
        {
            icon: CreditCard,
            title: 'Pagamentos Diretos',
            description: 'Receba os pagamentos diretamente na sua conta',
        },
    ];

    return (
        <section className="bg-background py-20">
            <div className="container mx-auto px-4">
                <div className="mb-16 space-y-4 text-center">
                    <h2 className="text-3xl font-bold lg:text-4xl">
                        Tudo o que precisa numa <span className="text-primary">única plataforma</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                        Simplifique a gestão do seu alojamento local com ferramentas pensadas para pequenos proprietários
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-0 p-8 text-center shadow-md transition-shadow hover:shadow-lg">
                            <CardContent className="space-y-4">
                                <div className="bg-gradient-primary mx-auto flex h-16 w-16 items-center justify-center rounded-2xl">
                                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                                </div>
                                <h3 className="text-xl font-semibold">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
