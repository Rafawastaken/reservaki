import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
    return (
        <section className="bg-gradient-hero py-20">
            <div className="container mx-auto px-4 text-center">
                <div className="mx-auto max-w-3xl space-y-8">
                    <h2 className="text-3xl font-bold text-primary-foreground lg:text-5xl">Pronto para começar?</h2>
                    <p className="text-xl text-primary-foreground/90">
                        Junte-se a centenas de proprietários que já confiam na nossa plataforma para gerir os seus alojamentos locais
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Button size="lg" variant="secondary" className="px-8 py-6 text-lg">
                            Criar Conta Gratuita
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            size="lg"
                            variant="ghost"
                            className="border-primary-foreground/20 px-8 py-6 text-lg text-primary-foreground hover:bg-primary-foreground/10"
                        >
                            Falar com a Equipa
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
