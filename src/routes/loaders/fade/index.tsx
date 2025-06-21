import { PreviewTabs } from '@/components/preview-tabs';
import PageTitle from '@/components/ui/page-title';
import { MainLayout } from '@/main-layout';
import { createFileRoute } from '@tanstack/react-router';
import { FadeLoader } from '@/components/ui/fade-loader';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';

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
    description: 'Size of the loader (width and height). Can be any valid CSS size value.' 
  },
  { 
    prop: 'ringWidth', 
    type: 'string | number', 
    required: false, 
    defaultValue: '"17px"', 
    description: 'Width of the loader ring. Should be proportional to the size.' 
  },
  { 
    prop: 'color', 
    type: 'string', 
    required: false, 
    defaultValue: '"#FFFFFF"', 
    description: 'Color of the loader. Supports any valid CSS color value (hex, rgb, named colors, etc.).' 
  },
  { 
    prop: 'duration', 
    type: 'number', 
    required: false, 
    defaultValue: '1.8', 
    description: 'Animation duration in seconds. Lower values make the animation faster.' 
  },
  { 
    prop: 'shadow', 
    type: 'boolean', 
    required: false, 
    defaultValue: 'true', 
    description: 'Whether to show a subtle drop shadow effect under the loader.' 
  },
  { 
    prop: 'containerClassName', 
    type: 'string', 
    required: false, 
    defaultValue: 'undefined', 
    description: 'Additional class name for the outer container div.' 
  },
  { 
    prop: 'className', 
    type: 'string', 
    required: false, 
    defaultValue: 'undefined', 
    description: 'Additional class name for the loader element itself.' 
  },
];

const componentCode = `import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface FadeLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: string | number;
  ringWidth?: string | number;
  color?: string;
  duration?: number;
  shadow?: boolean;
  containerClassName?: string;
}

export const FadeLoader = forwardRef<HTMLDivElement, FadeLoaderProps>(
  ({
    size = '146px',
    ringWidth = '17px',
    color = '#FFFFFF',
    duration = 1.8,
    shadow = true,
    className,
    containerClassName,
    style,
    ...props
  }, ref) => {
    const sizeValue = typeof size === 'number' ? \`\${size}px\` : size;
    const ringWidthValue = typeof ringWidth === 'number' ? \`\${ringWidth}px\` : ringWidth;
    
    return (
      <div 
        ref={ref}
        className={cn(
          'relative flex items-center justify-center',
          containerClassName
        )}
        style={{
          width: '100%',
          maxWidth: sizeValue,
          margin: \`calc(\${sizeValue} / 2) auto\`,
          ...style
        }}
        {...props}
      >
        <style>{\`
          .fade-loader {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 100%;
          }
          
          .fade-loader:before,
          .fade-loader:after {
            content: \"\";
            position: absolute;
            border-radius: 50%;
            animation-duration: \${duration}s;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
            \${shadow ? \`filter: drop-shadow(0 0 calc(\${ringWidthValue} / 2.25) rgba(\${hexToRgb(color)}, 0.75));\` : ''}
          }
          
          .fade-loader:before {
            width: 100%;
            padding-bottom: 100%;
            box-shadow: inset 0 0 0 \${ringWidthValue} \${color};
            animation-name: fadePulseA;
          }
          
          .fade-loader:after {
            width: calc(100% - \${ringWidthValue} * 2);
            padding-bottom: calc(100% - \${ringWidthValue} * 2);
            box-shadow: 0 0 0 0 \${color};
            animation-name: fadePulseB;
          }
          
          @keyframes fadePulseA {
            0% { 
              box-shadow: inset 0 0 0 \${ringWidthValue} \${color}; 
              opacity: 1; 
            }
            50%, 100% { 
              box-shadow: inset 0 0 0 0 \${color}; 
              opacity: 0; 
            }
          }
          
          @keyframes fadePulseB {
            0%, 50% { 
              box-shadow: 0 0 0 0 \${color}; 
              opacity: 0; 
            }
            100% { 
              box-shadow: 0 0 0 \${ringWidthValue} \${color}; 
              opacity: 1; 
            }
          }
        \`}</style>
        
        <div className={cn('fade-loader', className)} />
      </div>
    );
  }
);

FadeLoader.displayName = 'FadeLoader';

// Helper function to convert hex color to RGB
function hexToRgb(hex: string): string {
  const hexValue = hex.replace('#', '');
  const r = parseInt(hexValue.substring(0, 2), 16);
  const g = parseInt(hexValue.substring(2, 4), 16);
  const b = parseInt(hexValue.substring(4, 6), 16);
  return \`\${r}, \${g}, \${b}\`;
}
`;

function FadeLoaderPage() {
    return (
        <MainLayout>
            <div className="px-6 py-16 w-full">
                <PageTitle>Fade Loader</PageTitle>
                <p className="text-white/60 max-w-xl">
                    A smooth, pulsing loading animation with a fade effect. The loader features two concentric circles that pulse in and out of view.
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs 
                      title="Standard Loader" 
                      description="Default configuration with white color and standard size"
                      codeText={defaultCode}
                    >
                        <FadeLoader />
                    </PreviewTabs>

                    <PreviewTabs 
                      title="Fast Teal Loader" 
                      description="Faster animation with teal color and no shadow"
                      codeText={customCode}
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
                    >
                      <div className="p-12 rounded-lg">
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
                    </PreviewTabs>
                </div>

                <UsageSection
                    title="Component Code"
                    description="A smooth, pulsing loading animation with a fade effect. The loader features two concentric circles that pulse in and out of view, creating a modern and elegant loading experience. The component is highly customizable and works well in both light and dark themes."
                    code={componentCode}
                />

                <DocsSection
                    description={
                        <>
                            <p className="mb-4">
                                <strong>Fade Loader</strong> &mdash; A visually appealing loading indicator that creates a smooth pulsing effect. The loader consists of two concentric circles that fade in and out in an alternating pattern, creating a sense of depth and movement.
                            </p>
                            <p className="mb-4">
                                The animation is lightweight and performs well across different devices and browsers. The component is highly customizable, allowing you to adjust the size, colors, animation speed, and more to match your application's design system.
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
