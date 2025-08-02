import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthCustomLayout from '@/layouts/auth/auth-custom-layout';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthCustomLayout>
            <Head title="Login" />
            <form onSubmit={submit} className={'flex flex-col gap-6'}>
                <Card className="w-full border-none bg-white/40 shadow-md md:w-xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">Entrar</CardTitle>
                        <CardDescription>Entre na sua conta para continuar</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                autoFocus
                                required
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
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
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onClick={() => setData('remember', !data.remember)}
                                    tabIndex={3}
                                    className={'rounded border-input'}
                                />
                                <Label htmlFor="remember">Lembrar de mim</Label>
                            </div>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="text-sm text-primary hover:underline">
                                    Esqueci minha senha
                                </TextLink>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button className="w-full" size="lg">
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Entrar
                        </Button>
                        <div className="text-center text-sm text-muted-foreground">
                            Não tem uma conta?{' '}
                            <TextLink href={route('register')} className="text-primary hover:underline">
                                Registe-se
                            </TextLink>
                        </div>
                    </CardFooter>
                </Card>
            </form>
            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthCustomLayout>
    );
}
