import Footer from '@/components/footer';
import { Header } from '@/components/header';
import LinksSidebar from '@/components/links-sidebar';
import TableOfContents from '@/components/table-of-contents';
import type { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren<unknown>) {
    return (
        <div className="flex flex-col mx-auto w-full min-h-screen">
            <Header />
            <div className='inline-flex w-full justify-between'>
                <aside className="top-8 z-30 hidden h-[calc(100vh-3.5rem)] w-full max-w-64 shrink-0 border-r md:sticky md:block supports-backdrop-blur:bg-background/90 backdrop-blur-lg bg-white/5">
                    <LinksSidebar />
                </aside>
                <main className='w-full flex flex-col gap-4 max-w-3xl'>
                    {children}
                </main>
                <aside className="top-8 z-30 hidden h-screen w-full max-w-64 px-4 shrink-0 border-l sticky md:block supports-backdrop-blur:bg-background/90 backdrop-blur-lg bg-white/5">
                    <TableOfContents />
                </aside>
            </div>
            <Footer />
        </div>
    );
}
