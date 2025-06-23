import { useState, useRef, useEffect, useCallback } from 'react';
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
      className={cn('relative group overflow-hidden border border-dashed border-neutral-700', className)}
      style={{ width: size.width, height: size.height }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      <div 
        className="absolute bottom-0 right-0 p-2 cursor-se-resize bg-neutral-900/50 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity"
        onMouseDown={handleMouseDown}
      >
        <Maximize className="w-4 h-4 text-white" />
      </div>
      <div className='absolute top-2 left-2 p-2 bg-neutral-900/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity'>
        <p className='text-xs text-white font-mono'>{Math.round(size.width)} x {Math.round(size.height)}</p>
      </div>
    </div>
  );
}
