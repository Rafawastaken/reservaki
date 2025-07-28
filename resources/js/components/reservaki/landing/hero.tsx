import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative py-20 lg:py-32">
            <div className="container mx-auto px-4">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl leading-tight font-bold lg:text-6xl">
                                Gere o teu <span className="bg-gradient-primary bg-clip-text text-transparent">alojamento local</span> sem
                                complicações
                            </h1>
                            <p className="text-xl leading-relaxed text-muted-foreground">
                                A plataforma completa para pequenos proprietários. Sem intermediação, sem comissões. Apenas você e os seus hóspedes.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button size="lg" variant="hero" className="px-8 py-6 text-lg">
                                Comece Gratuitamente
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                                Ver Demo
                            </Button>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                            <div className="flex items-center">
                                <CheckCircle className="mr-2 h-4 w-4 text-success" />
                                Setup em 5 minutos
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="mr-2 h-4 w-4 text-success" />
                                Sem taxas ocultas
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <img src={'storage/static/hero-property.jpg'} alt="Gestão de alojamento local" className="rounded-2xl shadow-2xl" />
                        <div className="absolute -bottom-6 -left-6 rounded-xl bg-background p-4 shadow-lg">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                                    <CheckCircle className="h-5 w-5 text-success" />
                                </div>
                                <div>
                                    <div className="font-semibold">Nova Reserva</div>
                                    <div className="text-sm text-muted-foreground">Apartamento Vista Mar</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
