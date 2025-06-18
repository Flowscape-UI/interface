// components/Header.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineMenu } from "react-icons/hi";
import { FaGithub } from "react-icons/fa6";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerClose,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import LinksSidebar from "./links-sidebar";

/**
 * Simplified site header.
 *
 * Desktop: logo + nav (Components, Make an order) + GitHub icon.
 * Mobile : burger → bottom Drawer with the same nav links.
 */
export function Header() {
    const nav = [
        { href: "/components", label: "Components" },
        { href: "/hire", label: "Make an order" },
    ];

    const NavLinks = ({ className }: { className?: string }) => (
        <nav className={cn("flex items-center gap-6", className)}>
            {nav.map((n) => (
                <Link key={n.href} href={n.href} className="text-slate-200 hover:text-white">
                    {n.label}
                </Link>
            ))}
            <a
                href="https://github.com/flowscape/flowscape"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-200 hover:text-white"
            >
                <FaGithub className="h-4 w-4" />
            </a>
        </nav>
    );

    return (
        <header className="supports-backdrop-blur:bg-background/90 sticky top-0 z-[1000] w-full border-b border-border backdrop-blur-lg bg-white/5">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3">
                {/* brand */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-white"
                >
                    <Image src="/brand/logo.svg" alt="Flowscape" width={32} height={24} />
                    Flowscape
                </Link>

                {/* desktop nav */}
                <NavLinks className="hidden md:flex" />

                {/* mobile burger + drawer */}
                <Drawer>
                    <DrawerTrigger asChild>
                        <button className="md:hidden text-slate-200">
                            <HiOutlineMenu className="h-6 w-6" />
                        </button>
                    </DrawerTrigger>
                    <DrawerContent className="py-6">
                        <div className="flex flex-col items-center gap-6 text-lg mt-6">
                            {nav.map((n) => (
                                <DrawerClose asChild key={n.href}>
                                    <Link href={n.href} className="w-full text-center" >
                                        {n.label}
                                    </Link>
                                </DrawerClose>
                            ))}
                            <div className="size-full overflow-y-auto">
                                <h2 className="my-2 mx-4 text-2xl">Navigation</h2>
                                <hr />
                                <div className="h-60 px-4">
                                    <LinksSidebar />
                                </div>
                            </div>
                            <DrawerClose asChild>
                                <a
                                    href="https://github.com/flowscape/flowscape"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
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
