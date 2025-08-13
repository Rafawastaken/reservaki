import FlashMessenger from '@/components/ui/flash-messenger';
import { Toaster } from '@/components/ui/sonner';
import { type ReactNode } from 'react';

interface PublicLayoutProps {
    children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div className="bg-gradient-subtle min-h-screen">
            <Toaster position={'bottom-right'} />
            <FlashMessenger />
            {children}
        </div>
    );
}
