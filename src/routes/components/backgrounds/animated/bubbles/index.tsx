import React, { useId, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { MainLayout } from '@/main-layout';
import PageTitle from '@/components/ui/page-title';
import { PreviewTabs } from '@/components/preview-tabs';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { useTranslation } from '@/hooks/use-translation';

export const Route = createFileRoute('/components/backgrounds/animated/bubbles/')({
    component: BubblesPage,
});

/* --------------------------------------------------
 * Component
 * -------------------------------------------------- */

interface AnimatedBubblesProps {
    className?: string;
    colors?: {
        bg1?: string;
        bg2?: string;
        color1?: string;
        color2?: string;
        color3?: string;
        color4?: string;
        color5?: string;
    };
    circleSize?: string;
    blendMode?: React.CSSProperties['mixBlendMode'];
    animations?: {
        moveVertical?: number;
        moveInCircle?: number;
        moveHorizontal?: number;
    };
    textStyle?: {
        fontSize?: string;
        color?: string;
        opacity?: number;
        fontFamily?: string;
    };
}

function AnimatedBubbles({
    className = '',
    colors = {},
    circleSize = '80%',
    blendMode = 'hard-light',
    animations = {},
    // textStyle = {},
}: AnimatedBubblesProps) {
    const uniqueId = useId();
    const containerRef = useRef<HTMLDivElement>(null);
    const filterId = `goo-${uniqueId}`;

    const defaultColors = {
        bg1: 'rgb(108, 0, 162)',
        bg2: 'rgb(0, 17, 82)',
        color1: '18, 113, 255',
        color2: '221, 74, 255',
        color3: '100, 220, 255',
        color4: '200, 50, 50',
        color5: '180, 180, 50',
        ...colors,
    };

    const defaultAnimations = {
        moveVertical: 30,
        moveInCircle: 20,
        moveHorizontal: 40,
        ...animations,
    };

    // const defaultTextStyle = {
    //     fontSize: '96px',
    //     color: 'white',
    //     opacity: 0.8,
    //     fontFamily: "'Dongle', sans-serif",
    //     ...textStyle,
    // };

    const cssVariables = {
        '--color-bg1': defaultColors.bg1,
        '--color-bg2': defaultColors.bg2,
        '--color1': defaultColors.color1,
        '--color2': defaultColors.color2,
        '--color3': defaultColors.color3,
        '--color4': defaultColors.color4,
        '--color5': defaultColors.color5,
        '--circle-size': circleSize,
        '--blending': blendMode,
        '--move-vertical-duration': `${defaultAnimations.moveVertical}s`,
        '--move-circle-duration': `${defaultAnimations.moveInCircle}s`,
        '--move-horizontal-duration': `${defaultAnimations.moveHorizontal}s`,
    } as React.CSSProperties;

    return (
        <div
            ref={containerRef}
            className={`relative h-full w-full overflow-hidden ${className}`}
            style={{ ...cssVariables, willChange: 'transform' }}
        >
            <style>
                {`
                @keyframes moveInCircle { 0% { transform: rotate(0deg); } 50% { transform: rotate(180deg); } 100% { transform: rotate(360deg); } }
                @keyframes moveVertical { 0% { transform: translateY(-50%); } 50% { transform: translateY(50%); } 100% { transform: translateY(-50%); } }
                @keyframes moveHorizontal { 0% { transform: translateX(-50%) translateY(-10%); } 50% { transform: translateX(50%) translateY(10%); } 100% { transform: translateX(-50%) translateY(-10%); } }

                .animate-move-vertical { animation: moveVertical var(--move-vertical-duration) ease infinite; }
                .animate-move-in-circle { animation: moveInCircle var(--move-horizontal-duration) linear infinite; }
                .animate-move-in-circle-reverse { animation: moveInCircle var(--move-circle-duration) reverse infinite; }
                .animate-move-in-circle-slow { animation: moveInCircle var(--move-circle-duration) ease infinite; }
                .animate-move-horizontal { animation: moveHorizontal var(--move-horizontal-duration) ease infinite; }
                `}
            </style>
            <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(40deg, var(--color-bg1), var(--color-bg2))` }}
            />
            <svg style={{ display: 'none' }}>
                <defs>
                    <filter id={filterId}>
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                            result="goo"
                        />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>
            <div className="h-full w-full" style={{ filter: `url(#${filterId}) blur(40px)` }}>
                <div
                    className="animate-move-vertical absolute"
                    style={{
                        background: `radial-gradient(circle at center, rgba(var(--color1), 0.8) 0, rgba(var(--color1), 0) 50%)`,
                        mixBlendMode: blendMode,
                        width: 'var(--circle-size)',
                        height: 'var(--circle-size)',
                        top: 'calc(50% - var(--circle-size) / 2)',
                        left: 'calc(50% - var(--circle-size) / 2)',
                        transformOrigin: 'center center',
                        opacity: 1,
                    }}
                />
                <div
                    className="animate-move-in-circle-reverse absolute"
                    style={{
                        background: `radial-gradient(circle at center, rgba(var(--color2), 0.8) 0, rgba(var(--color2), 0) 50%)`,
                        mixBlendMode: blendMode,
                        width: 'var(--circle-size)',
                        height: 'var(--circle-size)',
                        top: 'calc(50% - var(--circle-size) / 2)',
                        left: 'calc(50% - var(--circle-size) / 2)',
                        transformOrigin: 'calc(50% - 400px)',
                        opacity: 1,
                    }}
                />
                <div
                    className="animate-move-in-circle absolute"
                    style={{
                        background: `radial-gradient(circle at center, rgba(var(--color3), 0.8) 0, rgba(var(--color3), 0) 50%)`,
                        mixBlendMode: blendMode,
                        width: 'var(--circle-size)',
                        height: 'var(--circle-size)',
                        top: 'calc(50% - var(--circle-size) / 2 + 200px)',
                        left: 'calc(50% - var(--circle-size) / 2 - 500px)',
                        transformOrigin: 'calc(50% + 400px)',
                        opacity: 1,
                    }}
                />
                <div
                    className="animate-move-horizontal absolute"
                    style={{
                        background: `radial-gradient(circle at center, rgba(var(--color4), 0.8) 0, rgba(var(--color4), 0) 50%)`,
                        mixBlendMode: blendMode,
                        width: 'var(--circle-size)',
                        height: 'var(--circle-size)',
                        top: 'calc(50% - var(--circle-size) / 2)',
                        left: 'calc(50% - var(--circle-size) / 2)',
                        transformOrigin: 'calc(50% - 200px)',
                        opacity: 0.7,
                    }}
                />
                <div
                    className="animate-move-in-circle-slow absolute"
                    style={{
                        background: `radial-gradient(circle at center, rgba(var(--color5), 0.8) 0, rgba(var(--color5), 0) 50%)`,
                        mixBlendMode: blendMode,
                        width: 'calc(var(--circle-size) * 2)',
                        height: 'calc(var(--circle-size) * 2)',
                        top: 'calc(50% - var(--circle-size))',
                        left: 'calc(50% - var(--circle-size))',
                        transformOrigin: 'calc(50% - 800px) calc(50% + 200px)',
                        opacity: 1,
                    }}
                />
            </div>
        </div>
    );
}

/* --------------------------------------------------
 * Page
 * -------------------------------------------------- */

function BubblesPage() {
    const {t} = useTranslation()
    return (
        <MainLayout>
            <div className="w-full px-6 py-16">
                <PageTitle>Animated Bubbles Background</PageTitle>
                <p className="max-w-xl text-white/60">
                    {t(`A mesmerizing, interactive "lava lamp" effect created with CSS. Fully
                    customizable via props.`)}
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs title="Default" codeText={bubblesCode}>
                        <div className="relative h-full w-full overflow-hidden rounded-lg">
                            <AnimatedBubbles  />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs title="Fiery Theme" codeText={fieryCode}>
                        <div className="relative h-full w-full overflow-hidden rounded-lg">
                            <AnimatedBubbles
                                colors={{
                                    bg1: 'rgb(130, 0, 0)',
                                    bg2: 'rgb(50, 0, 20)',
                                    color1: '255, 100, 100',
                                    color2: '255, 150, 50',
                                    color3: '200, 100, 20',
                                    color4: '255, 50, 50',
                                    color5: '240, 120, 80',
                                }}
                                blendMode="soft-light"
                            />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs title="Oceanic Theme" codeText={oceanCode}>
                        <div className="relative h-full w-full overflow-hidden rounded-lg">
                            <AnimatedBubbles
                                colors={{
                                    bg1: 'rgb(0, 20, 80)',
                                    bg2: 'rgb(0, 50, 120)',
                                    color1: '50, 150, 255',
                                    color2: '80, 200, 255',
                                    color3: '100, 220, 255',
                                    color4: '20, 100, 200',
                                    color5: '0, 180, 220',
                                }}
                                blendMode="screen"
                                animations={{
                                    moveVertical: 50,
                                    moveInCircle: 15,
                                    moveHorizontal: 30,
                                }}
                            />
                        </div>
                    </PreviewTabs>
                </div>

                <UsageSection
                    description={
                        t("This component creates a dynamic, interactive bubble background. It's built to be self-contained and highly customizable through props.")
                    }
                    code={bubblesCode}
                />

                <DocsSection
                    description={
                        <p>
                            {t('The component uses a clever SVG filter to achieve the')} 'gooey' | 'lava
                            lamp' {t('effect.')} {t(`The animation is pure CSS, powered by dynamic CSS
                            variables passed from React.`)}
                        </p>
                    }
                    rows={rows}
                />
            </div>
        </MainLayout>
    );
}

const rows: PropsTableRow[] = [
    { prop: 'text', type: 'string', defaultValue: 'Bubbles', required: false, description: 'The text to display in the center.' },
    { prop: 'className', type: 'string', defaultValue: '""', required: false, description: 'Additional classes for the container.' },
    { prop: 'colors', type: 'object', defaultValue: '{...}', required: false, description: 'Object to customize the background and bubble colors.' },
    { prop: 'circleSize', type: 'string', defaultValue: '80%', required: false, description: 'Base size of the bubbles as a percentage or pixel value.' },
    { prop: 'blendMode', type: 'mix-blend-mode', defaultValue: 'hard-light', required: false, description: 'CSS mix-blend-mode for the bubbles.' },
    { prop: 'animations', type: 'object', defaultValue: '{...}', required: false, description: 'Object to customize the duration of the animations in seconds.' },
    { prop: 'textStyle', type: 'object', defaultValue: '{...}', required: false, description: 'Object to customize the text styling.' },
];

const bubblesCode = `import { AnimatedBubbles } from "@/components/backgrounds/bubbles"; // Adjust import path

export default function Page() {
  return (
    <div className="relative h-screen w-full">
      <AnimatedBubbles />
    </div>
  );
}`;

const fieryCode = `import { AnimatedBubbles } from "@/components/backgrounds/bubbles"; // Adjust import path

export default function Page() {
  return (
    <div className="relative h-screen w-full">
      <AnimatedBubbles
        colors={{
          bg1: 'rgb(130, 0, 0)',
          bg2: 'rgb(50, 0, 20)',
          color1: '255, 100, 100',
          color2: '255, 150, 50',
          color3: '200, 100, 20',
          color4: '255, 50, 50',
          color5: '240, 120, 80',
        }}
        blendMode="soft-light"
      />
    </div>
  );
}`;

const oceanCode = `import { AnimatedBubbles } from "@/components/backgrounds/bubbles"; // Adjust import path

export default function Page() {
  return (
    <div className="relative h-screen w-full">
      <AnimatedBubbles
        colors={{
          bg1: 'rgb(0, 20, 80)',
          bg2: 'rgb(0, 50, 120)',
          color1: '50, 150, 255',
          color2: '80, 200, 255',
          color3: '100, 220, 255',
          color4: '20, 100, 200',
          color5: '0, 180, 220',
        }}
        blendMode="screen"
        animations={{
          moveVertical: 50,
          moveInCircle: 15,
          moveHorizontal: 30,
        }}
      />
    </div>
  );
}`;