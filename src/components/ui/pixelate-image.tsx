import { useRef, useEffect } from 'react';
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
      const pz = Math.max(1, pixelSize);
      const w = width / pz;
      const h = height / pz;

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = w;
      tempCanvas.height = h;
      const tempCtx = tempCanvas.getContext('2d');

      if (!tempCtx) return;

      tempCtx.drawImage(img, 0, 0, w, h);

      ctx.imageSmoothingEnabled = false;
      (ctx as any).mozImageSmoothingEnabled = false;
      (ctx as any).webkitImageSmoothingEnabled = false;
      (ctx as any).msImageSmoothingEnabled = false;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      ctx.drawImage(tempCanvas, 0, 0, width, height);
    };

    img.onerror = () => {
      console.error(`Failed to load image for pixelation: ${src}`);
    };
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
}
