import { PreviewTabs } from '@/components/preview-tabs';
import PageTitle from '@/components/ui/page-title';
import { MainLayout } from '@/main-layout';
import { createFileRoute } from '@tanstack/react-router';
import { SqueezeLoader } from '@/components/ui/squeeze-loader';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { useTranslation } from '@/hooks/use-translation';

export const Route = createFileRoute('/loaders/squeeze/')({
    component: SqueezeLoaderPage,
});

const defaultCode = `import { SqueezeLoader } from '@/components/ui/squeeze-loader';

<SqueezeLoader />
`;

const smallCode = `import { SqueezeLoader } from '@/components/ui/squeeze-loader';

<SqueezeLoader 
  size={30}
  color1="#8a2be2"
  color2="#ff69b4"
  duration={2000}
  rotationSpeed={5000}
/>
`;

const largeCode = `import { SqueezeLoader } from '@/components/ui/squeeze-loader';

<SqueezeLoader 
  size={100}
  color1="#00ff00"
  color2="#0000ff"
  duration={5000}
  rotationSpeed={15000}
  className="my-8"
/>
`;

const rows: PropsTableRow[] = [
    {
        prop: 'size',
        type: 'number',
        required: false,
        defaultValue: '60',
        description: 'Size of the loader in pixels',
    },
    {
        prop: 'color1',
        type: 'string',
        required: false,
        defaultValue: "'#3498db'",
        description: 'Primary color of the loader',
    },
    {
        prop: 'color2',
        type: 'string',
        required: false,
        defaultValue: "'#e74c3c'",
        description: 'Secondary color of the loader',
    },
    {
        prop: 'duration',
        type: 'number',
        required: false,
        defaultValue: '3000',
        description: 'Animation duration in milliseconds',
    },
    {
        prop: 'rotationSpeed',
        type: 'number',
        required: false,
        defaultValue: '10000',
        description: 'Rotation speed in milliseconds (full rotation)',
    },
    {
        prop: 'className',
        type: 'string',
        required: false,
        defaultValue: '""',
        description: 'Additional class name for the container',
    },
];

const componentCode = `
import { type HTMLAttributes, forwardRef } from 'react';
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

interface SqueezeLoaderProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    color1?: string;
    color2?: string;
    duration?: number;
    rotationSpeed?: number;
    className?: string;
}

export const SqueezeLoader = forwardRef<HTMLDivElement, SqueezeLoaderProps>(
    (
        {
            size = 60,
            color1 = '#3498db',
            color2 = '#e74c3c',
            duration = 1200,
            rotationSpeed = 2400,
            className,
            style,
            ...props
        },
        ref,
    ) => {
        const loaderStyle = {
            '--squeeze-size': \`\${size}px\`,
            '--squeeze-color-1': color1,
            '--squeeze-color-2': color2,
            '--squeeze-duration': \`\${duration}ms\`,
            '--squeeze-rotation-speed': \`\${rotationSpeed}ms\`,
            ...style,
        } as React.CSSProperties;

        return (
            <div
                ref={ref}
                className={cn(
                    'relative flex aspect-square w-[var(--squeeze-size)] items-center justify-center',
                    className,
                )}
                style={loaderStyle}
                {...props}
            >
                <style>{\`
                @keyframes squeeze-rect-scale {
                    0%, 100% { transform: scaleY(1); }
                    30% { transform: scaleY(0.65); }
                    60% { transform: scaleY(1.15); }
                }
                @keyframes squeeze-spin {
                    100% { transform: rotate(360deg); }
                }
                .squeeze-spin {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    animation: squeeze-spin var(--squeeze-rotation-speed, 1800ms) linear infinite;
                    will-change: transform;
                }
                .squeeze-rect {
                    display: inline-block;
                    vertical-align: middle;
                }
                .squeeze-rect.red {
                    width: calc(var(--squeeze-size) * 0.45);
                    height: calc(var(--squeeze-size) * 0.85);
                    background: var(--squeeze-color-2);
                    border-radius: calc(var(--squeeze-size) * 0.22);
                    margin-right: calc(var(--squeeze-size) * 0.10);
                    animation: squeeze-rect-scale var(--squeeze-duration, 1200ms) cubic-bezier(.6,0,.4,1) infinite;
                    transform-origin: center;
                }
                .squeeze-rect.blue {
                    width: calc(var(--squeeze-size) * 0.48);
                    height: calc(var(--squeeze-size) * 0.78);
                    background: var(--squeeze-color-1);
                    border-radius: calc(var(--squeeze-size) * 0.10);
                    transform: rotate(8deg);
                    animation: squeeze-rect-scale var(--squeeze-duration, 1200ms) cubic-bezier(.6,0,.4,1) infinite;
                    animation-delay: calc(var(--squeeze-duration, 1200ms) * -0.5);
                    transform-origin: center;
                }
                \`}</style>
                <div className="squeeze-spin">
                    <div className="squeeze-rect red" />
                    <div className="squeeze-rect blue" />
                </div>
            </div>
        );
    },
);

SqueezeLoader.displayName = 'SqueezeLoader';

export default SqueezeLoader;

`;

function SqueezeLoaderPage() {
    const { t } = useTranslation();
    return (
        <MainLayout>
            <div className="w-full px-6 py-16">
                <PageTitle>Squeeze Loader</PageTitle>
                <p className="max-w-xl text-white/60">
                    {t(
                        'A smooth, animated loading spinner with a squeezing effect that creates a visually appealing loading indicator.',
                    )}
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs
                        title="Default"
                        codeText={defaultCode}
                        codeSandboxUrl="https://codepen.io/stanko/pen/WbvMxra"
                    >
                        <div className="flex h-40 items-center justify-center">
                            <SqueezeLoader />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs
                        title="Small & Fast"
                        codeText={smallCode}
                        codeSandboxUrl="https://codepen.io/stanko/pen/WbvMxra"
                    >
                        <div className="flex h-40 items-center justify-center">
                            <SqueezeLoader
                                size={30}
                                color1="#8a2be2"
                                color2="#ff69b4"
                                duration={1500}
                                rotationSpeed={1800}
                            />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs
                        title="Large & Slow"
                        codeText={largeCode}
                        codeSandboxUrl="https://codepen.io/stanko/pen/WbvMxra"
                    >
                        <div className="flex h-40 items-center justify-center">
                            <SqueezeLoader
                                size={100}
                                color1="#00ff00"
                                color2="#0000ff"
                                duration={5000}
                                rotationSpeed={15000}
                                className="my-8"
                            />
                        </div>
                    </PreviewTabs>
                </div>

                <UsageSection
                    title="Component Code"
                    description={t(
                        'A customizable loading spinner with a smooth squeezing animation effect. The component is built with Tailwind CSS and CSS animations for optimal performance.',
                    )}
                    code={componentCode}
                />

                <DocsSection
                    description={
                        <>
                            <p className="mb-4">
                                <strong>Squeeze Loader</strong> &mdash;{' '}
                                {t(
                                    'A visually appealing loading indicator that features a smooth squeezing animation effect. The component is highly customizable and can be easily integrated into any React application.',
                                )}
                            </p>
                            <p className="mb-4">
                                {t(
                                    'The animation consists of two elements that move in a synchronized pattern, creating an engaging loading experience. The component uses CSS custom properties for easy theming and customization.',
                                )}
                            </p>
                        </>
                    }
                    rows={rows}
                />
            </div>
        </MainLayout>
    );
}

export default SqueezeLoaderPage;
