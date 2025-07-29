export default function Footer() {
    return (
        <footer className="border-t bg-background py-12">
            <div className="container mx-auto px-4">
                <div className="grid gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-primary">Reservaki</h3>
                        <p className="text-muted-foreground">A plataforma de gestão de alojamento local para pequenos proprietários.</p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-semibold">Produto</h4>
                        <div className="space-y-2 text-muted-foreground">
                            <div>Funcionalidades</div>
                            <div>Preços</div>
                            <div>Demo</div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-semibold">Suporte</h4>
                        <div className="space-y-2 text-muted-foreground">
                            <div>Centro de Ajuda</div>
                            <div>Contactar</div>
                            <div>Documentação</div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-semibold">Legal</h4>
                        <div className="space-y-2 text-muted-foreground">
                            <div>Privacidade</div>
                            <div>Termos</div>
                            <div>Cookies</div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-muted-foreground">© 2025 Reservaki. Todos os direitos reservados.</div>
            </div>
        </footer>
    );
}
