import { createFileRoute } from '@tanstack/react-router';
import { FaReact } from 'react-icons/fa6';
import { TbBrandFramerMotion } from 'react-icons/tb';
import { RiTailwindCssFill } from 'react-icons/ri';
import { MainLayout } from '../../../main-layout';
import { useTranslation } from '@/hooks/use-translation';

export const Route = createFileRoute('/docs/installation/')({
    component: InstallationPage,
});

function InstallationPage() {
    const {t} = useTranslation();
    return (
        <MainLayout>
        <section className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-20 text-slate-200 sm:py-28">
            {/* Heading */}
            <header className="text-center sm:text-left">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    {t('Installation')} —{' '}
                    <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                        {t('zero-setup today')}
                    </span>
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed sm:mt-6 sm:text-xl">
                    {t('Right now')}{' '}
                    <span className="font-semibold text-white">
                        {t('you don’t need to install anything')}
                    </span>
                    . <br className="hidden sm:inline" />
                    {t('Find a component, copy the snippet, paste it into your')}{' '}
                    React + Tailwind {t('project')} {t('— that’s it.')}
                </p>
            </header>

            {/* Feature list */}
            <ul className="grid gap-6 sm:grid-cols-2">
                <li className="flex items-start gap-3 rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="flex shrink-0 items-center justify-center rounded-full bg-sky-500/20 p-2">
                        <FaReact className="h-5 w-5 text-sky-400" />
                    </div>
                    <div className="text-sm leading-relaxed">
                        Built for{' '}
                        <span className="font-semibold text-white">
                            React 18, Tailwind CSS v3+
                        </span>{' '}
                        &amp; <span className="font-semibold text-white">Framer Motion</span> —
                        modern stack, instant familiarity.
                    </div>
                </li>
                <li className="flex items-start gap-3 rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="flex shrink-0 items-center justify-center rounded-full bg-teal-500/20 p-2">
                        <RiTailwindCssFill className="h-5 w-5 text-teal-300" />
                    </div>
                    <div className="text-sm leading-relaxed">
                        <span className="font-semibold text-white">Zero-config integration.</span>{' '}
                        Copy, paste, ship — no build-time plugins or custom loaders.
                    </div>
                </li>
                <li className="flex items-start gap-3 rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="flex shrink-0 items-center justify-center rounded-full bg-violet-500/20 p-2">
                        <TbBrandFramerMotion className="h-5 w-5 text-violet-300" />
                    </div>
                    <div className="text-sm leading-relaxed">
                        Inspired by{' '}
                        <a
                            href="https://ui.shadcn.com"
                            target="_blank"
                            className="font-semibold underline hover:text-white"
                        >
                            shadcn/ui
                        </a>
                        . Upcoming CLI will let you pull components &amp; themes on demand.
                    </div>
                </li>
                <li className="flex items-start gap-3 rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="flex shrink-0 items-center justify-center rounded-full bg-emerald-500/20 p-2">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-emerald-300"
                        >
                            <path d="M12 5v14" />
                            <path d="M5 12h14" />
                        </svg>
                    </div>
                    <div className="text-sm leading-relaxed">
                        <span className="font-semibold text-white">Drop-in friendly.</span> Fully
                        typed, theme-aware and easy to extend with your own flavors.
                    </div>
                </li>
            </ul>

            {/* Quick start */}
            <div className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10">
                <p className="mb-4 text-base font-semibold text-white sm:text-lg">{t('Quick start')}</p>
                <ol className="space-y-3 text-sm leading-relaxed sm:text-base">
                    <li className="flex items-baseline gap-2">
                        <span className="rounded bg-sky-500 px-2 py-0.5 text-xs font-semibold text-black">
                            1
                        </span>
                        {t('Find a component on Flowscape and copy its code.')}
                    </li>
                    <li className="flex items-baseline gap-2">
                        <span className="rounded bg-sky-500 px-2 py-0.5 text-xs font-semibold text-black">
                            2
                        </span>
                        {t('Paste it into your project')} — Tailwind Framer Motion {t('are probably already there')}.
                    </li>
                    <li className="flex items-baseline gap-2">
                        <span className="rounded bg-sky-500 px-2 py-0.5 text-xs font-semibold text-black">
                            3
                        </span>
                        Adjust classes, motion props, or React logic {t('to fit your design language')}.
                    </li>
                </ol>
                </div>

            {/* Coming soon */}
                <div className="rounded-lg bg-yellow-500/10 p-6 ring-1 ring-yellow-500/30">
                <p className="mb-2 text-base font-semibold text-yellow-300 sm:text-lg">
                    {t('What’s next?')}
                </p>
                <p className="text-sm leading-relaxed sm:text-base">
                    {t('We’re working on an')}{' '}
                    <span className="font-semibold text-white">npm package</span>{' '}{t('so you can')}{' '}
                    <code>npm install flowscape</code> {t('and pick only the pieces you need')}. {t('Expect')} tree-shakable ESM bundles, shadcn-style extraction and CLI
                    {t('scaffolding for lightning-fast')} DX.
                </p>
            </div>
        </section>

        </MainLayout>
            );
}
