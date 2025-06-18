"use client";

import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaXTwitter, FaDiscord } from "react-icons/fa6";
import { Badge } from "./ui/badge";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 supports-backdrop-blur:bg-background/90 backdrop-blur-lg bg-white/5 px-6 py-12 text-slate-300 sm:px-10">
            <div className="mx-auto flex max-w-6xl flex-col gap-12 sm:flex-row sm:justify-between sm:gap-8">
                {/* Brand & description */}
                <div className="flex flex-col items-start gap-4 sm:max-w-xs">
                    <Image src="/brand/logo.svg" width={140} height={56} priority alt="Flowscape logo" />
                    <p className="text-sm leading-relaxed">
                        <span className="font-semibold text-white">Flowscape</span> is an open‑source UI / UX library that lets you build fluid, animated interfaces without bloat. Totally
                        <span className="font-semibold text-white"> free</span> for personal & commercial projects.
                    </p>
                </div>

                {/* Menu & socials */}
                <div className="grid w-full grid-cols-1 gap-8 sm:w-auto sm:grid-cols-3 sm:gap-16">
                    {/* Explore */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Explore</h3>
                        <Link href="/components" className="hover:text-white transition">
                            Components
                        </Link>
                        <Link href="/templates" className="hover:text-white transition">
                            Pro templates <Badge>soon</Badge>
                        </Link>
                        <Link href="/hire" className="hover:text-white transition">
                            Make an order <Badge>soon</Badge>
                        </Link>
                    </div>

                    {/* Docs */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Docs</h3>
                        <Link href="/docs/getting-started" className="hover:text-white transition">
                            Getting started
                        </Link>
                        <Link href="/docs/cli" className="hover:text-white transition">
                            CLI <Badge>soon</Badge>
                        </Link>
                        <Link href="/changelog" className="hover:text-white transition">
                            Changelog
                        </Link>
                    </div>

                    {/* Socials */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Social</h3>
                        <Link
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-white transition"
                        >
                            <FaGithub className="h-4 w-4" /> GitHub
                        </Link>
                        <Link
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-white transition"
                        >
                            <FaXTwitter className="h-4 w-4" /> Twitter
                        </Link>
                        <Link
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-white transition"
                        >
                            <FaDiscord className="h-4 w-4" /> Discord
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom note */}
            <div className="mt-12 text-center text-base text-slate-500">
                &copy; <time dateTime={(new Date()).toISOString()}>{new Date().getFullYear()}</time> Flowscape. Crafted with ❤️ and open‑sourced under MIT.
            </div>
        </footer>
    );
}
