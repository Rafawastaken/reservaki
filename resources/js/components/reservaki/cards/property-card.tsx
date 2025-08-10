// resources/js/components/reservaki/cards/property-card.tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import getStatusBadge from '@/helpers/getStatusBadge';
import type { Property } from '@/types/property';
import { Link, router } from '@inertiajs/react';
import { Camera, Edit3, Euro, Eye, EyeOff, MapPin, Star, Trash2, Users } from 'lucide-react';

interface PropertyCardProps {
    property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    // encontra a imagem de capa ou fallback para a primeira
    const cover = property.images.find((img) => img.is_cover);
    console.log(cover);

    function handleDelete(id: number) {
        if (confirm('Tens a certeza que prentendes remover esta propriedade?')) {
            router.delete(`/properties/${id}`);
        }
    }

    function handleToggle(id: number) {
        router.patch(`/properties/toggle/${id}`);
    }

    return (
        <Card className="p-6 transition-shadow hover:shadow-md">
            <div className="grid gap-6 lg:grid-cols-4">
                {/* Capa ou placeholder */}
                <div className="lg:col-span-1">
                    <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-muted">
                        {cover ? (
                            <img src={`/storage/${cover.path}`} alt={property.name} className="h-full w-full object-cover" />
                        ) : (
                            <Camera className="h-8 w-8 text-muted-foreground" />
                        )}
                    </div>
                </div>

                {/* Detalhes */}
                <div className="space-y-3 lg:col-span-2">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-xl font-semibold">{property.name}</h3>
                            <div className="mt-1 flex items-center text-sm text-muted-foreground">
                                <MapPin className="mr-1 h-3 w-3" />
                                {property.city}, {property.district}
                            </div>
                        </div>
                        {getStatusBadge(property.is_visible)}
                    </div>

                    <p className="line-clamp-2 text-sm text-muted-foreground">{property.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                            {property.features?.max_guests ?? '—'} pessoas
                        </div>
                        <div className="flex items-center">
                            <Star className="mr-2 h-4 w-4 fill-warning text-warning" />
                            {property.rating} ({property.reviews})
                        </div>
                        <div className="flex items-center">
                            <Euro className="mr-2 h-4 w-4 text-muted-foreground" />€{property.price_per_night}/noite
                        </div>
                        <div className="text-muted-foreground">{property.bookings ? property.bookings : 0} reservas este mês</div>
                    </div>
                </div>

                {/* Ações & Receita */}
                <div className="space-y-4 lg:col-span-1">
                    <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{property.revenue ? property.revenue + '€' : '-'}</div>
                        <div className="text-sm text-muted-foreground">receita mensal</div>
                    </div>

                    <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full">
                            <Edit3 className="mr-2 h-4 w-4" />
                            <Link href={route('properties.edit', { property: property.id })}>Editar</Link>
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                            <Eye className="mr-2 h-4 w-4" />
                            <Link href={`${property.slug}`}>Ver Página</Link>
                        </Button>
                        <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="flex-1" onClick={() => handleToggle(property.id)}>
                                {property.is_visible ? (
                                    <>
                                        <EyeOff className="mr-1 h-4 w-4" />
                                        Ocultar
                                    </>
                                ) : (
                                    <>
                                        <Eye className="mr-1 h-4 w-4" />
                                        Ativar
                                    </>
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 text-destructive hover:text-destructive"
                                onClick={() => handleDelete(property.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
