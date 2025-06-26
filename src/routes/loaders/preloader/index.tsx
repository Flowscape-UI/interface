import { PreviewTabs } from '@/components/preview-tabs';
import PageTitle from '@/components/ui/page-title';
import { MainLayout } from '@/main-layout';
import { createFileRoute } from '@tanstack/react-router';
import { Preloader } from '@/components/ui/preloader';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { useTranslation } from '@/hooks/use-translation';

export const Route = createFileRoute('/loaders/preloader/')({
    component: PreloaderPage,
});

const defaultCode = `import { Preloader } from '@/components/ui/preloader';

<Preloader />
`;

const customCode = `import { Preloader } from '@/components/ui/preloader';

<div className="p-6 rounded-lg">
  <Preloader 
    size={120}
    color1="#ff6b6b"
    color2="#4ecdc4"
    color3="#ffe66d"
    duration1={1.5}
    duration2={2.5}
    duration3={1}
    fullScreen={false}
  />
</div>
`;

const inlineCode = `import { Preloader } from '@/components/ui/preloader';

export function UserProfileLoading() {
  return (
    <div className="relative h-64 w-full max-w-md mx-auto rounded-xl overflow-hidden p-6">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="relative w-24 h-24 rounded-full mb-4 overflow-hidden">
          <Preloader 
            size={80}
            color1="#a78bfa"
            color2="#c084fc"
            color3="#e879f9"
            fullScreen={false}
            className="absolute inset-0 m-auto"
          />
        </div>
        <h3 className="text-white text-xl font-medium mb-2">Loading Profile</h3>
        <p className="text-gray-400 text-sm text-center">Just a moment while we prepare your experience</p>
      </div>
    </div>
  );
}
`;

const rows: PropsTableRow[] = [
  { 
    prop: 'isVisible', 
    type: 'boolean', 
    required: false, 
    defaultValue: 'true', 
    description: 'Whether the preloader is visible' 
  },
  { 
    prop: 'size', 
    type: 'number', 
    required: false, 
    defaultValue: '80', 
    description: 'Size of the loader in pixels' 
  },
  { 
    prop: 'color1', 
    type: 'string', 
    required: false, 
    defaultValue: "'#30C032'", 
    description: 'Color of the outer ring' 
  },
  { 
    prop: 'color2', 
    type: 'string', 
    required: false, 
    defaultValue: "'#8f6ed5'", 
    description: 'Color of the middle ring' 
  },
  { 
    prop: 'color3', 
    type: 'string', 
    required: false, 
    defaultValue: "'#2394F2'", 
    description: 'Color of the inner ring' 
  },
  { 
    prop: 'duration1', 
    type: 'number', 
    required: false, 
    defaultValue: '2', 
    description: 'Animation duration in seconds for the outer ring' 
  },
  { 
    prop: 'duration2', 
    type: 'number', 
    required: false, 
    defaultValue: '3', 
    description: 'Animation duration in seconds for the middle ring' 
  },
  { 
    prop: 'duration3', 
    type: 'number', 
    required: false, 
    defaultValue: '1.5', 
    description: 'Animation duration in seconds for the inner ring' 
  },
  { 
    prop: 'fullScreen', 
    type: 'boolean', 
    required: false, 
    defaultValue: 'true', 
    description: 'Whether to show the preloader in full screen mode' 
  },
  { 
    prop: 'zIndex', 
    type: 'number', 
    required: false, 
    defaultValue: '999999', 
    description: 'Z-index of the preloader' 
  },
  { 
    prop: 'onMount', 
    type: '() => void', 
    required: false, 
    defaultValue: 'undefined', 
    description: 'Callback when the preloader is mounted' 
  },
  { 
    prop: 'onUnmount', 
    type: '() => void', 
    required: false, 
    defaultValue: 'undefined', 
    description: 'Callback when the preloader is unmounted' 
  },
];

const componentCode = `import { forwardRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PreloaderProps extends React.HTMLAttributes<HTMLDivElement> {
  isVisible?: boolean;
  size?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  duration1?: number;
  duration2?: number;
  duration3?: number;
  fullScreen?: boolean;
  zIndex?: number;
  onMount?: () => void;
  onUnmount?: () => void;
}

export const Preloader = forwardRef<HTMLDivElement, PreloaderProps>(
  ({
    isVisible = true,
    size = 80,
    color1 = '#30C032',
    color2 = '#8f6ed5',
    color3 = '#2394F2',
    duration1 = 2,
    duration2 = 3,
    duration3 = 1.5,
    fullScreen = true,
    zIndex = 999999,
    className,
    style,
    onMount,
    onUnmount,
    ...props
  }, ref) => {
    useEffect(() => {
      onMount?.();
      return () => {
        onUnmount?.();
      };
    }, [onMount, onUnmount]);

    if (!isVisible) return null;

    const loaderStyle = {
      '--preloader-size': \`\${size}px\`,
      '--preloader-color-1': color1,
      '--preloader-color-2': color2,
      '--preloader-color-3': color3,
      '--preloader-duration-1': \`\${duration1}s\`,
      '--preloader-duration-2': \`\${duration2}s\`,
      '--preloader-duration-3': \`\${duration3}s\`,
      '--preloader-z-index': zIndex,
      ...style,
    } as React.CSSProperties;

    return (
      <div 
        ref={ref}
        className={cn(
          'fixed inset-0 flex items-center justify-center',
          {
            'fixed inset-0': fullScreen,
            'relative w-full h-full': !fullScreen,
          },
          className
        )}
        style={{
          zIndex: fullScreen ? 'var(--preloader-z-index)' : 'auto',
          ...loaderStyle,
        }}
        {...props}
      >
        <div 
          className="relative"
          style={{
            width: 'var(--preloader-size)',
            height: 'var(--preloader-size)',
          }}
        >
          <style jsx>{\`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            .preloader-ring {
              position: absolute;
              border-radius: 50%;
              border: 3px solid transparent;
              animation: spin var(--duration, 2s) linear infinite;
            }
            
            .ring-outer {
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              border-top-color: var(--preloader-color-1);
              --duration: var(--preloader-duration-1);
            }
            
            .ring-middle {
              top: 5px;
              left: 5px;
              right: 5px;
              bottom: 5px;
              border-top-color: var(--preloader-color-2);
              --duration: var(--preloader-duration-2);
            }
            
            .ring-inner {
              top: 15px;
              left: 15px;
              right: 15px;
              bottom: 15px;
              border-top-color: var(--preloader-color-3);
              --duration: var(--preloader-duration-3);
            }
          \`}</style>
          <div className="preloader-ring ring-outer" />
          <div className="preloader-ring ring-middle" />
          <div className="preloader-ring ring-inner" />
        </div>
      </div>
    );
  }
);

Preloader.displayName = 'Preloader';`;

function PreloaderPage() {
  const {t} = useTranslation();
    return (
        <MainLayout>
            <div className="px-6 py-16 w-full">
                <PageTitle>Preloader</PageTitle>
                <p className="text-white/60 max-w-xl">
                    {t('A customizable preloader with three concentric spinning rings and smooth animations.')}
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs title="Default" codeText={defaultCode}>
                        <div className="relative h-80 rounded-lg overflow-hidden">
                            <Preloader fullScreen={false} />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs title="Profile Loading State" codeText={inlineCode}>
                        <div className="relative h-80 w-full">
                          <div className="relative h-full w-full max-w-md mx-auto rounded-xl overflow-hidden p-6">
                            <div className="flex flex-col items-center justify-center h-full">
                              <div className="relative w-24 h-24 rounded-full mb-4 overflow-hidden">
                                <Preloader 
                                  size={80}
                                  color1="#a78bfa"
                                  color2="#c084fc"
                                  color3="#e879f9"
                                  fullScreen={false}
                                  className="absolute inset-0 m-auto"
                                />
                              </div>
                              <h3 className="text-white text-xl font-medium mb-2">Loading Profile</h3>
                              <p className="text-gray-400 text-sm text-center">Just a moment while we prepare your experience</p>
                            </div>
                          </div>
                        </div>
                    </PreviewTabs>

                    <PreviewTabs title="Custom Colors & Size" codeText={customCode}>
                        <div className="relative h-80 rounded-lg overflow-hidden">
                            <Preloader 
                              size={120} 
                              color1="#ff6b6b"
                              color2="#4ecdc4"
                              color3="#ffe66d"
                              duration1={1.5}
                              duration2={2.5}
                              duration3={1}
                              fullScreen={false}
                              className="rounded-lg"
                            />
                        </div>
                    </PreviewTabs>
                </div>

                <UsageSection
                    title="Component Code"
                    description={t('A highly customizable preloader with three spinning rings. The component supports full-screen mode and can be easily integrated into any part of your application.')}
                    code={componentCode}
                />

                <DocsSection
                    description={
                        <>
                            <p className="mb-4">
                                <strong>Preloader</strong> &mdash; {t('A versatile loading indicator featuring three concentric spinning rings with independent animation speeds. Perfect for full-page loading states or inline loading indicators.')}
                            </p>
                            <p className="mb-4">
                                {t('The component is highly customizable, allowing you to adjust colors, sizes, animation speeds, and more. It also provides callbacks for mount and unmount events.')}
                            </p>
                        </>
                    }
                    rows={rows}
                />
            </div>
        </MainLayout>
    );
}

export default PreloaderPage;
