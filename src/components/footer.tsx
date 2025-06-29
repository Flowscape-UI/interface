import { FaGithub } from 'react-icons/fa6';
import { Badge } from './ui/badge';
import { Link } from '@tanstack/react-router';
import { useTranslation } from '@/hooks/use-translation';

export default function Footer() {
    const { t } = useTranslation();
    const soon = () => t('soon');

    return (
        <footer className="supports-backdrop-blur:bg-background/90 border-t border-white/10 bg-white/5 px-6 py-12 text-slate-300 backdrop-blur-lg sm:px-10">
            <div className="mx-auto flex max-w-6xl flex-col gap-12 sm:flex-row sm:justify-between sm:gap-8">
                {/* Brand & description */}
                <div className="flex flex-col items-start gap-4 sm:max-w-xs">
                    <img
                        src="/brand/logo.svg"
                        width={140}
                        height={56}
                        alt="Flowscape logo"
                        loading="eager"
                    />
                    <p className="text-sm leading-relaxed">
                        <span className="font-semibold text-white">Flowscape</span>{' '}
                        {t(
                            `is an open-source UI/UX library that lets you build fluid, animated interfaces without bloat. Totally free for personal & commercial projects.`,
                        )}
                    </p>
                </div>

                {/* Menu & socials */}
                <div className="grid w-full grid-cols-1 gap-8 sm:w-auto sm:grid-cols-3 sm:gap-16">
                    {/* Explore */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
                            {t('Explore')}
                        </h3>
                        <Link to="/components" className="transition hover:text-white">
                            {t('Components')}
                        </Link>
                        <Link disabled to="/templates" className="transition hover:text-white">
                            {t('Pro templates')} <Badge>{soon()}</Badge>
                        </Link>
                        <Link disabled to="/hire" className="transition hover:text-white">
                            {t('Make an order')} <Badge>{soon()}</Badge>
                        </Link>
                    </div>

                    {/* Docs */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
                            {t('Docs')}
                        </h3>
                        <Link to="/docs/installation" className="transition hover:text-white">
                            {t('Getting started')}
                        </Link>
                        <Link disabled to="/docs/cli" className="transition hover:text-white">
                            CLI <Badge>{soon()}</Badge>
                        </Link>
                        <Link disabled to="/changelog" className="transition hover:text-white">
                            {t('Changelog')} <Badge>{soon()}</Badge>
                        </Link>
                    </div>

                    {/* Socials */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
                            {t('Social')}
                        </h3>
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 transition hover:text-white"
                        >
                            <FaGithub className="h-4 w-4" /> GitHub
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom note */}
            <div className="mt-12 text-center text-base text-slate-500">
                &copy; <time dateTime={new Date().toISOString()}>{new Date().getFullYear()}</time>{' '}
                Flowscape. {t('Crafted with ❤️ and open‑sourced under')} MIT.
            </div>
        </footer>
    );
}
