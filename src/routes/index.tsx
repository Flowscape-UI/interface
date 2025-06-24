import { GITHUB_URL } from '@/lib/constants';
import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-4 sm:px-6 py-24 text-white">
            {/* Subtle star-like noise overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-screen" />

            {/* Morphing lava-lamp blobs */}
            <AnimatedBlob
                className="absolute -top-[20%] -left-[10%] opacity-40 mix-blend-screen"
                size={500}
                duration={5}
                from="#ff4ecd"
                via="#6b5bff"
                to="#4dd0ff"
            />
            <AnimatedBlob
                className="absolute right-[-15%] bottom-[-25%] opacity-45 mix-blend-screen"
                size={600}
                delay={4}
                duration={5}
                from="#6b5bff"
                via="#4dd0ff"
                to="#00f2fe"
            />
            <AnimatedBlob
                className="absolute top-[10%] right-[25%] opacity-35 mix-blend-screen"
                size={350}
                delay={2}
                duration={8}
                from="#ff4ecd"
                via="#ff6e7f"
                to="#ffc371"
            />

            {/* Content */}
            <div className="relative z-10 flex max-w-2xl flex-col items-center gap-6 text-center">
                <img
                    src="/brand/logo.svg"
                    alt="Flowscape logo"
                    loading="eager"
                    className="h-auto w-48 sm:w-64"
                />
                <h1 className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-3xl sm:text-5xl leading-tight font-extrabold text-transparent drop-shadow-[0_4px_12px_rgba(0,255,255,0.25)]">
                    Craft fluid UI & seamless UX
                </h1>
                <p className="mt-2 max-w-lg text-sm sm:text-lg text-slate-300">
                    Import <span className="font-semibold text-white">exactly</span> what you need —
                    animated buttons, auth panels, interactive backgrounds, dashboard widgets &
                    more. No bloat. Pure control.
                </p>

                {/* CTA */}
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link
                        to="/docs/installation"
                        className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-6 py-3 font-medium text-black transition hover:bg-sky-400 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="transition group-hover:translate-x-0.5"
                        >
                            <path
                                d="M4 12H20"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M14 6L20 12L14 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Get Started
                    </Link>
                    <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-white/5 px-6 py-3 font-medium transition hover:bg-white/10 focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="18"
                            height="18"
                            fill="currentColor"
                            className="text-slate-300"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 2C6.48 2 2 6.72 2 12.43c0 4.57 2.87 8.45 6.84 9.82.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.19-1.12-1.51-1.12-1.51-.92-.65.07-.64.07-.64 1.02.07 1.55 1.06 1.55 1.06.9 1.57 2.36 1.12 2.93.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.15-4.56-5.13 0-1.13.39-2.06 1.03-2.78-.1-.26-.45-1.28.1-2.66 0 0 .84-.28 2.75 1.06A9.36 9.36 0 0 1 12 6.86c.85.004 1.7.12 2.5.34 1.9-1.34 2.74-1.06 2.74-1.06.55 1.38.2 2.4.1 2.66.64.72 1.03 1.65 1.03 2.78 0 3.99-2.34 4.87-4.57 5.13.36.32.69.94.69 1.89 0 1.37-.01 2.47-.01 2.81 0 .26.18.59.69.48A10.02 10.02 0 0 0 22 12.43C22 6.72 17.52 2 12 2z"
                            />
                        </svg>
                        GitHub
                    </a>
                </div>
            </div>
        </main>
    );
}

/**
 * AnimatedBlob – morphing SVG path that behaves like lava-lamp wax.
 */
function AnimatedBlob({
    className,
    delay = 0,
    duration = 14,
    size = 400,
    from,
    via,
    to,
}: {
    className?: string;
    delay?: number;
    duration?: number;
    size?: number;
    from: string;
    via: string;
    to: string;
}) {
    // Two smooth blob shapes (same point count) for path morphing
    const shapeA =
        'M60 0C90 -5 120 25 120 60C120 95 90 125 60 120C25 120 -10 90 0 60C-10 25 25 -5 60 0Z';
    const shapeB =
        'M65 0C100 10 130 45 128 75C126 105 95 142 60 138C20 135 -20 102 -22 70C-25 40 25 -5 65 0Z';

    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="-30 -30 180 180"
            className={`pointer-events-none select-none ${className}`}
            style={{ filter: 'blur(50px)' }}
            aria-hidden
        >
            <defs>
                <linearGradient id={`grad-${from}-${to}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={from} />
                    <stop offset="50%" stopColor={via} />
                    <stop offset="100%" stopColor={to} />
                </linearGradient>
            </defs>
            <motion.path
                initial={{ d: shapeA }}
                animate={{ d: [shapeA, shapeB, shapeA] }}
                transition={{ duration, ease: 'easeInOut', repeat: Infinity, delay }}
                fill={`url(#grad-${from}-${to})`}
            />
        </motion.svg>
    );
}
