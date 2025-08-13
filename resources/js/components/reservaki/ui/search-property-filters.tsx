// components/reservaki/ui/search-property-filters.tsx
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { route } from 'ziggy-js';

type FacetCity = { label: string; count: number };
type Filters = {
    q?: string;
    cities: string[];
    min_price?: number | null;
    max_price?: number | null;
    guests?: number | null;
    amenities: string[];
};
type Props = {
    filters?: Partial<Filters>;
    facets?: { cities?: FacetCity[] };
};

export default function SearchPropertyFilters({ filters, facets }: Props) {
    // defaults seguros
    const initial = {
        q: filters?.q ?? '',
        cities: filters?.cities ?? [],
        min_price: filters?.min_price ?? null,
        max_price: filters?.max_price ?? null,
        guests: filters?.guests ?? undefined,
        amenities: filters?.amenities ?? [],
    };
    const facetCities = facets?.cities ?? [];

    const [cities, setCities] = useState<string[]>(initial.cities);
    const [minPrice, setMinPrice] = useState<string>(initial.min_price?.toString() ?? '');
    const [maxPrice, setMaxPrice] = useState<string>(initial.max_price?.toString() ?? '');
    const [guests, setGuests] = useState<number | undefined>(initial.guests ?? undefined);
    const [amenities, setAmenities] = useState<string[]>(initial.amenities);

    const didMount = useRef(false);

    const amenityOptions = [
        { key: 'has_wifi', label: 'Wi-Fi' },
        { key: 'has_parking', label: 'Estacionamento' },
        { key: 'has_air_conditioning', label: 'Ar condicionado' },
        { key: 'has_heating', label: 'Aquecimento' },
        { key: 'has_pool', label: 'Piscina' },
        { key: 'has_kitchen', label: 'Cozinha' },
        { key: 'has_washing_machine', label: 'Máquina de lavar' },
    ];

    function submit(next: Partial<Filters> = {}) {
        const query = {
            q: initial.q || undefined,
            cities,
            min_price: minPrice || undefined,
            max_price: maxPrice || undefined,
            guests,
            amenities,
            ...next,
        };

        router.get(route('public.properties.index'), query, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    }

    function toggleCity(city: string) {
        setCities((prev) => (prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]));
    }

    function toggleAmenity(key: string) {
        setAmenities((prev) => (prev.includes(key) ? prev.filter((a) => a !== key) : [...prev, key]));
    }

    function clearAll() {
        setCities([]);
        setMinPrice('');
        setMaxPrice('');
        setGuests(undefined);
        setAmenities([]);
        submit({ cities: [], min_price: undefined, max_price: undefined, guests: undefined, amenities: [] });
    }

    // Dispara submit quando cidades/amenities mudam, mas ignora a 1ª renderização
    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            return;
        }
        submit();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cities, amenities]);

    return (
        <div className="lg:col-span-1">
            <Card className="sticky top-6 p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Filtros</h3>
                        <Button variant="ghost" size="sm" onClick={clearAll}>
                            Limpar
                        </Button>
                    </div>

                    {/* Preço */}
                    <div className="space-y-3">
                        <h4 className="font-medium">Preço por noite</h4>
                        <div className="flex space-x-2">
                            <Input
                                placeholder="€ Min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value.replace(/\D/g, ''))}
                                onBlur={() => submit()}
                            />
                            <Input
                                placeholder="€ Max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value.replace(/\D/g, ''))}
                                onBlur={() => submit()}
                            />
                        </div>
                    </div>

                    {/* Localização (dinâmica) */}
                    <div className="space-y-3">
                        <h4 className="font-medium">Localização</h4>
                        <div className="max-h-64 space-y-2 overflow-auto pr-1">
                            {facetCities.map((c) => {
                                const checked = cities.includes(c.label);
                                return (
                                    <div key={c.label} className="flex items-center justify-between">
                                        <label className="flex cursor-pointer items-center space-x-2">
                                            <input type="checkbox" className="rounded" checked={checked} onChange={() => toggleCity(c.label)} />
                                            <span className="text-sm">{c.label}</span>
                                        </label>
                                        <Badge variant="secondary" className="text-xs">
                                            {c.count}
                                        </Badge>
                                    </div>
                                );
                            })}
                            {facetCities.length === 0 && <div className="text-sm text-muted-foreground">Sem cidades para os filtros atuais.</div>}
                        </div>
                    </div>

                    {/* Hóspedes */}
                    <div className="space-y-3">
                        <h4 className="font-medium">Número de hóspedes</h4>
                        <div className="grid grid-cols-3 gap-2">
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <Button
                                    key={n}
                                    variant={guests === n ? 'default' : 'outline'}
                                    size="sm"
                                    className="h-8"
                                    onClick={() => {
                                        setGuests(n);
                                        submit({ guests: n });
                                    }}
                                >
                                    {n}+
                                </Button>
                            ))}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="col-span-3 justify-self-start"
                                onClick={() => {
                                    setGuests(undefined);
                                    submit({ guests: undefined });
                                }}
                            >
                                Limpar hóspedes
                            </Button>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="space-y-3">
                        <h4 className="font-medium">Comodidades</h4>
                        <div className="space-y-2">
                            {amenityOptions.map((a) => (
                                <label key={a.key} className="flex cursor-pointer items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        className="rounded"
                                        checked={amenities.includes(a.key)}
                                        onChange={() => toggleAmenity(a.key)}
                                    />
                                    <span className="text-sm">{a.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
