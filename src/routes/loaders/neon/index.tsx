import { PreviewTabs } from '@/components/preview-tabs';
import PageTitle from '@/components/ui/page-title';
import { MainLayout } from '@/main-layout';
import { createFileRoute } from '@tanstack/react-router';
import { NeonLoader } from '@/components/ui/neon-loader';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { useTranslation } from '@/hooks/use-translation';

export const Route = createFileRoute('/loaders/neon/')({
    component: NeonLoaderPage,
});

const defaultCode = `import { NeonLoader } from '@/components/ui/neon-loader';

<NeonLoader />
`;

const smallCode = `import { NeonLoader } from '@/components/ui/neon-loader';

<NeonLoader 
  size={100}
  color="#ff00ff"
  duration={1.5}
  dotSize={10}
  strokeWidth={10}
/>
`;

const customColorCode = `import { NeonLoader } from '@/components/ui/neon-loader';

<NeonLoader 
  size={150}
  color="#ff9900"
  className="my-8"
  duration={1.8}
  dotSize={15}
  strokeWidth={15}
/>
`;

const rows: PropsTableRow[] = [
    {
        prop: 'size',
        type: 'number',
        required: false,
        defaultValue: '200',
        description: 'Size of the loader in pixels',
    },
    {
        prop: 'color',
        type: 'string',
        required: false,
        defaultValue: "'#00fff9'",
        description: 'Color of the neon effect',
    },
    {
        prop: 'duration',
        type: 'number',
        required: false,
        defaultValue: '2',
        description: 'Animation duration in seconds',
    },
    {
        prop: 'dotSize',
        type: 'number',
        required: false,
        defaultValue: '20',
        description: 'Size of the center dot in pixels',
    },
    {
        prop: 'strokeWidth',
        type: 'number',
        required: false,
        defaultValue: '20',
        description: 'Width of the loader circle',
    },
    {
        prop: 'backgroundColor',
        type: 'string',
        required: false,
        defaultValue: "'#000000'",
        description: 'Background color of the loader',
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

interface NeonLoaderProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    color?: string;
    duration?: number;
    dotSize?: number;
    strokeWidth?: number;
    backgroundColor?: string;
}

export const NeonLoader = forwardRef<HTMLDivElement, NeonLoaderProps>(
    (
        {
            size = 200,
            color = '#00fff9',
            duration = 2,
            dotSize = 20,
            strokeWidth = 20,
            backgroundColor = '#000000',
            className,
            style,
            ...props
        },
        ref,
    ) => {
        const loaderStyle = {
            '--neon-size': \`\${size}px\`,
            '--neon-color': color,
            '--neon-duration': \`\${duration}s\`,
            '--neon-dot-size': \`\${dotSize}px\`,
            '--neon-stroke-width': \`\${strokeWidth}px\`,
            '--neon-background-color': backgroundColor,
            ...style,
        } as React.CSSProperties;

        return (
            <div
                ref={ref}
                className={cn(
                    'relative h-[calc(var(--neon-size)/2)] w-[var(--neon-size)]',
                    'flex items-center justify-center',
                    className,
                )}
                style={loaderStyle}
                {...props}
            >
                <style>{\`
          @keyframes neon-rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .neon-loader {
            position: absolute;
            width: var(--neon-size);
            height: var(--neon-size);
            border-radius: 50%;
            animation: neon-rotate var(--neon-duration) linear infinite;
          }
          
          .neon-loader:before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 50%;
            height: 100%;
            background: linear-gradient(to top, transparent, rgba(var(--neon-color-rgb), 0.4));
            background-size: calc(var(--neon-size) * 0.5) calc(var(--neon-size) * 0.9);
            background-repeat: no-repeat;
            border-top-left-radius: calc(var(--neon-size) * 0.5);
            border-bottom-left-radius: calc(var(--neon-size) * 0.5);
          }
          
          .neon-loader.delayed {
            animation-delay: calc(-1 * var(--neon-duration) / 2);
            filter: hue-rotate(290deg);
          }
          
          .neon-dot {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: var(--neon-dot-size);
            height: var(--neon-dot-size);
            background: var(--neon-color);
            border-radius: 50%;
            z-index: 100;
            box-shadow: 0 0 10px var(--neon-color),
                        0 0 20px var(--neon-color),
                        0 0 30px var(--neon-color),
                        0 0 40px var(--neon-color),
                        0 0 50px var(--neon-color);
          }
          
          .neon-inner {
            position: absolute;
            inset: var(--neon-stroke-width);
            background: var(--neon-background-color);
            border-radius: 50%;
            z-index: 1;
          }
        \`}</style>

                <div
                    className="neon-loader"
                    style={
                        {
                            '--neon-color-rgb': color.startsWith('#')
                                ? \`\${parseInt(color.slice(1, 3), 16)}, \${parseInt(color.slice(3, 5), 16)}, \${parseInt(color.slice(5, 7), 16)}\`
                                : '0, 255, 249', // Default teal color
                        } as React.CSSProperties
                    }
                >
                    <span className="neon-inner"></span>
                    <i className="neon-dot"></i>
                </div>

                <div
                    className="neon-loader delayed"
                    style={
                        {
                            '--neon-color-rgb': color.startsWith('#')
                                ? \`\${parseInt(color.slice(1, 3), 16)}, \${parseInt(color.slice(3, 5), 16)}, \${parseInt(color.slice(5, 7), 16)}\`
                                : '0, 255, 249', // Default teal color
                        } as React.CSSProperties
                    }
                >
                    <span className="neon-inner"></span>
                    <i className="neon-dot"></i>
                </div>
            </div>
        );
    },
);

NeonLoader.displayName = 'NeonLoader';

`;

function NeonLoaderPage() {
    const { t } = useTranslation();
    return (
        <MainLayout>
            <div className="w-full px-6 py-16">
                <PageTitle>Neon Loader</PageTitle>
                <p className="max-w-xl text-white/60">
                    {t('A stylish neon loading spinner with a glowing effect.')}
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs
                        title="Default"
                        codeText={defaultCode}
                        codeSandboxUrl="https://codepen.io/MichelleLien/pen/EaxMxvm"
                    >
                        <div className="flex h-60 items-center justify-center">
                            <NeonLoader />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs
                        title="Small & Fast"
                        codeText={smallCode}
                        codeSandboxUrl="https://codepen.io/MichelleLien/pen/EaxMxvm"
                    >
                        <div className="flex h-60 items-center justify-center">
                            <NeonLoader
                                size={100}
                                color="#ff00ff"
                                duration={1.5}
                                dotSize={10}
                                strokeWidth={10}
                            />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs
                        title="Custom Color"
                        codeText={customColorCode}
                        codeSandboxUrl="https://codepen.io/MichelleLien/pen/EaxMxvm"
                    >
                        <div className="flex h-60 items-center justify-center">
                            <NeonLoader
                                size={150}
                                color="#ff9900"
                                duration={1.8}
                                dotSize={15}
                                strokeWidth={15}
                            />
                        </div>
                    </PreviewTabs>
                </div>

                <UsageSection
                    title="Component Code"
                    description={t(
                        'A customizable neon loading spinner with a glowing effect. The component is built with CSS animations for optimal performance.',
                    )}
                    code={componentCode}
                />

                <DocsSection
                    description={
                        <>
                            <p className="mb-4">
                                <strong>Neon Loader</strong> &mdash;{' '}
                                {t(
                                    'A visually striking loading indicator that features a neon glow effect with a rotating animation. The component is highly customizable and can be easily integrated into any React application.',
                                )}
                            </p>
                            <p className="mb-4">
                                {t(
                                    'The animation consists of two rotating arcs with a glowing dot that creates an engaging loading experience. The component uses CSS custom properties for easy theming and customization.',
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

export default NeonLoaderPage;
