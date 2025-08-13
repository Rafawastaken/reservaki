import Footer from '@/components/reservaki/landing/footer';
import Header from '@/components/reservaki/landing/header';
import ResultsProperty from '@/components/reservaki/ui/results-property';
import SearchProperty from '@/components/reservaki/ui/search-property';
import SearchPropertyFilters from '@/components/reservaki/ui/search-property-filters';
import PublicLayout from '@/layouts/public-layout';
import { PropertyItem } from '@/types/property';
import { Head, usePage } from '@inertiajs/react';

type FacetCity = { label: string; count: number };
type Paginated<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
};

type PageProps = {
    properties: Paginated<PropertyItem>;
    filters: {
        q?: string;
        cities: string[];
        min_price?: number | null;
        max_price?: number | null;
        guests?: number | null;
        amenities: string[];
    };
    facets: {
        cities: FacetCity[];
    };
};

export default function Index() {
    const { properties, filters, facets } = usePage<PageProps>().props;

    return (
        <PublicLayout>
            <Head title="Reservaki - Explorar propriedades" />
            <Header />
            <SearchProperty />
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="grid gap-8 lg:grid-cols-4">
                        <SearchPropertyFilters filters={filters} facets={facets} />
                        <ResultsProperty properties={properties} />
                    </div>
                </div>
            </section>
            <Footer />
        </PublicLayout>
    );
}
