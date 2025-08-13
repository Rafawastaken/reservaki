// components/reservaki/ui/results-property.tsx
import { PropertyCard } from '@/components/reservaki/ui/property-card';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { Filter, SlidersHorizontal } from 'lucide-react';

type PropertyItem = {
    id: number;
    slug: string;
    name: string;
    city: string;
    price_per_night: number;
    cover_url: string | null;
};

type PaginationLink = { url: string | null; label: string; active: boolean };
type Paginated<T> = { data: T[]; links: PaginationLink[] };

export default function ResultsProperty({ properties }: { properties: Paginated<PropertyItem> }) {
    const next = properties.links.find((l) => typeof l.label === 'string' && l.label.toLowerCase().includes('next'));
    const prev = properties.links.find((l) => typeof l.label === 'string' && l.label.toLowerCase().includes('previous'));

    function go(url?: string | null) {
        if (!url) return;
        router.get(url, {}, { preserveScroll: true, preserveState: true });
    }

    return (
        <div className="lg:col-span-3">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">{properties.data.length} alojamentos nesta página</h2>
                        <p className="text-muted-foreground">em várias localizações</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                            <SlidersHorizontal className="mr-2 h-4 w-4" />
                            Ordenar
                        </Button>
                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" />
                            Mapa
                        </Button>
                    </div>
                </div>

                {/* Empty state */}
                {properties.data.length === 0 && (
                    <div className="rounded border p-6 text-center text-sm text-muted-foreground">
                        Não encontrámos resultados para os filtros aplicados.
                    </div>
                )}

                {/* Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {properties.data.map((property) => (
                        <PropertyCard key={property.id} {...property} />
                    ))}
                </div>

                {/* Paginação */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-8">
                    {properties.links.map((l, i) =>
                        l.url ? (
                            <Link
                                key={i}
                                href={l.url}
                                preserveScroll
                                preserveState
                                className={cn(
                                    buttonVariants({
                                        variant: l.active ? 'default' : 'outline',
                                        size: 'sm',
                                    }),
                                )}
                                dangerouslySetInnerHTML={{ __html: l.label }}
                            />
                        ) : (
                            <span
                                key={i}
                                className={cn(
                                    buttonVariants({
                                        variant: 'outline',
                                        size: 'sm',
                                    }),
                                    'pointer-events-none opacity-50',
                                )}
                                dangerouslySetInnerHTML={{ __html: l.label }}
                            />
                        ),
                    )}
                </div>
            </div>
        </div>
    );
}
