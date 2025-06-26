import { PreviewTabs } from '@/components/preview-tabs';
import PageTitle from '@/components/ui/page-title';
import { MainLayout } from '@/main-layout';
import { createFileRoute } from '@tanstack/react-router';
import { MagicCard } from '@/components/ui/magic-card';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { useTranslation } from '@/hooks/use-translation';

export const Route = createFileRoute('/components/cards/magic-card/')({
    component: MagicCardPage,
});

const defaultCode = `import { MagicCard } from '@/components/ui/magic-card';

<MagicCard />
`;

const customGlowCode = `import { MagicCard } from '@/components/ui/magic-card';

<MagicCard 
    initialSettings={{
        card: {
            glowIntensity: 25,
            glowMax: 40,
        },
        particles: {
            count: 200,
            minSize: 1,
            maxSize: 4,
            minSpeed: 0.2,
            maxSpeed: 0.8,
            minOpacity: 0.3,
            maxOpacity: 0.8
        },
        lines: {
            count: 0 // Disable lines for this example
        }
    }}
    showControls
/>
`;

const minimalCode = `import { MagicCard } from '@/components/ui/magic-card';

<MagicCard 
    initialSettings={{
        particles: {
            count: 50,
            minSize: 0.5,
            maxSize: 2,
            minSpeed: 0.1,
            maxSpeed: 0.3,
            minOpacity: 0.1,
            maxOpacity: 0.3
        },
        lines: {
            count: 5,
            minWidth: 0.5,
            maxWidth: 1.5,
            minSpeed: 0.01,
            maxSpeed: 0.03,
            minOpacity: 0.1,
            maxOpacity: 0.3,
            waveHeight: 10
        }
    }}
    showControls
/>
`;

const fullComponentCode = `import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Label } from './label';
import { Slider } from './slider';

/* --------------------------------------------------
 * Types and Settings
 * -------------------------------------------------- */

interface MagicCardSettings {
    card: {
        width: number;
        height: number;
        glowIntensity: number;
        glowMax: number;
    };
    particles: {
        count: number;
        minSize: number;
        maxSize: number;
        minSpeed: number;
        maxSpeed: number;
        minOpacity: number;
        maxOpacity: number;
    };
    lines: {
        count: number;
        minWidth: number;
        maxWidth: number;
        minSpeed: number;
        maxSpeed: number;
        minOpacity: number;
        maxOpacity: number;
        waveHeight: number;
    };
}

type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

interface MagicCardProps {
    initialSettings?: DeepPartial<MagicCardSettings>;
    className?: string;
    showControls?: boolean;
}

const defaultSettings: MagicCardSettings = {
    card: {
        width: 284,
        height: 410,
        glowIntensity: 15,
        glowMax: 25,
    },
    particles: {
        count: 100,
        minSize: 1,
        maxSize: 4,
        minSpeed: 0.25,
        maxSpeed: 0.5,
        minOpacity: 0.1,
        maxOpacity: 0.6,
    },
    lines: {
        count: 15,
        minWidth: 0.5,
        maxWidth: 2,
        minSpeed: 0.01,
        maxSpeed: 0.03,
        minOpacity: 0.05,
        maxOpacity: 0.2,
        waveHeight: 10,
    },
};

/* --------------------------------------------------
 * Controls Panel Component
 * -------------------------------------------------- */

// ... (Controls component code)

/* --------------------------------------------------
 * Main Component
 * -------------------------------------------------- */
export function MagicCard({ initialSettings, className, showControls = false }: MagicCardProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isControlsVisible, setIsControlsVisible] = useState(false);

    const mergedSettings = useMemo(() => {
        const deepMerge = (target: any, source: any): any => {
            for (const key in source) {
                if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                    target[key] = deepMerge(target[key] ? target[key] : {}, source[key]);
                } else if (source[key] !== undefined) {
                    target[key] = source[key];
                }
            }
            return target;
        };
        return deepMerge(
            JSON.parse(JSON.stringify(defaultSettings)),
            initialSettings || {},
        ) as MagicCardSettings;
    }, [initialSettings]);

    const [settings, setSettings] = useState<MagicCardSettings>(mergedSettings);
    const settingsRef = useRef(settings);

    useEffect(() => {
        settingsRef.current = settings;
    }, [settings]);

    // ... (rest of the animation logic)

    return (
        <div className={cn('relative w-full h-full', className)}>
            {showControls && (
                <Controls
                    settings={settings}
                    onSettingsChange={setSettings}
                    onRandomize={handleRandomize}
                    isVisible={isControlsVisible}
                    onToggle={() => setIsControlsVisible((v) => !v)}
                />
            )}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full bg-transparent"
            />
        </div>
    );
}`;

const rows: PropsTableRow[] = [
    { 
        prop: "initialSettings", 
        type: "DeepPartial<MagicCardSettings>", 
        required: false, 
        defaultValue: "See default settings", 
        description: "Configuration for the card's appearance. Allows partial updates to nested properties." 
    },
    { 
        prop: "className", 
        type: "string", 
        required: false, 
        defaultValue: '""', 
        description: "Custom classes for the main container." 
    },
    { 
        prop: "showControls", 
        type: "boolean", 
        required: false, 
        defaultValue: "false", 
        description: "When true, displays interactive controls to adjust the card's appearance in real-time." 
    },
];

function MagicCardPage() {
    const {t} = useTranslation();
    return (
        <MainLayout>
            <div className="px-6 py-16 w-full">
                <PageTitle>Magic Card</PageTitle>
                <p className="text-white/60 max-w-xl">
                    {t('A fully interactive card component with glow, particle, and line effects powered by')} HTML Canvas.
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs title="Default" codeText={defaultCode}>
                        <div className="relative h-full w-full">
                            <MagicCard />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs title="Custom Glow & Particles" codeText={customGlowCode}>
                        <div className="relative h-full w-full">
                            <MagicCard 
                                initialSettings={{
                                    card: {
                                        glowIntensity: 25,
                                        glowMax: 40,
                                    },
                                    particles: {
                                        count: 200,
                                        minSize: 1,
                                        maxSize: 4,
                                        minSpeed: 0.2,
                                        maxSpeed: 0.8,
                                        minOpacity: 0.3,
                                        maxOpacity: 0.8
                                    },
                                    lines: {
                                        count: 0
                                    }
                                }}
                                showControls
                            />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs title="Minimal Style" codeText={minimalCode}>
                        <div className="relative h-full w-full">
                            <MagicCard 
                                initialSettings={{
                                    particles: {
                                        count: 50,
                                        minSize: 0.5,
                                        maxSize: 2,
                                        minSpeed: 0.1,
                                        maxSpeed: 0.3,
                                        minOpacity: 0.1,
                                        maxOpacity: 0.3
                                    },
                                    lines: {
                                        count: 5,
                                        minWidth: 0.5,
                                        maxWidth: 1.5,
                                        minSpeed: 0.01,
                                        maxSpeed: 0.03,
                                        minOpacity: 0.1,
                                        maxOpacity: 0.3,
                                        waveHeight: 10
                                    }
                                }}
                                showControls
                            />
                        </div>
                    </PreviewTabs>
                </div>

                <UsageSection
                    title="Component Code"
                    description={`${t('The complete source code for the')} MagicCard ${t('component, including all animations, controls, and settings management. Use this as a reference for understanding its internal workings.')}`}
                    code={fullComponentCode}
                />

                <DocsSection
                    description={
                        <>
                            <p className="mb-4">
                                <strong>Magic Card</strong> {t('is a stunning, interactive component that brings a dynamic, engaging experience to your')} UI. {t('It uses')} HTML Canvas {t('to render smooth particle animations, glowing effects, and waving lines that respond to user interaction')}.
                            </p>
                            <p className="mb-4">
                                {t('The component is highly configurable through the')}{' '}<code>initialSettings</code> {t('prop. You can also enable')} <code>showControls</code> {t('to get a real-time control panel for tweaking every visual parameter')}.
                            </p>
                        </>
                    }
                    rows={rows}
                />
            </div>
        </MainLayout>
    );
} 