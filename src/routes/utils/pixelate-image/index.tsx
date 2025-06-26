import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import PageTitle from '@/components/ui/page-title';
import { PreviewTabs } from '@/components/preview-tabs';
import {
  PixelateImage,
  ControlsPanel,
} from '@/components/ui/pixelate-image';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { MainLayout } from '@/main-layout';
import { useTranslation } from '@/hooks/use-translation';

const defaultCode = `import { useState } from 'react';
import { PixelateImage, ControlsPanel } from "@/components/ui/pixelate-image";

function MyComponent() {
  const [pixelSize, setPixelSize] = useState(10);
  const [size, setSize] = useState(400);

  return (
    <div className="flex flex-col items-center gap-6">
      <PixelateImage
        src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
        alt="A laptop"
        pixelSize={pixelSize}
        width={size}
        height={size}
        backgroundColor="transparent"
      />
      <div className="w-full max-w-md">
        <ControlsPanel
          currentPixelSize={pixelSize}
          setCurrentPixelSize={setPixelSize}
          currentSize={size}
          setCurrentSize={setSize}
        />
      </div>
    </div>
  )
}`;

export const Route = createFileRoute('/utils/pixelate-image/')({
  component: PixelateImagePage,
});

const pixelateImageRows: PropsTableRow[] = [
  { prop: 'src', type: 'string', required: true, description: 'Image source URL.' },
  { prop: 'width', type: 'number', required: false, defaultValue: '400', description: 'Width of the canvas.' },
  { prop: 'height', type: 'number', required: false, defaultValue: '300', description: 'Height of the canvas.' },
  { prop: 'pixelSize', type: 'number', required: false, defaultValue: '10', description: "The size of each 'pixel' block." },
  { prop: 'backgroundColor', type: 'string', required: false, defaultValue: "'transparent'", description: 'Background color of the canvas.' },
  { prop: 'className', type: 'string', required: false, description: 'Additional classes for the canvas element.' },
];

function PixelateImagePage() {
  const [pixelSize, setPixelSize] = useState(10);
  const [size, setSize] = useState(400);
  const {t} = useTranslation();

  return (
    <MainLayout>
      <div className="w-full px-6 py-16">
        <PageTitle>Pixelate Image</PageTitle>
        <p className="max-w-xl text-white/60">
          {t(`A component to render a pixelated version of an image using HTML Canvas. Customize the
          pixel size, dimensions, and background with interactive controls.`)}
        </p>

        <div className="mt-8 flex flex-col gap-10">
          <PreviewTabs title="Interactive Example" codeText={defaultCode}>
            <div className="flex flex-col items-center justify-center gap-6 rounded-lg p-8">
              <div className="h-96 w-full overflow-auto flex items-center justify-center rounded-lg bg-black/20 border border-white/10">
                <PixelateImage
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
                  alt="A laptop"
                  pixelSize={pixelSize}
                  width={size}
                  height={size}
                  backgroundColor="transparent"
                />
              </div>
              <div className="w-full max-w-md">
                <ControlsPanel
                  currentPixelSize={pixelSize}
                  setCurrentPixelSize={setPixelSize}
                  currentSize={size}
                  setCurrentSize={setSize}
                />
              </div>
            </div>
          </PreviewTabs>

          <DocsSection
            rows={pixelateImageRows}
            description={
              <>
                <h2 className="mb-4 text-2xl font-bold">PixelateImage</h2>
                <p className="mb-4">
                  <strong>Pixelate Image</strong>{' '}{t(`is a fun visual component that renders an image
                  with a pixelated effect. It's perfect for placeholders, loading effects, or just
                  for stylistic purposes. Use it with the`)}{' '}
                  <code>ControlsPanel</code>{' '}{t('component for real-time adjustments.')}
                </p>
              </>
            } 
          />
        </div>
      </div>
    </MainLayout>
  );
}