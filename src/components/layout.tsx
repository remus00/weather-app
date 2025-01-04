import type { PropsWithChildren } from 'react';
import { Footer } from './footer';

export const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className="bg-gradient-to-br from-background to-muted">
            header
            <main className="container mx-auto min-h-screen px-4 py-8">{children}</main>
            <Footer />
        </div>
    );
};
