import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@headlessui/react';
import { Calendar, MapPin, Search, Users } from 'lucide-react';

export default function SearchProperty() {
    return (
        <section className="bg-background py-12">
            <div className="container mx-auto px-4">
                <div className="mb-8 space-y-6 text-center">
                    <h1 className="text-4xl font-bold lg:text-5xl">
                        Explore alojamentos <span className="bg-gradient-primary bg-clip-text text-transparent">únicos</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                        Descubra propriedades geridas diretamente pelos proprietários, sem intermediação e com a melhor experiência
                    </p>
                </div>
                <Card className="mx-auto max-w-4xl p-2 shadow-lg">
                    <div className="grid gap-2 md:grid-cols-4">
                        <div className="flex items-center justify-start gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Onde quer ficar?" className="border-0 py-2 pl-2 outline-none focus-visible:ring-0" />
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Check-in" type="date" className="border-0 py-2 pl-2 outline-none focus-visible:ring-0" />
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Hóspedes" className="border-0 py-2 pl-2 outline-none focus-visible:ring-0" />
                        </div>
                        <Button size="lg" className="w-full">
                            <Search className="mr-2 h-4 w-4" />
                            Pesquisar
                        </Button>
                    </div>
                </Card>
            </div>
        </section>
    );
}
