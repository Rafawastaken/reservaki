import { usePage } from '@inertiajs/react';

type PageProps = {
    contractId: string;
};

export default function Payment() {
    const { contractId } = usePage<PageProps>().props;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Pagamento</h1>
            <p>Contrato #{contractId}</p>
        </div>
    );
}
