import React from 'react';

interface AuthCustomLayoutProps {
    children: React.ReactNode;
}

export default function AuthCustomLayout({ children }: AuthCustomLayoutProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-4">
            {children}
        </div>
    );
}
