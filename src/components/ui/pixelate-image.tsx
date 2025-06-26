/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { InputSelectNumber } from './input-select-number';
import { Label } from './label';


export interface ControlsPanelProps {
  currentPixelSize: number;
  setCurrentPixelSize: (value: number) => void;
  currentSize: number;
  setCurrentSize: (value: number) => void;
}

export function ControlsPanel({
  currentPixelSize,
  setCurrentPixelSize,
  currentSize,
  setCurrentSize,
}: ControlsPanelProps) {
  return (
    <div className="w-full rounded-b-lg border-t border-white/20 bg-black/50 backdrop-blur-sm">
      <div className="mx-auto grid w-full max-w-sm grid-cols-2 gap-4 p-4">
        <div className="space-y-1">
          <Label htmlFor="pixelSize" className="text-xs text-white/80">
            Pixel Size
          </Label>
          <InputSelectNumber
            id="pixelSize"
            value={currentPixelSize}
            fieldOnChange={(val) => setCurrentPixelSize(Number(val))}
            min={1}
            max={50}
            step={1}
            precision={0}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="imgSize" className="text-xs text-white/80">
            Size
          </Label>
          <InputSelectNumber
            id="imgSize"
            value={currentSize}
            fieldOnChange={(val) => setCurrentSize(Number(val))}
            min={100}
            max={1000}
            step={10}
            precision={0}
          />
        </div>
      </div>
    </div>
  );
}

export interface PixelateImageProps {
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
      const pz = Math.max(1, pixelSize);
      const w = width / pz;
      const h = height / pz;

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = w;
      tempCanvas.height = h;
      const tempCtx = tempCanvas.getContext('2d');

      if (!tempCtx) return;

      // Draw image on temp canvas
      tempCtx.drawImage(img, 0, 0, w, h);

      // Disable smoothing on main canvas
      ctx.imageSmoothingEnabled = false;
      (ctx as any).mozImageSmoothingEnabled = false;
      (ctx as any).webkitImageSmoothingEnabled = false;
      (ctx as any).msImageSmoothingEnabled = false;

      // Fill background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Draw temp canvas to main canvas, scaling it up
      ctx.drawImage(tempCanvas, 0, 0, width, height);
    };

    img.onerror = () => {
      console.error(`Failed to load image for pixelation: ${src}`);
    };
  }, [src, width, height, pixelSize, backgroundColor]);

  return (
    <div className="relative inline-block">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={cn('rounded-lg', className)}
        aria-label={alt}
        role="img"
      />
    </div>
  );
}