import type { ReactNode } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

import { MainLayout } from '@/main-layout';
import PageTitle from '@/components/ui/page-title';
import { PreviewTabs } from '@/components/preview-tabs';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { useTranslation } from '@/hooks/use-translation';

export const Route = createFileRoute('/components/backgrounds/animated/gradient/')({
    component: GradientPage,
});

/* --------------------------------------------------
 * Component
 * -------------------------------------------------- */

interface GradientBackgroundProps {
    children?: ReactNode;
    className?: string;
    textClassName?: string;
    colors?: string[];
    animationDuration?: number;
    fontSize?: string;
    fontFamily?: string;
    textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
    backgroundSize?: string;
    fullScreen?: boolean;
}

function GradientBackground({
    children,
    className,
    textClassName,
    colors = [
        '#1abc9c',
        '#16a085',
        '#2ecc71',
        '#27ae60',
        '#3498db',
        '#2980b9',
        '#9b59b6',
        '#8e44ad',
        '#f1c40f',
        '#f39c12',
        '#e67e22',
        '#d35400',
    ],
    animationDuration = 20,
    fontSize = '40px',
    fontFamily = '"Comic Sans MS", cursive, sans-serif',
    textTransform = 'uppercase',
    backgroundSize = '400%',
    fullScreen = false,
}: GradientBackgroundProps) {
    const gradientColors = colors.join(',');

    return (
        <div
            className={cn(
                'flex items-center justify-center text-center text-white',
                fullScreen ? 'min-h-screen w-full' : 'h-full w-full',
                className,
            )}
            style={{
                fontFamily,
                backgroundImage: `linear-gradient(to right, ${gradientColors})`,
                backgroundSize,
                animation: `bganimation ${animationDuration}s infinite`,
                willChange: 'background-position',
            }}
        >
            <style>{`
                @keyframes bganimation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
            <div
                className={cn('px-4', textClassName)}
                style={{
                    fontSize,
                    textTransform,
                }}
            >
                {children}
            </div>
        </div>
    );
}

/* --------------------------------------------------
 * Page
 * -------------------------------------------------- */

function GradientPage() {
    const { t } = useTranslation();
    return (
        <MainLayout>
            <div className="w-full px-6 py-16">
                <PageTitle>Gradient Background</PageTitle>
                <p className="max-w-xl text-white/60">
                    {t(`A simple, animated gradient background created with CSS. Fully customizable
                    through props.`)}
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs
                        title="Default"
                        codeText={defaultCode}
                        codeSandboxUrl="https://codepen.io/grzywa1234/pen/LYpZwVa"
                    >
                        <div className="relative h-full w-full overflow-hidden rounded-lg">
                            <GradientBackground />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs
                        title="Pastel Colors"
                        codeText={pastelCode}
                        codeSandboxUrl="https://codepen.io/grzywa1234/pen/LYpZwVa"
                    >
                        <div className="relative h-full w-full overflow-hidden rounded-lg">
                            <GradientBackground
                                colors={['#ffafbd', '#ffc3a0', '#c7ceea', '#a1c4fd']}
                                animationDuration={15}
                            />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs
                        title="Custom Text & Slow Animation"
                        codeText={customTextCode}
                        codeSandboxUrl="https://codepen.io/grzywa1234/pen/LYpZwVa"
                    >
                        <div className="relative h-full w-full overflow-hidden rounded-lg">
                            <GradientBackground
                                fontFamily="'Georgia', serif"
                                fontSize="32px"
                                textTransform="none"
                                animationDuration={40}
                            />
                        </div>
                    </PreviewTabs>
                </div>

                <UsageSection
                    description={t(
                        'This component creates an animated gradient background. It is highly configurable through props.',
                    )}
                    code={gradientComponentCode}
                />

                <DocsSection
                    description={
                        <p>
                            {t('The animation is a pure CSS keyframe animation on the')}{' '}
                            `background-position` {t('property of a linear gradient.')}
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
        prop: 'children',
        type: 'ReactNode',
        required: false,
        description: 'Custom content to display instead of the text prop.',
    },
    {
        prop: 'className',
        type: 'string',
        defaultValue: '""',
        required: false,
        description: 'Additional classes for the container.',
    },
    {
        prop: 'textClassName',
        type: 'string',
        defaultValue: '""',
        required: false,
        description: 'Additional classes for the text.',
    },
    {
        prop: 'colors',
        type: 'string[]',
        defaultValue: '[...]',
        required: false,
        description: 'An array of colors for the gradient.',
    },
    {
        prop: 'animationDuration',
        type: 'number',
        defaultValue: '20',
        required: false,
        description: 'Duration of the background animation in seconds.',
    },
    {
        prop: 'fontSize',
        type: 'string',
        defaultValue: '40px',
        required: false,
        description: 'Font size for the text.',
    },
    {
        prop: 'fontFamily',
        type: 'string',
        defaultValue: 'Comic Sans MS',
        required: false,
        description: 'Font family for the text.',
    },
    {
        prop: 'textTransform',
        type: 'string',
        defaultValue: 'uppercase',
        required: false,
        description: 'CSS text-transform property for the text.',
    },
    {
        prop: 'backgroundSize',
        type: 'string',
        defaultValue: '400%',
        required: false,
        description: 'CSS background-size property.',
    },
    {
        prop: 'fullScreen',
        type: 'boolean',
        defaultValue: 'false',
        required: false,
        description: 'If true, the component will take up the full screen.',
    },
];

const defaultCode = `import GradientBackground from "@/components/backgrounds/gradient"; // Adjust import path

export default function Page() {
  return (
    <GradientBackground  
      fullScreen={true}
    />
  );
}`;

const pastelCode = `import GradientBackground from "@/components/backgrounds/gradient"; // Adjust import path

export default function Page() {
  return (
    <GradientBackground
      colors={['#ffafbd', '#ffc3a0', '#c7ceea', '#a1c4fd']}
      animationDuration={15}
      fullScreen={true}
    />
  );
}`;

const customTextCode = `import GradientBackground from "@/components/backgrounds/gradient"; // Adjust import path

export default function Page() {
  return (
    <GradientBackground
      fontFamily="'Georgia', serif"
      fontSize="32px"
      textTransform="none"
      animationDuration={40}
      fullScreen={true}
    />
  );
}`;

const gradientComponentCode = `
import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import type { ReactNode } from 'react'
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

interface GradientBackgroundProps {
    children?: ReactNode;
    className?: string;
    textClassName?: string;
    colors?: string[];
    animationDuration?: number;
    fontSize?: string;
    fontFamily?: string;
    textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
    backgroundSize?: string;
    fullScreen?: boolean;
}

export function GradientBackground({
    children,
    className,
    textClassName,
    colors = [
        '#1abc9c',
        '#16a085',
        '#2ecc71',
        '#27ae60',
        '#3498db',
        '#2980b9',
        '#9b59b6',
        '#8e44ad',
        '#f1c40f',
        '#f39c12',
        '#e67e22',
        '#d35400',
    ],
    animationDuration = 20,
    fontSize = '40px',
    fontFamily = '"Comic Sans MS", cursive, sans-serif',
    textTransform = 'uppercase',
    backgroundSize = '400%',
    fullScreen = false,
}: GradientBackgroundProps) {
    const gradientColors = colors.join(',');

    return (
        <div
            className={cn(
                'flex items-center justify-center text-center text-white',
                fullScreen ? 'min-h-screen w-full' : 'h-full w-full',
                className,
            )}
            style={{
                fontFamily,
                backgroundImage: \`linear-gradient(to right, \${gradientColors})\`,
                backgroundSize,
                animation: \`bganimation \${animationDuration}s infinite\`,
                willChange: 'background-position',
            }}
        >
            <style>{\`
                @keyframes bganimation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            \`}</style>
            <div
                className={cn('px-4', textClassName)}
                style={{
                    fontSize,
                    textTransform,
                }}
            >
                {children}
            </div>
        </div>
    );
}
`;
