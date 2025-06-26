import { PreviewTabs } from '@/components/preview-tabs';
import PageTitle from '@/components/ui/page-title';
import { MainLayout } from '@/main-layout';
import { createFileRoute } from '@tanstack/react-router';
import { GusanoLoader } from '@/components/ui/gusano-loader';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { useTranslation } from '@/hooks/use-translation';

export const Route = createFileRoute('/loaders/gusano/')({
    component: GusanoLoaderPage,
});

const defaultCode = `import { GusanoLoader } from '@/components/ui/gusano-loader';

<GusanoLoader />
`;

const customCode = `import { GusanoLoader } from '@/components/ui/gusano-loader';

<div className="p-6 rounded-lg">
  <GusanoLoader 
    boxSize={15}
    gutter={3}
    duration={5}
    color="#8a2be2"
    animateColor={false}
    className="mx-auto"
  />
</div>
`;

const animatedCode = `import { GusanoLoader } from '@/components/ui/gusano-loader';

export function AnimatedGusano() {
  return (
    <div className="relative h-64 w-full max-w-md mx-auto rounded-xl overflow-hidden p-6">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="mb-6 text-center">
          <h3 className="text-white text-xl font-medium mb-2">Loading Content</h3>
          <p className="text-gray-400 text-sm">Preparing your experience</p>
        </div>
        <GusanoLoader 
          boxSize={12}
          gutter={4}
          duration={4}
          colors={['#ff6b6b', '#ff8e53', '#ffb847', '#ffd700', '#f1c40f', '#e74c3c']}
          className="mx-auto scale-75"
        />
      </div>
    </div>
  );
}
`;

const rows: PropsTableRow[] = [
  { 
    prop: 'boxSize', 
    type: 'number', 
    required: false, 
    defaultValue: '15', 
    description: 'Size of each box in pixels' 
  },
  { 
    prop: 'gutter', 
    type: 'number', 
    required: false, 
    defaultValue: '5', 
    description: 'Space between boxes in pixels' 
  },
  { 
    prop: 'duration', 
    type: 'number', 
    required: false, 
    defaultValue: '7', 
    description: 'Animation duration in seconds' 
  },
  { 
    prop: 'color', 
    type: 'string', 
    required: false, 
    defaultValue: "'#1abc9c'", 
    description: 'Color of the boxes (when animateColor is false)' 
  },
  { 
    prop: 'animateColor', 
    type: 'boolean', 
    required: false, 
    defaultValue: 'true', 
    description: 'Whether to enable color animation' 
  },
  { 
    prop: 'colors', 
    type: 'string[]', 
    required: false, 
    defaultValue: '["#9b59b6", "#2980b9", "#c0392b", "#16a085", "#f39c12", "#27ae60", "#419fdd", "#f1c40f", "#1abc9c"]', 
    description: 'Custom colors for animation (only used when animateColor is true)' 
  },
];

const componentCode = `import { forwardRef, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface GusanoLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  boxSize?: number;
  gutter?: number;
  duration?: number;
  color?: string;
  animateColor?: boolean;
  colors?: string[];
}

export const GusanoLoader = forwardRef<HTMLDivElement, GusanoLoaderProps>(
  ({
    boxSize = 15,
    gutter = 5,
    duration = 7,
    color = '#1abc9c',
    animateColor = true,
    colors = [
      '#9b59b6', '#2980b9', '#c0392b', '#16a085',
      '#f39c12', '#27ae60', '#419fdd', '#f1c40f', '#1abc9c'
    ],
    className,
    style,
    ...props
  }, ref) => {
    const x1 = boxSize + gutter;
    const x2 = x1 * 2;
    
    const positions = useMemo(() => [
      \`0px, \${x1}px\`,
      \`0px, \${x2}px\`,
      \`\${x1}px, \${x2}px\`,
      \`\${x1}px, \${x1}px\`,
      \`\${x2}px, \${x1}px\`,
      \`\${x2}px, 0px\`,
      \`\${x1}px, 0px\`
    ], [x1, x2]);

    const animationFrames = useMemo(() => [
      \`0px, \${x1}px\`,
      '0px, 0px',
      \`\${x1}px, 0px\`,
      \`\${x2}px, 0px\`,
      \`\${x2}px, \${x1}px\`,
      \`\${x1}px, \${x1}px\`,
      \`\${x1}px, \${x2}px\`,
      \`0px, \${x2}px\`,
      \`0px, \${x1}px\`
    ], [x1, x2]);

    const colorKeyframes = useMemo(() => {
      if (!animateColor) return '';
      
      const totalColors = colors.length;
      const percentageStep = 100 / (totalColors - 1);
      
      return colors.map((c, i) => {
        const percent = Math.round(i * percentageStep);
        return \`\${percent}% { background-color: \${c}; }\`;
      }).join('\\n');
    }, [animateColor, colors]);

    const containerStyle = {
      '--box-size': \`\${boxSize}px\`,
      '--gutter': \`\${gutter}px\`,
      '--x1': \`\${x1}px\`,
      '--x2': \`\${x2}px\`,
      '--duration': \`\${duration}s\`,
      '--color': color,
      width: \`calc(var(--box-size) * 3 + var(--gutter) * 2)\`,
      height: \`calc(var(--box-size) * 3 + var(--gutter) * 2)\`,
      ...style,
    } as React.CSSProperties;

    return (
      <div 
        ref={ref}
        className={cn('relative', className)}
        style={containerStyle}
        {...props}
      >
        <style>{\`
          .gusano-loader {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotateZ(45deg);
            width: 100%;
            height: 100%;
          }
          
          .gusano-box {
            position: absolute;
            top: 0;
            left: 0;
            display: inline-block;
            width: var(--box-size);
            height: var(--box-size);
            border-radius: 3px;
            animation-duration: var(--duration);
            animation-iteration-count: infinite;
            animation-fill-mode: forwards;
            animation-direction: normal;
            animation-timing-function: cubic-bezier(0.75, 0, 0, 0.75);
          }
          
          .gusano-box:before {
            content: "";
            display: inline-block;
            width: 100%;
            height: 100%;
            background-color: var(--color);
            border-radius: 3px;
            \${animateColor ? \`
              animation-name: gusanoColor;
              animation-duration: \${duration * 4}s;
              animation-iteration-count: infinite;
              animation-direction: normal;
              animation-timing-function: ease-in-out;
            \` : ''}
          }
          
          \${positions.map((pos, i) => {
            const delay = (duration / positions.length) * (positions.length - 1 - i);
            return \`
              .gusano-box:nth-child(\${i + 1}) {
                animation-delay: -\${delay}s;
                transform: translate(\${pos});
                animation-name: gusanoPos\${i + 1};
              }
              
              @keyframes gusanoPos\${i + 1} {
                \${animationFrames.map((frame, j) => {
                  const percent = Math.round((j / (animationFrames.length - 1)) * 100);
                  const percent2 = percent + 5;
                  return \`
                    \${percent}% { transform: translate(\${frame}); }
                    \${percent2}% { transform: translate(\${frame}); }
                  \`;
                }).join('')}
              }
            \`;
          }).join('')}
          
          \${colorKeyframes ? \`
            @keyframes gusanoColor {
              \${colorKeyframes}
            }
          \` : ''}
        \`}</style>
        
        <div className="gusano-loader">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="gusano-box" />
          ))}
        </div>
      </div>
    );
  }
);

GusanoLoader.displayName = 'GusanoLoader';`;

function GusanoLoaderPage() {
  const {t} = useTranslation()
    return (
        <MainLayout>
            <div className="px-6 py-16 w-full">
                <PageTitle>Gusano Loader</PageTitle>
                <p className="text-white/60 max-w-xl">
                    {t('A unique loading animation with boxes that move in a worm-like pattern with smooth color transitions.')}
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs title="Default" codeText={defaultCode}>
                        <div className="relative h-80 rounded-lg flex items-center justify-center">
                            <GusanoLoader/>
                        </div>
                    </PreviewTabs>

                    <PreviewTabs title="Custom Configuration" codeText={customCode}>
                        <div className="relative h-80 rounded-lg overflow-hidden">
                            <div className="p-6 rounded-lg h-full flex items-center">
                                <GusanoLoader 
                                    boxSize={15}
                                    gutter={3}
                                    duration={5}
                                    color="#8a2be2"
                                    animateColor={false}
                                    className="mx-auto"
                                />
                            </div>
                        </div>
                    </PreviewTabs>

                    <PreviewTabs title="Animated Example" codeText={animatedCode}>
                        <div className="relative h-80 rounded-lg overflow-hidden">
                            <div className="relative h-full w-full max-w-md mx-auto rounded-xl overflow-hidden p-6">
                                <div className="flex flex-col items-center justify-center h-full">
                                    <div className="mb-6 text-center">
                                        <h3 className="text-white text-xl font-medium mb-2">Loading Content</h3>
                                        <p className="text-gray-400 text-sm">Preparing your experience</p>
                                    </div>
                                    <GusanoLoader 
                                        boxSize={12}
                                        gutter={4}
                                        duration={4}
                                        colors={['#ff6b6b', '#ff8e53', '#ffb847', '#ffd700', '#f1c40f', '#e74c3c']}
                                        className="mx-auto scale-75"
                                    />
                                </div>
                            </div>
                        </div>
                    </PreviewTabs>
                </div>

                <UsageSection
                    title="Component Code"
                    description={t("A versatile loading animation with configurable boxes that move in a worm-like pattern. The component supports both static and animated colors, with customizable sizes, timings, and colors.")}
                    code={componentCode}
                />

                <DocsSection
                    description={
                        <>
                            <p className="mb-4">
                                <strong>Gusano Loader</strong> &mdash; {t(`A unique loading animation that creates a worm-like movement with a series of connected boxes. The loader can be customized in size, speed, and color scheme to match your application's design system.`)}
                            </p>
                            <p className="mb-4">
                                {t(`The animation features smooth transitions and can be configured to cycle through a custom color palette. The component is lightweight and performs well even with complex animations.`)}
                            </p>
                        </>
                    }
                    rows={rows}
                />
            </div>
        </MainLayout>
    );
}

export default GusanoLoaderPage;
