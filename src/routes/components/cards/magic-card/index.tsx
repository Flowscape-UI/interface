import { PreviewTabs } from '@/components/preview-tabs';
import PageTitle from '@/components/ui/page-title';
import { MainLayout } from '@/main-layout';
import { createFileRoute } from '@tanstack/react-router';
import { MagicCard } from '@/components/ui/magic-card';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';

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

const rows: PropsTableRow[] = [
    { 
        prop: "initialSettings", 
        type: "MagicCardSettings", 
        required: false, 
        defaultValue: "See below", 
        description: "Initial configuration for the card's appearance and behavior." 
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

const settingsInterface = `interface MagicCardSettings {
    card: {
        width: number;          // Width of the card in pixels
        height: number;         // Height of the card in pixels
        glowIntensity: number;  // Base intensity of the glow effect
        glowMax: number;        // Maximum glow intensity
    };
    particles: {
        count: number;          // Number of particles
        minSize: number;        // Minimum particle size
        maxSize: number;        // Maximum particle size
        minSpeed: number;       // Minimum particle speed
        maxSpeed: number;       // Maximum particle speed
        minOpacity: number;     // Minimum particle opacity (0-1)
        maxOpacity: number;     // Maximum particle opacity (0-1)
    };
    lines: {
        count: number;          // Number of animated lines
        minWidth: number;       // Minimum line width
        maxWidth: number;       // Maximum line width
        minSpeed: number;       // Minimum line animation speed
        maxSpeed: number;       // Maximum line animation speed
        minOpacity: number;     // Minimum line opacity (0-1)
        maxOpacity: number;     // Maximum line opacity (0-1)
        waveHeight: number;     // Height of the wave effect on lines
    };
}`;

function MagicCardPage() {
    return (
        <MainLayout>
            <div className="px-6 py-16 w-full">
                <PageTitle>Magic Card</PageTitle>
                <p className="text-white/60 max-w-xl">
                    A fully interactive card component with glow, particle, and line effects powered by HTML Canvas.
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
                                        width: 0,
                                        height: 0
                                    },
                                    particles: {
                                        count: 200,
                                        minSize: 1,
                                        maxSize: 4,
                                        minSpeed: 0.2,
                                        maxSpeed: 0.8,
                                        minOpacity: 0.3,
                                        maxOpacity: 0.8
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
                    description="A highly customizable card component with dynamic particle and line animations using HTML Canvas. The component is interactive and responds to mouse movements."
                    code={`import { MagicCard } from '@/components/ui/magic-card';

// Basic usage
<MagicCard />

// With custom settings
<MagicCard 
    initialSettings={{
        card: {
            width: 300,
            height: 400,
            glowIntensity: 15,
            glowMax: 25,
        },
        // ... other settings
    }}
    showControls={false}
    className="custom-class"
/>`}
                />

                <DocsSection
                    description={
                        <>
                            <p className="mb-4">
                                <strong>Magic Card</strong> &mdash; An interactive card component featuring dynamic particle effects, animated lines, and customizable glow effects, all rendered with HTML Canvas for smooth performance.
                            </p>
                            <p className="mb-4">
                                The component is highly configurable through the <code>initialSettings</code> prop, allowing you to control every aspect of the visual effects.
                            </p>
                            <div className="mt-6 p-4 bg-white/5 rounded-lg">
                                <h3 className="text-lg font-medium mb-2">Settings Interface</h3>
                                <pre className="text-sm text-gray-300 overflow-x-auto">
                                    <code>{settingsInterface}</code>
                                </pre>
                            </div>
                        </>
                    }
                    rows={rows}
                />
            </div>
        </MainLayout>
    );
} 