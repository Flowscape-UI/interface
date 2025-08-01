import { createFileRoute } from '@tanstack/react-router';
import { MainLayout } from '../../../main-layout';
import { FaReact } from 'react-icons/fa6';
import { RiTailwindCssFill } from 'react-icons/ri';
import { TbBrandFramerMotion } from 'react-icons/tb';
import { useTranslation } from '@/hooks/use-translation';
import { BBCodeRenderer } from '@/lib/parse-bb-code';

export const Route = createFileRoute('/docs/quick-start/')({
    component: QuickStartPage,
});

function QuickStartPage() {
    const { t, currentLanguage } = useTranslation();
    return (
        <MainLayout>
            <section className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-20 text-slate-200 sm:py-28">
                {/* Heading */}
                <header className="text-center sm:text-left">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                        {currentLanguage === 'en' && (
                            <BBCodeRenderer
                                text={
                                    "Get started — [b class='bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent']why[/b]"
                                }
                            />
                        )}
                        {currentLanguage !== 'en' && (
                            <BBCodeRenderer text={t('Get started — why')} />
                        )}
                        <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                            {' '}
                            Flowscape?
                        </span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed sm:mt-6 sm:text-xl">
                        {currentLanguage === 'en' && (
                            <BBCodeRenderer
                                text={
                                    "Every component is [b class='font-semibold text-white']100% free[/b] and production-ready. No paywalls, just copy, paste and ship."
                                }
                            />
                        )}
                        {currentLanguage !== 'en' && (
                            <BBCodeRenderer
                                text={t(
                                    'Every component is 100% free and production-ready. No paywalls, just copy, paste and ship.',
                                )}
                            />
                        )}
                    </p>
                </header>

                {/* Feature list */}
                <ul className="grid gap-6 sm:grid-cols-2">
                    <li className="flex items-start gap-3 rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
                        <div className="flex shrink-0 items-center justify-center rounded-full bg-sky-500/20 p-2">
                            <FaReact className="h-5 w-5 text-sky-400" />
                        </div>
                        <div className="text-sm leading-relaxed">
                            <span className="font-semibold text-white">
                                React, Tailwind CSS, Framer Motion
                            </span>{' '}
                            — modern, fast and easily customizable.
                        </div>
                    </li>
                    <li className="flex items-start gap-3 rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
                        <div className="flex shrink-0 items-center justify-center rounded-full bg-teal-500/20 p-2">
                            <RiTailwindCssFill className="h-5 w-5 text-teal-300" />
                        </div>
                        <div className="text-sm leading-relaxed">
                            <span className="font-semibold text-white">
                                Zero-config integration.
                            </span>{' '}
                            Copy a snippet, drop it in your project — it just works.
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
                                rel="noopener noreferrer"
                                className="font-semibold underline hover:text-white"
                            >
                                shadcn/ui
                            </a>
                            . CLI support is coming for even smoother DX.
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
                            <span className="font-semibold text-white">Add your flavour.</span>{' '}
                            Fully typed components, theme ready and easy to extend.
                        </div>
                    </li>
                </ul>

                {/* Quick start */}
                <div className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10">
                    <p className="mb-4 text-base font-semibold text-white sm:text-lg">
                        {t('Quick start')}
                    </p>
                    <ol className="space-y-3 text-sm leading-relaxed sm:text-base">
                        <li className="flex items-baseline gap-2">
                            <span className="rounded bg-sky-500 px-2 py-0.5 text-xs font-semibold text-black">
                                1
                            </span>
                            {t('Search for a component and copy its code.')}
                        </li>
                        <li className="flex items-baseline gap-2">
                            <span className="rounded bg-sky-500 px-2 py-0.5 text-xs font-semibold text-black">
                                2
                            </span>
                            {t('Paste it into your project. Dependencies? Already installed!')}
                        </li>
                        <li className="flex items-baseline gap-2">
                            <span className="rounded bg-sky-500 px-2 py-0.5 text-xs font-semibold text-black">
                                3
                            </span>
                            Tweak Tailwind classes, motion props or React logic {t('as you wish')}.
                        </li>
                    </ol>
                </div>
            </section>
        </MainLayout>
    );
}
