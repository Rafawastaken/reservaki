export type PropertyStatus = 'ativo' | 'inativo';

export interface Property {
    id: string;
    name: string;
    location: string;
    status: PropertyStatus;
    price: number; // € / noite
    maxGuests: number;
    rating: number; // média
    reviews: number; // total de reviews
    bookings: number; // reservas no período escolhido
    revenue: number; // receita no período escolhido
    images: number; // total de fotos
    description: string;
}
