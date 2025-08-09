// resources/js/components/flash-messenger.tsx
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';

type Flash = { success?: string; error?: string; info?: string };

export default function FlashMessenger() {
    const { flash } = usePage<{ flash?: Flash }>().props;

    useEffect(() => {
        if (!flash) return;

        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
        if (flash.info) toast.message(flash.info);
    }, [flash]);

    return null;
}
