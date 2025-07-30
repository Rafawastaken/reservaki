import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

type RegisterForm = {
    name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    contract_pricing_id: string;
    accepted_terms: boolean;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        contract_pricing_id: '',
        accepted_terms: false,
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-4">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <Card className="w-full border-none bg-white/40 shadow-md md:w-xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold text-primary">Criar Conta</CardTitle>
                        <CardDescription>Crie sua conta para começar a usar nossa plataforma</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">Nome</Label>
                                <Input
                                    id="firstName"
                                    placeholder="João"
                                    onChange={(e) => setData('name', e.target.value)}
                                    value={data.name}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Sobrenome</Label>
                                <Input
                                    id="lastName"
                                    placeholder="Silva"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.last_name} className="mt-2" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                placeholder="seu@email.com"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                            <InputError message={errors.password} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                            <InputError message={errors.password_confirmation} />
                        </div>
                        <div className="z-10 space-y-2">
                            <Label htmlFor="contractType">Tipo de Contrato</Label>
                            <Select required value={data.contract_pricing_id} onValueChange={(value) => setData('contract_pricing_id', value)}>
                                <SelectTrigger className={'z-10'}>
                                    <SelectValue placeholder="Selecione um plano" />
                                </SelectTrigger>
                                <SelectContent className={'z'}>
                                    <SelectItem value="1">Trial - Grátis 7 dias</SelectItem>
                                    <SelectItem value="2">Basic - €9,99/mês</SelectItem>
                                    <SelectItem value="3">Basic - €99,90/ano</SelectItem>
                                    <SelectItem value="4">Premium - €19,99/mês</SelectItem>
                                    <SelectItem value="5">Premium - €199,90/ano</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                id="terms"
                                type="checkbox"
                                className="rounded border-input"
                                required
                                checked={data.accepted_terms}
                                onChange={(e) => setData('accepted_terms', e.target.checked)}
                            />
                            <Label htmlFor="terms" className="text-sm">
                                Aceito os{' '}
                                <TextLink href={'#'} className="text-primary hover:underline">
                                    termos de uso
                                </TextLink>{' '}
                                e{' '}
                                <TextLink href={'#'} className="text-primary hover:underline">
                                    política de privacidade
                                </TextLink>
                            </Label>
                            <InputError message={errors.accepted_terms} className="mt-2" />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button className="w-full" size="lg" type={'submit'} disabled={processing}>
                            Criar Conta
                        </Button>
                        <div className="text-center text-sm text-muted-foreground">
                            Já tem uma conta?{' '}
                            <TextLink href={route('login')} className="text-primary hover:underline">
                                Entre aqui
                            </TextLink>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}
