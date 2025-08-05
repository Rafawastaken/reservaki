// resources/js/types/property.ts

export interface PropertyImage {
    id: number;
    path: string;
    is_cover: boolean;
    order: number;
}

export interface PropertyFeature {
    bedrooms: number;
    bathrooms: number;
    max_guests: number;
    area_m2?: number | null;
    extras?: string | null;
    has_kitchen?: boolean;
    has_air_conditioning?: boolean;
    has_heating?: boolean;
    has_wifi?: boolean;
    has_parking?: boolean;
    has_pool?: boolean;
    has_washing_machine?: boolean;
}

export interface Property {
    id: number;
    name: string;
    address: string;
    postal_code: string;
    city: string;
    district?: string;
    country: string;
    price_per_night: number;
    is_visible: boolean;
    description?: string;

    // campos calculados que o backend devolve:
    bookings: number;
    rating: number;
    reviews: number;
    revenue: number;

    features?: PropertyFeature;
    images: PropertyImage[];
}
