import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import getStatusBadge from '@/helpers/getStatusBadge';
import type { Property } from '@/types/property';
import { Camera, Edit3, Euro, Eye, EyeOff, MapPin, Star, Trash2, Users } from 'lucide-react';

interface PropertyCardProps {
    property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    return (
        <Card key={property.id} className="p-6 transition-shadow hover:shadow-md">
            <div className="grid gap-6 lg:grid-cols-4">
                {/* Property Image Placeholder */}
                <div className="lg:col-span-1">
                    <div className="flex aspect-video items-center justify-center rounded-lg bg-muted">
                        <Camera className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="mt-2 text-center text-xs text-muted-foreground">{property.images} fotos</div>
                </div>

                {/* Property Details */}
                <div className="space-y-3 lg:col-span-2">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-xl font-semibold">{property.name}</h3>
                            <div className="mt-1 flex items-center text-sm text-muted-foreground">
                                <MapPin className="mr-1 h-3 w-3" />
                                {property.location}
                            </div>
                        </div>
                        {getStatusBadge(property.status)}
                    </div>

                    <p className="line-clamp-2 text-sm text-muted-foreground">{property.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                            {property.maxGuests} pessoas
                        </div>
                        <div className="flex items-center">
                            <Star className="mr-2 h-4 w-4 fill-warning text-warning" />
                            {property.rating} ({property.reviews} avaliações)
                        </div>
                        <div className="flex items-center">
                            <Euro className="mr-2 h-4 w-4 text-muted-foreground" />€{property.price}/noite
                        </div>
                        <div className="text-muted-foreground">{property.bookings} reservas este mês</div>
                    </div>
                </div>

                {/* Actions & Stats */}
                <div className="space-y-4 lg:col-span-1">
                    <div className="text-right">
                        <div className="text-2xl font-bold text-primary">€{property.revenue}</div>
                        <div className="text-sm text-muted-foreground">receita mensal</div>
                    </div>

                    <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full">
                            <Edit3 className="mr-2 h-4 w-4" />
                            Editar
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Pública
                        </Button>
                        <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="flex-1" disabled={property.status === 'inativo'}>
                                {property.status === 'ativo' ? (
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
                            <Button variant="outline" size="sm" className="flex-1 text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
