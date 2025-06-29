import { PreviewTabs } from '@/components/preview-tabs';
import PageTitle from '@/components/ui/page-title';
import { MainLayout } from '@/main-layout';
import { createFileRoute } from '@tanstack/react-router';
import { FadeLoader } from '@/components/ui/fade-loader';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { useTranslation } from '@/hooks/use-translation';

export const Route = createFileRoute('/loaders/fade/')({
    component: FadeLoaderPage,
});

const defaultCode = `import { FadeLoader } from '@/components/ui/fade-loader';

// Standard loader with default settings
<div className="p-8">
  <FadeLoader />
</div>
`;

const customCode = `import { FadeLoader } from '@/components/ui/fade-loader';

// Custom loader with fast animation and teal color
<div className="p-8">
  <FadeLoader 
    size="80px"
    ringWidth="6px"
    color="#0d9488"
    duration={1}
    shadow={true}
  />
</div>
`;

const darkBackgroundCode = `import { FadeLoader } from '@/components/ui/fade-loader';

// Large loader with slow animation for full-page loading
<div className="p-12 bg-gray-900 rounded-lg">
  <div className="text-center">
    <FadeLoader 
      size="120px"
      ringWidth="10px"
      color="#f472b6"
      duration={3}
      shadow={true}
      className="mx-auto mb-4"
    />
    <p className="text-gray-300 font-medium">Loading your content...</p>
  </div>
</div>
`;

const rows: PropsTableRow[] = [
    {
        prop: 'size',
        type: 'string | number',
        required: false,
        defaultValue: '"146px"',
        description: 'Size of the loader (width and height). Can be any valid CSS size value.',
    },
    {
        prop: 'ringWidth',
        type: 'string | number',
        required: false,
        defaultValue: '"17px"',
        description: 'Width of the loader ring. Should be proportional to the size.',
    },
    {
        prop: 'color',
        type: 'string',
        required: false,
        defaultValue: '"#FFFFFF"',
        description:
            'Color of the loader. Supports any valid CSS color value (hex, rgb, named colors, etc.).',
    },
    {
        prop: 'duration',
        type: 'number',
        required: false,
        defaultValue: '1.8',
        description: 'Animation duration in seconds. Lower values make the animation faster.',
    },
    {
        prop: 'shadow',
        type: 'boolean',
        required: false,
        defaultValue: 'true',
        description: 'Whether to show a subtle drop shadow effect under the loader.',
    },
    {
        prop: 'containerClassName',
        type: 'string',
        required: false,
        defaultValue: '""',
        description: 'Additional class name for the outer container div.',
    },
    {
        prop: 'className',
        type: 'string',
        required: false,
        defaultValue: '""',
        description: 'Additional class name for the loader element itself.',
    },
];

const componentCode = `
import { type HTMLAttributes, forwardRef, useMemo } from 'react';
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

interface FadeLoaderProps extends HTMLAttributes<HTMLDivElement> {
    size?: string | number;
    ringWidth?: string | number;
    color?: string;
    duration?: number;
    shadow?: boolean;
    containerClassName?: string;
    className?: string;
}
export const FadeLoader = forwardRef<HTMLDivElement, FadeLoaderProps>(
    (
        {
            size = '146px',
            ringWidth = '17px',
            color = '#FFFFFF',
            duration = 1.8,
            shadow = true,
            className = '',
            containerClassName = '',
            style,
            ...props
        },
        ref,
    ) => {
        const sizeValue = typeof size === 'number' ? \`\${size}px\` : size;
        const ringWidthValue = typeof ringWidth === 'number' ? \`\${ringWidth}px\` : ringWidth;

        // Generate unique IDs for the animations to prevent conflicts
        const animationIdA = useMemo(
            () => \`fadePulseA_\${Math.random().toString(36).substr(2, 9)}\`,
            [],
        );
        const animationIdB = useMemo(
            () => \`fadePulseB_\${Math.random().toString(36).substr(2, 9)}\`,
            [],
        );

        // Parse color to ensure it's valid
        const parsedColor = useMemo(() => {
            try {
                // If it's a named color or rgb/rgba, use as is
                if (!color.startsWith('#')) return color;

                // Handle hex colors
                let hex = color.replace('#', '');

                // Convert 3-digit hex to 6-digit
                if (hex.length === 3) {
                    hex = hex
                        .split('')
                        .map((c) => c + c)
                        .join('');
                }

                // Convert to rgb
                const r = parseInt(hex.substring(0, 2), 16);
                const g = parseInt(hex.substring(2, 4), 16);
                const b = parseInt(hex.substring(4, 6), 16);

                return \`rgb(\${r}, \${g}, \${b})\`;
            } catch {
                console.warn('Invalid color provided to FadeLoader, using default white');
                return '#FFFFFF';
            }
        }, [color]);

        // Generate CSS for the loader
        const loaderStyles = useMemo(() => {
            const styles: React.CSSProperties & {
                '--loader-size'?: string;
                '--ring-width'?: string;
                '--loader-color'?: string;
                '--animation-duration'?: string;
                '--shadow-color'?: string;
            } = {
                '--loader-size': sizeValue,
                '--ring-width': ringWidthValue,
                '--loader-color': parsedColor,
                '--animation-duration': \`\${duration}s\`,
            };

            if (shadow) {
                styles['--shadow-color'] = parsedColor
                    .replace(')', ', 0.75)')
                    .replace('rgb', 'rgba');
            }

            return styles;
        }, [sizeValue, ringWidthValue, parsedColor, duration, shadow]);

        return (
            <div
                ref={ref}
                className={cn('relative flex items-center justify-center', containerClassName)}
                style={{
                    width: '100%',
                    maxWidth: sizeValue,
                    margin: \`calc(\${sizeValue} / 2) auto\`,
                    ...style,
                }}
                {...props}
            >
                <style>{\`
          @keyframes \${animationIdA} {
            0% { 
              box-shadow: inset 0 0 0 var(--ring-width) var(--loader-color);
              opacity: 1;
            }
            50%, 100% { 
              box-shadow: inset 0 0 0 0 var(--loader-color);
              opacity: 0;
            }
          }
          
          @keyframes \${animationIdB} {
            0%, 50% { 
              box-shadow: 0 0 0 0 var(--loader-color);
              opacity: 0;
            }
            100% { 
              box-shadow: 0 0 0 var(--ring-width) var(--loader-color);
              opacity: 1;
            }
          }
          
          .fade-loader {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 100%;
          }
          
          .fade-loader:before,
          .fade-loader:after {
            content: "";
            position: absolute;
            border-radius: 50%;
            animation-duration: var(--animation-duration);
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
            \${shadow ? 'filter: drop-shadow(0 0 calc(var(--ring-width) / 2.25) var(--shadow-color));' : ''}
          }
          
          .fade-loader:before {
            width: 100%;
            padding-bottom: 100%;
            box-shadow: inset 0 0 0 var(--ring-width) var(--loader-color);
            animation-name: \${animationIdA};
            top: 0;
            left: 0;
            transform: translateZ(0);
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          
          .fade-loader:after {
            width: calc(100% - var(--ring-width) * 2);
            padding-bottom: calc(100% - var(--ring-width) * 2);
            box-shadow: 0 0 0 0 var(--loader-color);
            animation-name: \${animationIdB};
            top: var(--ring-width);
            left: var(--ring-width);
            transform: translateZ(0);
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
        \`}</style>
                <div className={cn('fade-loader', className)} style={loaderStyles} />
            </div>
        );
    },
);

FadeLoader.displayName = 'FadeLoader';

`;

function FadeLoaderPage() {
    const { t } = useTranslation();
    return (
        <MainLayout>
            <div className="w-full px-6 py-16">
                <PageTitle>Fade Loader</PageTitle>
                <p className="max-w-xl text-white/60">
                    {t(
                        'A smooth, pulsing loading animation with a fade effect. The loader features two concentric circles that pulse in and out of view.',
                    )}
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs
                        title="Standard Loader"
                        description="Default configuration with white color and standard size"
                        codeText={defaultCode}
                        codeSandboxUrl="https://codepen.io/sonjastrieder/pen/ryajej"
                    >
                        <FadeLoader />
                    </PreviewTabs>

                    <PreviewTabs
                        title="Fast Teal Loader"
                        description="Faster animation with teal color and no shadow"
                        codeText={customCode}
                        codeSandboxUrl="https://codepen.io/sonjastrieder/pen/ryajej"
                    >
                        <FadeLoader
                            size="80px"
                            ringWidth="6px"
                            color="#0d9488"
                            duration={1}
                            shadow={false}
                            className="mx-auto"
                        />
                    </PreviewTabs>

                    <PreviewTabs
                        title="Full Page Loader"
                        description="Large loader with text for full-page loading states"
                        codeText={darkBackgroundCode}
                        codeSandboxUrl="https://codepen.io/sonjastrieder/pen/ryajej"
                    >
                        <div className="rounded-lg p-12">
                            <div className="text-center">
                                <FadeLoader
                                    size="120px"
                                    ringWidth="10px"
                                    color="#f472b6"
                                    duration={3}
                                    shadow={true}
                                    className="mx-auto mb-4"
                                />
                                <p className="font-medium text-gray-300">
                                    {t('Loading your content...')}
                                </p>
                            </div>
                        </div>
                    </PreviewTabs>
                </div>

                <UsageSection
                    title="Component Code"
                    description={t(
                        'A smooth, pulsing loading animation with a fade effect. The loader features two concentric circles that pulse in and out of view, creating a modern and elegant loading experience. The component is highly customizable and works well in both light and dark themes.',
                    )}
                    code={componentCode}
                />

                <DocsSection
                    description={
                        <>
                            <p className="mb-4">
                                <strong>Fade Loader</strong> &mdash;{' '}
                                {t(
                                    'A visually appealing loading indicator that creates a smooth pulsing effect. The loader consists of two concentric circles that fade in and out in an alternating pattern, creating a sense of depth and movement.',
                                )}
                            </p>
                            <p className="mb-4">
                                {t(
                                    "The animation is lightweight and performs well across different devices and browsers. The component is highly customizable, allowing you to adjust the size, colors, animation speed, and more to match your application's design system.",
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

export default FadeLoaderPage;
