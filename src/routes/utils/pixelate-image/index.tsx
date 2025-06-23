import { PreviewTabs } from '@/components/preview-tabs';
import PageTitle from '@/components/ui/page-title';
import { MainLayout } from '@/main-layout';
import { createFileRoute } from '@tanstack/react-router';
import { PixelateImage } from '@/components/ui/pixelate-image';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';

const defaultCode = 'import { PixelateImage } from "@/components/ui/pixelate-image";\n\n<PixelateImage src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8" alt="A laptop" />';

const customPixelSizeCode = 'import { PixelateImage } from "@/components/ui/pixelate-image";\n\n<PixelateImage\n  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"\n  alt="A laptop"\n  pixelSize={20}\n/>';

const customBackgroundCode = 'import { PixelateImage } from "@/components/ui/pixelate-image";\n\n<PixelateImage\n  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"\n  alt="A laptop"\n  pixelSize={5}\n/>';

export const Route = createFileRoute('/utils/pixelate-image/')({
  component: PixelateImagePage,
});

const rows: PropsTableRow[] = [
    { prop: "src", type: "string", required: true, description: "Image source URL." },
    { prop: "width", type: "number", required: false, defaultValue: "400", description: "Width of the canvas." },
    { prop: "height", type: "number", required: false, defaultValue: "300", description: "Height of the canvas." },
    { prop: "pixelSize", type: "number", required: false, defaultValue: "10", description: "The size of each 'pixel' block." },
    { prop: "backgroundColor", type: "string", required: false, defaultValue: "'transparent'", description: "Background color of the canvas." },
    { prop: "className", type: "string", required: false, description: "Additional classes for the canvas element." },
];

function PixelateImagePage() {
  return (
    <MainLayout>
      <div className="px-6 py-16 w-full">
        <PageTitle>Pixelate Image</PageTitle>
        <p className="text-white/60 max-w-xl">
          A component to render a pixelated version of an image using HTML Canvas. Customize the pixel size, dimensions, and background.
        </p>

        <div className="mt-8 flex flex-col gap-10">
          <PreviewTabs title="Default" codeText={defaultCode}>
            <div className="flex justify-center items-center p-8 rounded-lg">
              <PixelateImage src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8" alt="A laptop" />
            </div>
          </PreviewTabs>

          <PreviewTabs title="Larger Pixels" codeText={customPixelSizeCode}>
            <div className="flex justify-center items-center p-8 rounded-lg">
              <PixelateImage
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
                alt="A laptop"
                pixelSize={20}
              />
            </div>
          </PreviewTabs>

          <PreviewTabs title="Small Pixels & Custom Background" codeText={customBackgroundCode}>
            <div className="flex justify-center items-center p-8 rounded-lg">
              <PixelateImage
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
                alt="A laptop"
                pixelSize={5}
              />
            </div>
          </PreviewTabs>
        </div>

        <UsageSection
          title="Component Code"
          description="The complete source code for the PixelateImage component."
          code={fullComponentCode}
        />

        <DocsSection
          description={
            <>
              <p className="mb-4">
                <strong>Pixelate Image</strong> is a fun visual component that renders an image with a pixelated effect. It's perfect for placeholders, loading effects, or just for stylistic purposes.
              </p>
            </>
          }
          rows={rows}
        />
      </div>
    </MainLayout>
  );
}

const fullComponentCode = `import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PixelateImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  pixelSize?: number;
  backgroundColor?: string;
  className?: string;
}

export function PixelateImage({
  src,
  alt,
  width = 400,
  height = 300,
  pixelSize = 10,
  backgroundColor = 'transparent',
  className,
}: PixelateImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;

    img.onload = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      const hRatio = width / img.width;
      const vRatio = height / img.height;
      const ratio = Math.min(hRatio, vRatio);
      const centerShift_x = (width - img.width * ratio) / 2;
      const centerShift_y = (height - img.height * ratio) / 2;

      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );

      const imageData = ctx.getImageData(0, 0, width, height).data;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {
          const index = (x + y * width) * 4;
          const r = imageData[index];
          const g = imageData[index + 1];
          const b = imageData[index + 2];
          const a = imageData[index + 3];

          ctx.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + (a / 255) + ')';
          ctx.fillRect(x, y, pixelSize, pixelSize);
        }
      }
    };

    img.onerror = () => {
        console.error('Failed to load image for pixelation.');
    }

  }, [src, width, height, pixelSize, backgroundColor]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={cn('rounded-lg', className)}
      aria-label={alt}
      role="img"
    />
  );
}`
