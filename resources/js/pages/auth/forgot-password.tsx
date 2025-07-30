// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthCustomLayout from '@/layouts/auth/auth-custom-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <AuthCustomLayout>
            <Head title="Forgot password" />
            <form onSubmit={submit}>
                <Card className="w-full border-none bg-white/40 shadow-md md:w-xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">Esqueceu-se da password?</CardTitle>
                        <CardDescription>Introduza o endereço de email da sua conta</CardDescription>
                        {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="off"
                                value={data.email}
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="my-6 flex items-center justify-start">
                            <Button className="w-full" size="lg" disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Recuperar senha
                            </Button>
                        </div>

                        <div className="space-x-1 text-center text-sm text-muted-foreground">
                            <TextLink href={route('login')} className="text-primary hover:underline">
                                Retornar para Login
                            </TextLink>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </AuthCustomLayout>
    );
}
