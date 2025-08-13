// components/reservaki/ui/property-card.tsx
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { MapPin, Users } from 'lucide-react';
import { route } from 'ziggy-js';

type Props = {
    id: number;
    slug: string;
    name: string;
    city: string;
    price_per_night: number;
    cover_url: string | null;
    max_guests?: number | null; // podes ter isto no payload; se não tiveres, é opcional
    bedrooms?: number | null;
    bathrooms?: number | null;
    className?: string;
};

export function PropertyCard({ slug, name, city, price_per_night, cover_url, max_guests, bedrooms, bathrooms, className }: Props) {
    const imageUrl = cover_url ?? '/images/placeholder.jpg'; // mete um placeholder no público
    return (
        <Link href={route('public.properties.show', slug)} className="block">
            <Card className={cn('overflow-hidden border-0 shadow-md transition-all hover:shadow-lg', className)}>
                <div className="relative">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                    <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="bg-background/90 text-foreground">
                            {city}
                        </Badge>
                    </div>
                </div>

                <CardContent className="p-4">
                    <div className="space-y-3">
                        <div>
                            <h3 className="line-clamp-1 text-lg font-semibold transition-colors group-hover:text-primary">{name}</h3>
                            <div className="mt-1 flex items-center text-sm text-muted-foreground">
                                <MapPin className="mr-1 h-3 w-3" />
                                {city}
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-3">
                                {typeof max_guests === 'number' && (
                                    <span className="flex items-center">
                                        <Users className="mr-1 h-3 w-3" />
                                        {max_guests} hóspedes
                                    </span>
                                )}
                                {typeof bedrooms === 'number' && <span>{bedrooms} qrt</span>}
                                {typeof bathrooms === 'number' && <span>{bathrooms} wc</span>}
                            </div>
                            <div className="text-right">
                                <div className="text-xl font-bold text-primary">€{price_per_night.toFixed(2)}</div>
                                <div className="text-xs text-muted-foreground">por noite</div>
                            </div>
                        </div>

                        <div className="pt-1">
                            <Button size="sm" className="w-full">
                                Ver detalhes
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
