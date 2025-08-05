// resources/js/Pages/Properties/AddProperty.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useForm, type Resolver, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { route } from 'ziggy-js';
import { z } from 'zod';

import { RegularHeader } from '@/components/reservaki/ui/custom-headers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Car, ChefHat, Flame, Home, MapPin, Snowflake, Star, WashingMachine, Waves, Wifi, X } from 'lucide-react';

//
// 1) Ícones e labels para as comodidades
//
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

//
// 2) Schema Zod
//
const propertySchema = z.object({
    name: z.string().min(1, 'Nome obrigatório'),
    address: z.string().min(1, 'Morada obrigatória'),
    postal_code: z.string().min(1, 'Código postal obrigatório'),
    city: z.string().min(1, 'Cidade obrigatória'),
    district: z.string().optional(),
    country: z.string().min(1, 'País obrigatório'),
    price_per_night: z.coerce.number().min(0, 'Preço deve ser ≥ 0'),
    is_visible: z.boolean(),
    description: z.string().optional(),
    features: z.object({
        bedrooms: z.coerce.number().min(0, '≥ 0'),
        bathrooms: z.coerce.number().min(0, '≥ 0'),
        max_guests: z.coerce.number().min(1, '≥ 1'),
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
    images: z.custom<FileList>().refine((list) => list && list.length > 0, 'Carregue pelo menos 1 imagem'),
});
type PropertyFormData = z.infer<typeof propertySchema>;

export default function AddProperty() {
    const [previewFiles, setPreviewFiles] = useState<File[]>([]);
    const [coverImageIndex, setCoverImageIndex] = useState(0);
    const amenityKeys = Object.keys(amenityIcons) as Array<keyof typeof amenityIcons>;

    const form = useForm<PropertyFormData>({
        resolver: zodResolver(propertySchema) as Resolver<PropertyFormData>,
        defaultValues: {
            name: '',
            address: '',
            postal_code: '',
            city: '',
            district: '',
            country: 'Portugal',
            price_per_night: 0,
            is_visible: false,
            description: '',
            features: {
                bedrooms: 0,
                bathrooms: 0,
                max_guests: 1,
                area_m2: null,
                extras: '',
            },
            has_kitchen: false,
            has_air_conditioning: false,
            has_heating: false,
            has_wifi: false,
            has_parking: false,
            has_pool: false,
            has_washing_machine: false,
            images: undefined,
        },
    });

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = form;

    // Atualiza as pré-visualizações quando o FileList muda
    useEffect(() => {
        const files = watch('images') as FileList | undefined;
        if (files) {
            const arr = Array.from(files);
            setPreviewFiles(arr);
            if (coverImageIndex >= arr.length) setCoverImageIndex(0);
        }
    }, [watch('images')]);

    const onSubmit: SubmitHandler<PropertyFormData> = (data) => {
        const fd = new FormData();

        // Propriedade
        fd.append('name', data.name);
        fd.append('address', data.address);
        fd.append('postal_code', data.postal_code);
        fd.append('city', data.city);
        if (data.district) fd.append('district', data.district);
        fd.append('country', data.country);
        fd.append('price_per_night', String(data.price_per_night));
        fd.append('is_visible', data.is_visible ? '1' : '0');
        if (data.description) fd.append('description', data.description);

        // Features
        fd.append('features[bedrooms]', String(data.features.bedrooms));
        fd.append('features[bathrooms]', String(data.features.bathrooms));
        fd.append('features[max_guests]', String(data.features.max_guests));
        if (data.features.area_m2 != null) {
            fd.append('features[area_m2]', String(data.features.area_m2));
        }
        if (data.features.extras) {
            fd.append('features[extras]', data.features.extras);
        }

        amenityKeys.forEach((key) => {
            // agora `data[key]` é boolean (tipado)
            fd.append(key, data[key] ? '1' : '0');
        });

        // Imagens
        previewFiles.forEach((file) => fd.append('images[]', file));

        router.post(route('properties.store'), fd, {
            forceFormData: true,
            onSuccess: () => toast.success('Propriedade criada com sucesso!'),
            onError: (errs) => {
                console.error(errs);
                toast.error('Erro de validação, veja console');
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Adicionar Propriedade" />
            <RegularHeader title="Adicionar Nova Propriedade" description="Preencha os dados e imagens da sua propriedade." />

            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Informações Básicas */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Home className="h-5 w-5" /> Informações Básicas
                            </CardTitle>
                            <CardDescription>Nome, preço e visibilidade</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                control={control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Casa da Praia" />
                                        </FormControl>
                                        <FormMessage>{errors.name?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="price_per_night"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Preço / Noite (€)</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                        </FormControl>
                                        <FormMessage>{errors.price_per_night?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="is_visible"
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-between rounded border p-4">
                                        <div>
                                            <FormLabel>Visível</FormLabel>
                                            <FormDescription>Disponível para hóspedes</FormDescription>
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
                            <FormField
                                control={control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Morada</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Rua X, 123" />
                                        </FormControl>
                                        <FormMessage>{errors.address?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="postal_code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Código Postal</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="1000-001" />
                                        </FormControl>
                                        <FormMessage>{errors.postal_code?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cidade</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Lisboa" />
                                        </FormControl>
                                        <FormMessage>{errors.city?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="district"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Distrito</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Lisboa" />
                                        </FormControl>
                                        <FormMessage>{errors.district?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>País</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Portugal" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {['Portugal', 'Espanha', 'França', 'Brasil'].map((c) => (
                                                        <SelectItem key={c} value={c}>
                                                            {c}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage>{errors.country?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
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
                                <FormField<PropertyFormData, `features.${typeof key}`>
                                    key={key}
                                    control={control}
                                    name={`features.${key}`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {key === 'bedrooms' ? 'Quartos' : key === 'bathrooms' ? 'Banheiros' : 'Hóspedes Máx.'}
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                            </FormControl>
                                            <FormMessage>{errors.features?.[key]?.message}</FormMessage>
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <FormField
                                control={control}
                                name="features.area_m2"
                                render={({ field }) => {
                                    // field.value: number | null | undefined
                                    const val = field.value;
                                    return (
                                        <FormItem>
                                            <FormLabel>Área (m²)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder={'Área (m²)'}
                                                    value={val ?? ''}
                                                    onChange={(e) => {
                                                        const v = e.target.value;
                                                        field.onChange(v === '' ? null : Number(v));
                                                    }}
                                                    onBlur={field.onBlur}
                                                    name={field.name}
                                                    // mantém o ref para react-hook-form
                                                    ref={field.ref}
                                                />
                                            </FormControl>
                                            <FormMessage>{errors.features?.area_m2?.message}</FormMessage>
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                control={control}
                                name="features.extras"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-3">
                                        <FormLabel>Extras</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} rows={2} />
                                        </FormControl>
                                        <FormMessage>{errors.features?.extras?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Comodidades */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Comodidades</CardTitle>
                            <CardDescription>Selecione as comodidades disponíveis na propriedade</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {Object.entries(amenityLabels).map(([key, label]) => {
                                    const Icon = amenityIcons[key as keyof typeof amenityIcons];
                                    return (
                                        <FormField
                                            key={key}
                                            control={control}
                                            name={key as keyof PropertyFormData}
                                            render={({ field }) => (
                                                <FormItem className="flex items-center space-x-3 rounded border p-4">
                                                    <FormControl>
                                                        <Checkbox checked={field.value as boolean} onCheckedChange={field.onChange} />
                                                    </FormControl>
                                                    <Icon className="h-5 w-5 text-muted-foreground" />
                                                    <FormLabel className="text-sm font-medium">{label}</FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Upload de Imagens */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Imagens</CardTitle>
                            <CardDescription>A primeira será capa (max 2 MB, JPG/PNG)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={control}
                                name="images"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Carregar Imagens</FormLabel>
                                        <FormControl>
                                            <input
                                                name="images[]"
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={(e) => field.onChange(e.target.files!)}
                                            />
                                        </FormControl>
                                        <FormMessage>{errors.images?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />

                            {previewFiles.length > 0 && (
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                    {previewFiles.map((file, idx) => (
                                        <div key={idx} className="group relative">
                                            <img src={URL.createObjectURL(file)} className="h-32 w-full rounded object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPreviewFiles((p) => p.filter((_, i) => i !== idx));
                                                    setCoverImageIndex((p) => (p === idx ? 0 : p > idx ? p - 1 : p));
                                                }}
                                                className="absolute top-2 right-2 rounded-full bg-destructive p-1 opacity-0 group-hover:opacity-100"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                            {idx === coverImageIndex ? (
                                                <Badge className="absolute bottom-2 left-2 bg-primary">
                                                    <Star className="mr-1 h-3 w-3" /> Capa
                                                </Badge>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => setCoverImageIndex(idx)}
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
                        <Button type="button" variant="outline" disabled={isSubmitting}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            Criar Propriedade
                        </Button>
                    </div>
                </form>
            </Form>
        </AppLayout>
    );
}
