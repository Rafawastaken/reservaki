// resources/js/Pages/Properties/EditProperty.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { useForm, type Resolver, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { route } from 'ziggy-js';
import { z } from 'zod';

import { RegularHeader } from '@/components/reservaki/ui/custom-headers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Car, ChefHat, Flame, Home, MapPin, Snowflake, Star, WashingMachine, Waves, Wifi, X } from 'lucide-react';

type ImageDTO = { id: number; url: string; is_cover: boolean; order: number };

type PageProps = {
    property: {
        id: number;
        name: string;
        address: string;
        postal_code: string;
        city: string;
        district?: string | null;
        country: string;
        price_per_night: number;
        is_visible: boolean;
        description?: string | null;
        features: {
            bedrooms: number;
            bathrooms: number;
            max_guests: number;
            area_m2?: number | null;
            extras?: string | null;
        };
        has_kitchen: boolean;
        has_air_conditioning: boolean;
        has_heating: boolean;
        has_wifi: boolean;
        has_parking: boolean;
        has_pool: boolean;
        has_washing_machine: boolean;
        images: ImageDTO[];
    };
};

const amenityIcons = {
    has_kitchen: ChefHat,
    has_air_conditioning: Snowflake,
    has_heating: Flame,
    has_wifi: Wifi,
    has_parking: Car,
    has_pool: Waves,
    has_washing_machine: WashingMachine,
};
const amenityLabels: Record<keyof typeof amenityIcons, string> = {
    has_kitchen: 'Cozinha',
    has_air_conditioning: 'Ar Condicionado',
    has_heating: 'Aquecimento',
    has_wifi: 'Wi-Fi',
    has_parking: 'Estacionamento',
    has_pool: 'Piscina',
    has_washing_machine: 'Máquina de Lavar',
};

const schema = z.object({
    name: z.string().min(1),
    address: z.string().min(1),
    postal_code: z.string().min(1),
    city: z.string().min(1),
    district: z.string().optional(),
    country: z.string().min(1),
    price_per_night: z.coerce.number().min(0),
    is_visible: z.boolean(),
    description: z.string().optional(),

    features: z.object({
        bedrooms: z.coerce.number().min(0),
        bathrooms: z.coerce.number().min(0),
        max_guests: z.coerce.number().min(1),
        area_m2: z.coerce.number().nullable().optional(),
        extras: z.string().optional(),
    }),

    has_kitchen: z.boolean(),
    has_air_conditioning: z.boolean(),
    has_heating: z.boolean(),
    has_wifi: z.boolean(),
    has_parking: z.boolean(),
    has_pool: z.boolean(),
    has_washing_machine: z.boolean(),

    images: z.custom<FileList>().optional(),
});
type FormDataT = z.infer<typeof schema>;

export default function EditProperty() {
    const { property } = usePage<PageProps>().props;

    // imagens já existentes
    const [existingImages, setExistingImages] = useState<ImageDTO[]>(property.images);
    const currentCoverId = useMemo(() => existingImages.find((i) => i.is_cover)?.id ?? null, [existingImages]);

    // novas imagens (pré-visualização)
    const [newFiles, setNewFiles] = useState<File[]>([]);
    const [coverFromNewIndex, setCoverFromNewIndex] = useState<number | null>(null);

    const form = useForm<FormDataT>({
        resolver: zodResolver(schema) as Resolver<FormDataT>,
        defaultValues: {
            name: property.name,
            address: property.address,
            postal_code: property.postal_code,
            city: property.city,
            district: property.district ?? '',
            country: property.country,
            price_per_night: property.price_per_night,
            is_visible: property.is_visible,
            description: property.description ?? '',
            features: {
                bedrooms: property.features.bedrooms,
                bathrooms: property.features.bathrooms,
                max_guests: property.features.max_guests,
                area_m2: property.features.area_m2 ?? null,
                extras: property.features.extras ?? '',
            },
            has_kitchen: property.has_kitchen,
            has_air_conditioning: property.has_air_conditioning,
            has_heating: property.has_heating,
            has_wifi: property.has_wifi,
            has_parking: property.has_parking,
            has_pool: property.has_pool,
            has_washing_machine: property.has_washing_machine,
            images: undefined,
        },
    });

    // quando escolhes ficheiros novos
    useEffect(() => {
        const sub = form.watch((values, info) => {
            if (info.name === 'images') {
                const list = values.images as FileList | undefined;
                setNewFiles(list ? Array.from(list) : []);
                if (coverFromNewIndex != null && list && coverFromNewIndex >= list.length) {
                    setCoverFromNewIndex(null);
                }
            }
        });
        return () => sub.unsubscribe();
    }, [form, coverFromNewIndex]);

    // marcar capa numa imagem existente
    function makeExistingCover(id: number) {
        setExistingImages((imgs) => imgs.map((i) => ({ ...i, is_cover: i.id === id })));
        setCoverFromNewIndex(null);
    }

    // remover imagem existente
    function removeExisting(id: number) {
        setExistingImages((imgs) => imgs.filter((i) => i.id !== id));
    }

    // capa numa imagem nova
    function makeNewCover(idx: number) {
        setCoverFromNewIndex(idx);
        // desmarca capas existentes no preview
        setExistingImages((imgs) => imgs.map((i) => ({ ...i, is_cover: false })));
    }

    const onSubmit: SubmitHandler<FormDataT> = (data) => {
        const fd = new FormData();

        // campos base
        fd.append('name', data.name);
        fd.append('address', data.address);
        fd.append('postal_code', data.postal_code);
        fd.append('city', data.city);
        if (data.district) fd.append('district', data.district);
        fd.append('country', data.country);
        fd.append('price_per_night', String(data.price_per_night));
        fd.append('is_visible', data.is_visible ? '1' : '0');
        if (data.description) fd.append('description', data.description);

        // features
        fd.append('features[bedrooms]', String(data.features.bedrooms));
        fd.append('features[bathrooms]', String(data.features.bathrooms));
        fd.append('features[max_guests]', String(data.features.max_guests));
        if (data.features.area_m2 != null) fd.append('features[area_m2]', String(data.features.area_m2));
        if (data.features.extras) fd.append('features[extras]', data.features.extras);

        // amenities
        (Object.keys(amenityIcons) as Array<keyof typeof amenityIcons>).forEach((key) => {
            fd.append(key, (data as any)[key] ? '1' : '0');
        });

        // imagens a remover (ids que deixaram de existir no array local)
        const deletedIds = property.images.map((i) => i.id).filter((id) => !existingImages.some((e) => e.id === id));
        deletedIds.forEach((id) => fd.append('deleted_image_ids[]', String(id)));

        // novas imagens
        newFiles.forEach((file) => fd.append('images[]', file));

        // capa: se escolheste capa nova, manda cover_image_id vazio; server tratará
        if (coverFromNewIndex == null) {
            const coverId = existingImages.find((i) => i.is_cover)?.id ?? null;
            fd.append('cover_image_id', coverId ? String(coverId) : '');
        } else {
            // quando capa é uma nova imagem: envia cover_image_id vazio e o servidor fará fallback
            fd.append('cover_image_id', '');
        }

        fd.append('_method', 'PATCH');

        router.post(route('properties.update', property.id), fd, {
            forceFormData: true,
            onSuccess: () => toast.success('Propriedade atualizada com sucesso!'),
            onError: () => toast.error('Não foi possível atualizar. Verifique os dados.'),
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Editar Propriedade" />
            <RegularHeader title="Editar Propriedade" description="Atualize os dados e as imagens." />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Básico */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Home className="h-5 w-5" /> Informações Básicas
                            </CardTitle>
                            <CardDescription>Nome, preço e visibilidade</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price_per_night"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Preço / Noite (€)</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="is_visible"
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-between rounded border p-4">
                                        <div>
                                            <FormLabel>Visível</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Localização */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" /> Localização
                            </CardTitle>
                            <CardDescription>Endereço completo</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {(['address', 'postal_code', 'city', 'district', 'country'] as const).map((fieldName) => (
                                <FormField
                                    key={fieldName}
                                    control={form.control}
                                    name={fieldName}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {fieldName === 'postal_code'
                                                    ? 'Código Postal'
                                                    : fieldName === 'city'
                                                      ? 'Cidade'
                                                      : fieldName === 'district'
                                                        ? 'Distrito'
                                                        : fieldName === 'country'
                                                          ? 'País'
                                                          : 'Morada'}
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </CardContent>
                    </Card>

                    {/* Características */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Características</CardTitle>
                            <CardDescription>Quartos, banheiros, área e extras</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {(['bedrooms', 'bathrooms', 'max_guests'] as const).map((key) => (
                                <FormField
                                    key={key}
                                    control={form.control}
                                    name={`features.${key}`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {key === 'bedrooms' ? 'Quartos' : key === 'bathrooms' ? 'Banheiros' : 'Hóspedes Máx.'}
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <FormField
                                control={form.control}
                                name="features.area_m2"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Área (m²)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                value={field.value ?? ''}
                                                onChange={(e) => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="features.extras"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-3">
                                        <FormLabel>Extras</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} rows={2} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Amenities */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Comodidades</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {(Object.keys(amenityLabels) as Array<keyof typeof amenityLabels>).map((key) => {
                                    const Icon = amenityIcons[key];
                                    return (
                                        <FormField
                                            key={key}
                                            control={form.control}
                                            name={key as any}
                                            render={({ field }) => (
                                                <FormItem className="flex items-center space-x-3 rounded border p-4">
                                                    <FormControl>
                                                        <Checkbox checked={field.value as boolean} onCheckedChange={field.onChange} />
                                                    </FormControl>
                                                    <Icon className="h-5 w-5 text-muted-foreground" />
                                                    <FormLabel className="text-sm font-medium">{amenityLabels[key]}</FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Imagens */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Imagens</CardTitle>
                            <CardDescription>A primeira será capa por omissão se não escolher outra.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* existentes */}
                            {existingImages.length > 0 && (
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                    {existingImages.map((img) => (
                                        <div key={img.id} className="group relative">
                                            <img src={img.url} className="h-32 w-full rounded object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeExisting(img.id)}
                                                className="absolute top-2 right-2 rounded-full bg-destructive p-1 opacity-0 group-hover:opacity-100"
                                                aria-label="Remover"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                            {img.is_cover ? (
                                                <Badge className="absolute bottom-2 left-2 bg-primary">
                                                    <Star className="mr-1 h-3 w-3" /> Capa
                                                </Badge>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => makeExistingCover(img.id)}
                                                    className="absolute bottom-2 left-2 rounded bg-background/80 px-2 py-1 text-xs opacity-0 group-hover:opacity-100"
                                                >
                                                    Definir capa
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* novas */}
                            <FormField
                                control={form.control}
                                name="images"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Adicionar novas imagens</FormLabel>
                                        <FormControl>
                                            <input type="file" multiple accept="image/*" onChange={(e) => field.onChange(e.target.files!)} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {newFiles.length > 0 && (
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                    {newFiles.map((file, idx) => (
                                        <div key={idx} className="group relative">
                                            <img src={URL.createObjectURL(file)} className="h-32 w-full rounded object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setNewFiles((p) => p.filter((_, i) => i !== idx));
                                                    if (coverFromNewIndex === idx) setCoverFromNewIndex(null);
                                                }}
                                                className="absolute top-2 right-2 rounded-full bg-destructive p-1 opacity-0 group-hover:opacity-100"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                            {coverFromNewIndex === idx ? (
                                                <Badge className="absolute bottom-2 left-2 bg-primary">
                                                    <Star className="mr-1 h-3 w-3" /> Capa
                                                </Badge>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => makeNewCover(idx)}
                                                    className="absolute bottom-2 left-2 rounded bg-background/80 px-2 py-1 text-xs opacity-0 group-hover:opacity-100"
                                                >
                                                    Definir capa
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Separator />

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => router.visit(route('properties.index'))}>
                            Cancelar
                        </Button>
                        <Button type="submit">Guardar alterações</Button>
                    </div>
                </form>
            </Form>
        </AppLayout>
    );
}
