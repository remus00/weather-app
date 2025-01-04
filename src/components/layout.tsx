import type { PropsWithChildren } from 'react';
import { Footer } from './footer';
import { Header } from './header';

export const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className="bg-gradient-to-br from-background to-muted">
            <Header />
            <main className="container mx-auto min-h-screen px-4 py-8">{children}</main>
            <Footer />
        </div>
    );
};
