import { Head, usePage } from '@inertiajs/react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { ContractPayload } from '@/types/contract';

import { Calendar, CreditCard, Crown, Navigation, Shield, User, X } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gerir Contrato',
        href: '/settings/contract',
    },
];

interface ContractPageProps extends SharedData {
    contract: ContractPayload;
}

export default function Contract() {
    const { auth, contract } = usePage<ContractPageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contrato" />
            <SettingsLayout>
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Current Plan Card */}
                    <Card className="col-span-full md:col-span-1">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-1">
                                    <Crown className="me-1 h-5 w-5 text-primary" />
                                    Plano Atual:<span className={'text-primary'}>{contract.type.name}</span>
                                </CardTitle>
                                {contract.billing.active ? <Badge variant="default">Ativo</Badge> : <Badge variant="default">Inativo</Badge>}
                            </div>
                            <CardDescription>Gerêncie a sua assinatura e plano</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg bg-primary/5 p-4">
                                <div>
                                    <h3 className="text-lg font-semibold">{contract.type.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {contract.billing.price}/{contract.billing.next_charge}
                                    </p>
                                </div>
                                <Shield className="h-8 w-8 text-primary" />
                            </div>

                            <Separator />

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Próxima cobrança:</span>
                                    <span className="font-medium">{contract.billing.next_charge}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Método de pagamento:</span>
                                    <span className="font-medium">**** 1234</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex flex-col gap-2">
                                <Button onClick={() => {}} className="w-full" variant="default">
                                    Mudar Plano
                                </Button>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline" className="w-full">
                                            <X className="mr-2 h-4 w-4" />
                                            Cancelar Assinatura
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Cancelar Assinatura</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Tem certeza que deseja cancelar sua assinatura? Você perderá acesso a todas as funcionalidades premium
                                                ao final do período atual.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Manter Assinatura</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => {}}
                                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                            >
                                                Confirmar Cancelamento
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Plan Features Card */}
                    <Card className="col-span-full md:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-1">
                                <User className="me-1 h-5 w-5 text-primary" />
                                Funcionalidades do Plano
                                <span className="text-primary">{contract.type.name}</span>
                            </CardTitle>
                            <CardDescription>O que está incluído no seu plano {contract.type.name}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                                    <span className="text-sm">Gestão ilimitada de propriedades</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                                    <span className="text-sm">Relatórios avançados</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                                    <span className="text-sm">Suporte prioritário</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                                    <span className="text-sm">Integração com calendários</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                                    <span className="text-sm">Notificações automáticas</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                                    <span className="text-sm">API de integração</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Navigation for mobile */}
                <div className="mt-8 md:hidden">
                    <Navigation />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
