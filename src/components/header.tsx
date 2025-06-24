// components/Header.tsx
import { HiOutlineMenu } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa6';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from '../components/ui/drawer';
import { cn } from '../lib/utils';
import LinksSidebar from './links-sidebar';
import { Link } from '@tanstack/react-router';
import { GITHUB_URL } from '@/lib/constants';

/**
 * Simplified site header.
 *
 * Desktop: logo + nav (Components, Make an order) + GitHub icon.
 * Mobile : burger → bottom Drawer with the same nav links.
 */
export function Header() {
    const nav = [
        { href: '/components', label: 'Components' },
        { href: '/hire', label: 'Make an order' },
    ];

    const NavLinks = ({ className }: { className?: string }) => (
        <nav className={cn('flex items-center gap-6', className)}>
            {nav.map((n) => (
                <Link key={n.href} to={n.href} className="text-slate-200 hover:text-white">
                    {n.label}
                </Link>
            ))}
            <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-200 hover:text-white"
            >
                <FaGithub className="h-4 w-4" />
            </a>
        </nav>
    );

    return (
        <header className="supports-backdrop-blur:bg-background/90 border-border sticky top-0 z-[1000] w-full border-b bg-white/5 backdrop-blur-lg">
            <div className="flex w-full items-center justify-between px-4 sm:px-6 py-3">
                {/* brand */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-base sm:text-lg font-bold tracking-tight text-white"
                >
                    <img src="/brand/logo.svg" alt="Flowscape" className="h-6 w-auto sm:h-8" />
                    <span className="hidden sm:inline">Flowscape</span>
                </Link>

                {/* desktop nav */}
                <NavLinks className="hidden md:flex" />

                {/* mobile burger + drawer */}
                <Drawer>
                    <DrawerTrigger asChild>
                        <button className="text-slate-200 md:hidden">
                            <HiOutlineMenu className="h-6 w-6" />
                        </button>
                    </DrawerTrigger>
                    <DrawerContent className="py-6">
                        <div className="flex flex-col gap-6 text-lg px-4">
                            <nav className="flex flex-col gap-4">
                                {nav.map((n) => (
                                    <DrawerClose asChild key={n.href}>
                                        <Link to={n.href} className="w-full text-left py-2">
                                            {n.label}
                                        </Link>
                                    </DrawerClose>
                                ))}
                            </nav>
                            <hr />
                            <div className="flex-1 overflow-y-auto">
                                <LinksSidebar />
                            </div>
                            <hr />
                            <DrawerClose asChild>
                                <a
                                    href={GITHUB_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 py-2"
                                >
                                    <FaGithub className="h-5 w-5" /> GitHub
                                </a>
                            </DrawerClose>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </header>
    );
}
