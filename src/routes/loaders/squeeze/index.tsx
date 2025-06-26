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
        prop: "size", 
        type: "number", 
        required: false, 
        defaultValue: '60', 
        description: "Size of the loader in pixels" 
    },
    { 
        prop: "color1", 
        type: "string", 
        required: false, 
        defaultValue: "'#3498db'", 
        description: "Primary color of the loader" 
    },
    { 
        prop: "color2", 
        type: "string", 
        required: false, 
        defaultValue: "'#e74c3c'", 
        description: "Secondary color of the loader" 
    },
    { 
        prop: "duration", 
        type: "number", 
        required: false, 
        defaultValue: '3000', 
        description: "Animation duration in milliseconds" 
    },
    { 
        prop: "rotationSpeed", 
        type: "number", 
        required: false, 
        defaultValue: '10000', 
        description: "Rotation speed in milliseconds (full rotation)" 
    },
    { 
        prop: "className", 
        type: "string", 
        required: false, 
        defaultValue: '""', 
        description: "Additional class name for the container" 
    },
];

const componentCode = `import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SqueezeLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  color1?: string;
  color2?: string;
  duration?: number;
  rotationSpeed?: number;
}

export const SqueezeLoader = forwardRef<HTMLDivElement, SqueezeLoaderProps>(
  ({
    size = 60,
    color1 = '#3498db',
    color2 = '#e74c3c',
    duration = 3000,
    rotationSpeed = 10000,
    className,
    style,
    ...props
  }, ref) => {
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
          'relative w-[var(--squeeze-size)] aspect-square',
          'animate-[spin_var(--squeeze-rotation-speed)_infinite_linear]',
          className
        )}
        style={loaderStyle}
        {...props}
      >
        <style jsx>{\`
          @keyframes squeeze {
            0% { inset: 0 33.33% 33.33% 0; }
            12.5% { inset: 0 33.33% 0 0; }
            25% { inset: 33.33% 33.33% 0 0; }
            37.5% { inset: 33.33% 0 0 0; }
            50% { inset: 33.33% 0 0 33.33%; }
            62.5% { inset: 0 0 0 33.33%; }
            75% { inset: 0 0 33.33% 33.33%; }
            87.5% { inset: 0 0 33.33% 0; }
            100% { inset: 0 33.33% 33.33% 0; }
          }
          .squeeze-element {
            content: "";
            position: absolute;
            background: var(--squeeze-color-1);
            animation: squeeze var(--squeeze-duration) infinite;
          }
          .squeeze-element:nth-child(2) {
            background: var(--squeeze-color-2);
            animation-delay: calc(var(--squeeze-duration) * -0.4167);
            border-radius: 50%;
          }
        \`}</style>
        <div className="squeeze-element" />
        <div className="squeeze-element" />
      </div>
    );
  }
);

SqueezeLoader.displayName = 'SqueezeLoader';
`;

function SqueezeLoaderPage() {
  const {t} = useTranslation();
    return (
        <MainLayout>
            <div className="px-6 py-16 w-full">
                <PageTitle>Squeeze Loader</PageTitle>
                <p className="text-white/60 max-w-xl">
                    {t('A smooth, animated loading spinner with a squeezing effect that creates a visually appealing loading indicator.')}
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs title="Default" codeText={defaultCode}>
                        <div className="flex justify-center items-center h-40">
                            <SqueezeLoader />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs title="Small & Fast" codeText={smallCode}>
                        <div className="flex justify-center items-center h-40">
                            <SqueezeLoader 
                                size={30}
                                color1="#8a2be2"
                                color2="#ff69b4"
                                duration={2000}
                                rotationSpeed={5000}
                            />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs title="Large & Slow" codeText={largeCode}>
                        <div className="flex justify-center items-center h-40">
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
                    description={t('A customizable loading spinner with a smooth squeezing animation effect. The component is built with Tailwind CSS and CSS animations for optimal performance.')}
                    code={componentCode}
                />

                <DocsSection
                    description={
                        <>
                            <p className="mb-4">
                                <strong>Squeeze Loader</strong> &mdash; {t('A visually appealing loading indicator that features a smooth squeezing animation effect. The component is highly customizable and can be easily integrated into any React application.')}
                            </p>
                            <p className="mb-4">
                                {t('The animation consists of two elements that move in a synchronized pattern, creating an engaging loading experience. The component uses CSS custom properties for easy theming and customization.')}
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
