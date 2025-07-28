export default function Steps() {
    const steps = [
        {
            number: '01',
            title: 'Crie a sua conta',
            description: 'Registe-se em menos de 2 minutos',
        },
        {
            number: '02',
            title: 'Adicione as suas propriedades',
            description: 'Insira fotos, descrições e comodidades',
        },
        {
            number: '03',
            title: 'Comece a receber reservas',
            description: 'Os hóspedes podem reservar diretamente',
        },
    ];

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="mb-16 space-y-4 text-center">
                    <h2 className="text-3xl font-bold lg:text-4xl">Como funciona</h2>
                    <p className="text-xl text-muted-foreground">Configure a sua presença online em 3 passos simples</p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            <div className="space-y-4 text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl font-bold text-accent-foreground">
                                    {step.number}
                                </div>
                                <h3 className="text-xl font-semibold">{step.title}</h3>
                                <p className="text-muted-foreground">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
