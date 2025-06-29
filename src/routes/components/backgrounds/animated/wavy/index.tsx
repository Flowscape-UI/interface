import type { CSSProperties } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { MainLayout } from '@/main-layout';
import PageTitle from '@/components/ui/page-title';
import { PreviewTabs } from '@/components/preview-tabs';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { useTranslation } from '@/hooks/use-translation';

export const Route = createFileRoute('/components/backgrounds/animated/wavy/')({
    component: WavyPage,
});

/* --------------------------------------------------
 * Component
 * -------------------------------------------------- */

interface WaveConfig {
    duration: number;
    delay: number;
    opacity: number;
    zIndex: number;
    bottom: number;
    direction: 'forward' | 'reverse';
}

interface WavyBackgroundProps {
    backgroundColor?: string;
    height?: string;
    waveImage?: string;
    waves?: WaveConfig[];
    className?: string;
}

const defaultWaves: WaveConfig[] = [
    { duration: 20, delay: 0, opacity: 0.9, zIndex: 15, bottom: 0, direction: 'forward' },
    { duration: 15, delay: -5, opacity: 0.7, zIndex: 10, bottom: 10, direction: 'reverse' },
    { duration: 10, delay: -2, opacity: 0.4, zIndex: 5, bottom: 15, direction: 'forward' },
    { duration: 5, delay: -5, opacity: 0.5, zIndex: 1, bottom: 20, direction: 'reverse' },
];

const waveSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="M0,50 C250,100 250,0 500,50 S750,100 1000,50 L1000,100 L0,100 Z" fill="white"/></svg>`;
const encodedWaveSvg = `data:image/svg+xml;base64,${typeof window !== 'undefined' ? btoa(waveSvg) : ''}`;

function WavyBackground({
    backgroundColor = '#4779f7',
    height = '100%',
    waveImage = encodedWaveSvg,
    waves = defaultWaves,
    className = '',
}: WavyBackgroundProps) {
    return (
        <section
            className={`relative w-full overflow-hidden ${className}`}
            style={{
                height,
                backgroundColor,
                willChange: 'transform',
            }}
        >
            <style>{`
                @keyframes waveForward {
                    0% { background-position-x: 0; }
                    100% { background-position-x: 100vw; }
                }
                @keyframes waveReverse {
                    0% { background-position-x: 0; }
                    100% { background-position-x: -100vw; }
                }
            `}</style>
            {waves.map((wave, index) => (
                <div
                    key={index}
                    className="absolute left-0 h-[20vh] w-full antialiased"
                    style={
                        {
                            bottom: `${wave.bottom}px`,
                            backgroundImage: `url(${waveImage})`,
                            backgroundSize: '100vw 20vh',
                            opacity: wave.opacity,
                            zIndex: wave.zIndex,
                            animation: `${wave.direction === 'forward' ? 'waveForward' : 'waveReverse'} ${wave.duration}s linear infinite`,
                            animationDelay: `${wave.delay}s`,
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden',
                        } as CSSProperties
                    }
                />
            ))}
        </section>
    );
}

/* --------------------------------------------------
 * Page
 * -------------------------------------------------- */

function WavyPage() {
    const { t } = useTranslation();
    return (
        <MainLayout>
            <div className="w-full px-6 py-16">
                <PageTitle>Wavy Background</PageTitle>
                <p className="max-w-xl text-white/60">
                    {t(`A simple and lightweight animated wavy background effect created with a PNG
                    image and CSS animations.`)}
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs
                        title="Default"
                        codeText={defaultCode}
                        codeSandboxUrl="https://codepen.io/natgeyzentech/pen/PoRYvRM"
                    >
                        <div className="relative h-full w-full overflow-hidden rounded-lg">
                            <WavyBackground />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs
                        title="Sunset Theme"
                        codeText={sunsetCode}
                        codeSandboxUrl="https://codepen.io/natgeyzentech/pen/PoRYvRM"
                    >
                        <div className="relative h-full w-full overflow-hidden rounded-lg">
                            <WavyBackground
                                backgroundColor="#a35709"
                                waves={[
                                    {
                                        duration: 25,
                                        delay: 0,
                                        opacity: 0.8,
                                        zIndex: 15,
                                        bottom: 0,
                                        direction: 'forward',
                                    },
                                    {
                                        duration: 20,
                                        delay: -4,
                                        opacity: 0.6,
                                        zIndex: 10,
                                        bottom: 10,
                                        direction: 'reverse',
                                    },
                                    {
                                        duration: 15,
                                        delay: -2,
                                        opacity: 0.4,
                                        zIndex: 5,
                                        bottom: 15,
                                        direction: 'forward',
                                    },
                                    {
                                        duration: 10,
                                        delay: -5,
                                        opacity: 0.3,
                                        zIndex: 1,
                                        bottom: 20,
                                        direction: 'reverse',
                                    },
                                ]}
                            />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs
                        title="Stormy Ocean Theme"
                        codeText={stormyCode}
                        codeSandboxUrl="https://codepen.io/natgeyzentech/pen/PoRYvRM"
                    >
                        <div className="relative h-full w-full overflow-hidden rounded-lg">
                            <WavyBackground
                                backgroundColor="#03071e"
                                waves={[
                                    {
                                        duration: 8,
                                        delay: 0,
                                        opacity: 0.6,
                                        zIndex: 15,
                                        bottom: 0,
                                        direction: 'forward',
                                    },
                                    {
                                        duration: 6,
                                        delay: -1,
                                        opacity: 0.5,
                                        zIndex: 10,
                                        bottom: 10,
                                        direction: 'reverse',
                                    },
                                    {
                                        duration: 4,
                                        delay: -0.5,
                                        opacity: 0.4,
                                        zIndex: 5,
                                        bottom: 15,
                                        direction: 'forward',
                                    },
                                    {
                                        duration: 10,
                                        delay: -2,
                                        opacity: 0.3,
                                        zIndex: 1,
                                        bottom: 20,
                                        direction: 'reverse',
                                    },
                                ]}
                            />
                        </div>
                    </PreviewTabs>
                </div>

                <UsageSection
                    description={t(
                        "This component creates an animated wavy background. It's self-contained and customizable through props.",
                    )}
                    code={wavyComponentCode}
                />

                <DocsSection
                    description={
                        <p>
                            {t(`The component uses a repeating PNG image and CSS keyframe animations to
                            create the layered wave effect. You can customize colors, animation
                            speeds, and layers.`)}
                        </p>
                    }
                    rows={rows}
                />
            </div>
        </MainLayout>
    );
}

const rows: PropsTableRow[] = [
    {
        prop: 'backgroundColor',
        type: 'string',
        defaultValue: '#4779f7',
        required: false,
        description: 'The background color of the container.',
    },
    {
        prop: 'height',
        type: 'string',
        defaultValue: '100%',
        required: false,
        description: 'The height of the container.',
    },
    {
        prop: 'waveImage',
        type: 'string',
        defaultValue: 'SVG data URI',
        required: false,
        description:
            'URL or data URI for the wave image. Defaults to a high-quality seamless SVG wave.',
    },
    {
        prop: 'waves',
        type: 'WaveConfig[]',
        defaultValue: 'defaultWaves',
        required: false,
        description: 'An array of wave configurations to customize the animation.',
    },
    {
        prop: 'className',
        type: 'string',
        defaultValue: '""',
        required: false,
        description: 'Additional class names for styling.',
    },
];

const defaultCode = `import WavyBackground from "@/components/backgrounds/wavy"; // Adjust import path

export default function Page() {
  return (
    <div className="relative h-screen w-full">
      <WavyBackground />
    </div>
  );
}`;

const sunsetCode = `import WavyBackground from "@/components/backgrounds/wavy"; // Adjust import path

export default function Page() {
  return (
    <div className="relative h-screen w-full">
      <WavyBackground
        backgroundColor="#a35709"
        waves={[
            { duration: 25, delay: 0, opacity: 0.8, zIndex: 15, bottom: 0, direction: 'forward' },
            { duration: 20, delay: -4, opacity: 0.6, zIndex: 10, bottom: 10, direction: 'reverse' },
            { duration: 15, delay: -2, opacity: 0.4, zIndex: 5, bottom: 15, direction: 'forward' },
            { duration: 10, delay: -5, opacity: 0.3, zIndex: 1, bottom: 20, direction: 'reverse' },
        ]}
      />
    </div>
  );
}`;

const stormyCode = `import WavyBackground from "@/components/backgrounds/wavy"; // Adjust import path

export default function Page() {
  return (
    <div className="relative h-screen w-full">
      <WavyBackground
        backgroundColor="#03071e"
        waves={[
            { duration: 8, delay: 0, opacity: 0.6, zIndex: 15, bottom: 0, direction: 'forward' },
            { duration: 6, delay: -1, opacity: 0.5, zIndex: 10, bottom: 10, direction: 'reverse' },
            { duration: 4, delay: -0.5, opacity: 0.4, zIndex: 5, bottom: 15, direction: 'forward' },
            { duration: 10, delay: -2, opacity: 0.3, zIndex: 1, bottom: 20, direction: 'reverse' },
        ]}
      />
    </div>
  );
}`;

const wavyComponentCode = `
import type { CSSProperties } from 'react'

interface WaveConfig {
    duration: number;
    delay: number;
    opacity: number;
    zIndex: number;
    bottom: number;
    direction: 'forward' | 'reverse';
}

interface WavyBackgroundProps {
    backgroundColor?: string;
    height?: string;
    waveImage?: string;
    waves?: WaveConfig[];
    className?: string;
}

const defaultWaves: WaveConfig[] = [
    { duration: 20, delay: 0, opacity: 0.9, zIndex: 15, bottom: 0, direction: 'forward' },
    { duration: 15, delay: -5, opacity: 0.7, zIndex: 10, bottom: 10, direction: 'reverse' },
    { duration: 10, delay: -2, opacity: 0.4, zIndex: 5, bottom: 15, direction: 'forward' },
    { duration: 5, delay: -5, opacity: 0.5, zIndex: 1, bottom: 20, direction: 'reverse' },
];

const waveSvg = \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="M0,50 C250,100 250,0 500,50 S750,100 1000,50 L1000,100 L0,100 Z" fill="white"/></svg>\`;
const encodedWaveSvg = \`data:image/svg+xml;base64,\${typeof window !== 'undefined' ? btoa(waveSvg) : ''}\`;

export function WavyBackground({
    backgroundColor = '#4779f7',
    height = '100%',
    waveImage = encodedWaveSvg,
    waves = defaultWaves,
    className = '',
}: WavyBackgroundProps) {
    return (
        <section
            className={\`relative w-full overflow-hidden \${className}\`}
            style={{
                height,
                backgroundColor,
                willChange: 'transform',
            }}
        >
            <style>{\`
                @keyframes waveForward {
                    0% { background-position-x: 0; }
                    100% { background-position-x: 100vw; }
                }
                @keyframes waveReverse {
                    0% { background-position-x: 0; }
                    100% { background-position-x: -100vw; }
                }
            \`}</style>
            {waves.map((wave, index) => (
                <div
                    key={index}
                    className="absolute left-0 h-[20vh] w-full antialiased"
                    style={
                        {
                            bottom: \`\${wave.bottom}px\`,
                            backgroundImage: \`url(\${waveImage})\`,
                            backgroundSize: '100vw 20vh',
                            opacity: wave.opacity,
                            zIndex: wave.zIndex,
                            animation: \`\${wave.direction === 'forward' ? 'waveForward' : 'waveReverse'} \${wave.duration}s linear infinite\`,
                            animationDelay: \`\${wave.delay}s\`,
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden',
                        } as CSSProperties
                    }
                />
            ))}
        </section>
    );
}
`;
