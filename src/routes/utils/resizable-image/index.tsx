import { PreviewTabs } from '@/components/preview-tabs';
import PageTitle from '@/components/ui/page-title';
import { MainLayout } from '@/main-layout';
import { createFileRoute } from '@tanstack/react-router';
import { ResizableImage } from '@/components/ui/resizable-image';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { useTranslation } from '@/hooks/use-translation';

export const Route = createFileRoute('/utils/resizable-image/')({
  component: ResizableImagePage,
});

const defaultCode = 'import { ResizableImage } from "@/components/ui/resizable-image";\n\n<ResizableImage src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853" alt="A cool shoe" />';

const freeAspectRatioCode = 'import { ResizableImage } from "@/components/ui/resizable-image";\n\n<ResizableImage\n  src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853"\n  alt="A doctor with a stethoscope"\n  aspectRatio="free"\n  initialSize={{ width: 400, height: 250 }}\n/>';

const withLimitsCode = 'import { ResizableImage } from "@/components/ui/resizable-image";\n\n<ResizableImage\n  src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853"\n  alt="A laptop on a desk"\n  minSize={{ width: 200, height: 150 }}\n  maxSize={{ width: 600, height: 450 }}\n/>';

const fullComponentCode = `import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Maximize } from 'lucide-react';

interface ResizableImageProps {
  src: string;
  alt: string;
  initialSize?: { width: number; height: number };
  minSize?: { width: number; height: number };
  maxSize?: { width: number; height: number };
  className?: string;
  aspectRatio?: 'preserve' | 'free';
  onResize?: (size: { width: number; height: number }) => void;
}

export function ResizableImage({
  src,
  alt,
  initialSize = { width: 300, height: 200 },
  minSize = { width: 100, height: 75 },
  maxSize = { width: 800, height: 600 },
  className,
  aspectRatio = 'preserve',
  onResize,
}: ResizableImageProps) {
  const [size, setSize] = useState(initialSize);
  const containerRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);
  const initialAspectRatio = useRef(initialSize.width / initialSize.height);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isResizing.current = true;
  };

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
    if (onResize) {
        onResize(size);
    }
  }, [onResize, size]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    let newWidth = e.clientX - rect.left;
    let newHeight = e.clientY - rect.top;

    // Clamp size within min/max bounds
    newWidth = Math.max(minSize.width, Math.min(newWidth, maxSize.width));
    newHeight = Math.max(minSize.height, Math.min(newHeight, maxSize.height));

    if (aspectRatio === 'preserve') {
        newWidth = Math.min(newWidth, newHeight * initialAspectRatio.current);
        newHeight = newWidth / initialAspectRatio.current;
    }

    setSize({ width: newWidth, height: newHeight });
  }, [minSize, maxSize, aspectRatio, initialAspectRatio]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className={cn('relative group overflow-hidden border border-dashed', className)}
      style={{ width: size.width, height: size.height }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      <div 
        className="absolute bottom-0 right-0 p-2 cursor-se-resize rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity"
        onMouseDown={handleMouseDown}
      >
        <Maximize className="w-4 h-4 text-white" />
      </div>
      <div className='absolute top-2 left-2 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity'>
        <p className='text-xs text-white font-mono'>{Math.round(size.width)} x {Math.round(size.height)}</p>
      </div>
    </div>
  );
}`;

const rows: PropsTableRow[] = [
    { prop: "src", type: "string", required: true, description: "Image source URL." },
    { prop: "alt", type: "string", required: true, description: "Alternative text for the image." },
    { prop: "initialSize", type: "{ width: number; height: number }", required: false, defaultValue: "{ width: 300, height: 200 }", description: "Initial dimensions of the image container." },
    { prop: "minSize", type: "{ width: number; height: number }", required: false, defaultValue: "{ width: 100, height: 75 }", description: "Minimum dimensions for resizing." },
    { prop: "maxSize", type: "{ width: number; height: number }", required: false, defaultValue: "{ width: 800, height: 600 }", description: "Maximum dimensions for resizing." },
    { prop: "aspectRatio", type: "'preserve' | 'free'", required: false, defaultValue: "'preserve'", description: "Determines if the aspect ratio is maintained during resize." },
    { prop: "onResize", type: "(size: { width: number; height: number }) => void", required: false, description: "Callback function fired when resizing is complete." },
    { prop: "className", type: "string", required: false, description: "Additional classes for the container." },
];

function ResizableImagePage() {
  const {t} = useTranslation();
  return (
    <MainLayout>
      <div className="px-6 py-16 w-full">
        <PageTitle>Resizable Image</PageTitle>
        <p className="text-white/60 max-w-xl">
          {t(`An interactive component that allows users to resize an image by dragging a handle. It's highly customizable and easy to integrate.`)}
        </p>

        <div className="mt-8 flex flex-col gap-10">
          <PreviewTabs title="Default" codeText={defaultCode}>
            <div className="flex justify-center items-center p-8 rounded-lg h-[400px]">
              <ResizableImage src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853" alt="A cool shoe" />
            </div>
          </PreviewTabs>

          <PreviewTabs title="Free Aspect Ratio" codeText={freeAspectRatioCode}>
            <div className="flex justify-center items-center p-8 rounded-lg h-[400px]">
              <ResizableImage
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
                alt="A doctor with a stethoscope"
                aspectRatio="free"
                initialSize={{ width: 400, height: 250 }}
              />
            </div>
          </PreviewTabs>

          <PreviewTabs title="With Size Limits" codeText={withLimitsCode}>
            <div className="flex justify-center items-center p-8 rounded-lg h-[600px]">
              <ResizableImage
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
                alt="A laptop on a desk"
                minSize={{ width: 200, height: 150 }}
                maxSize={{ width: 600, height: 450 }}
              />
            </div>
          </PreviewTabs>
        </div>

        <UsageSection
          title="Component Code"
          description={`${t("The complete source code for the")} ResizableImage ${t('component')}.`}
          code={fullComponentCode}
        />

        <DocsSection
          description={
            <>
              <p className="mb-4">
                <strong>Resizable Image</strong> {t('provides a user-friendly way to dynamically resize images within a web page. It features a clean handle for resizing and displays the current dimensions in real-time.')}
              </p>
            </>
          }
          rows={rows}
        />
      </div>
    </MainLayout>
  );
}
