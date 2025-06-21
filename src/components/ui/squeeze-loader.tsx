import { cn } from '@/lib/utils';
import { type HTMLAttributes, forwardRef } from 'react';

interface SqueezeLoaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Size of the loader in pixels
   * @default 60
   */
  size?: number;
  /**
   * Primary color of the loader
   * @default '#3498db'
   */
  color1?: string;
  /**
   * Secondary color of the loader
   * @default '#e74c3c'
   */
  color2?: string;
  /**
   * Animation duration in milliseconds
   * @default 3000
   */
  duration?: number;
  /**
   * Rotation speed in milliseconds (full rotation)
   * @default 10000
   */
  rotationSpeed?: number;
  /**
   * Additional class name for the container
   */
  className?: string;
}

/**
 * A loading spinner with a squeezing animation effect.
 */
export const SqueezeLoader = forwardRef<HTMLDivElement, SqueezeLoaderProps>(
  ({
    size = 60,
    color1 = '#3498db',
    color2 = '#e74c3c',
    duration = 3000,
    rotationSpeed = 10000,
    className,
    style,
    ...props
  }, ref) => {
    const loaderStyle = {
      '--squeeze-size': `${size}px`,
      '--squeeze-color-1': color1,
      '--squeeze-color-2': color2,
      '--squeeze-duration': `${duration}ms`,
      '--squeeze-rotation-speed': `${rotationSpeed}ms`,
      ...style,
    } as React.CSSProperties;

    return (
      <div 
        ref={ref}
        className={cn(
          'relative w-[var(--squeeze-size)] aspect-square',
          'animate-[spin_var(--squeeze-rotation-speed)_infinite_linear]',
          className
        )}
        style={loaderStyle}
        {...props}
      >
        <style>{`
          @keyframes squeeze {
            0% { inset: 0 33.33% 33.33% 0; }
            12.5% { inset: 0 33.33% 0 0; }
            25% { inset: 33.33% 33.33% 0 0; }
            37.5% { inset: 33.33% 0 0 0; }
            50% { inset: 33.33% 0 0 33.33%; }
            62.5% { inset: 0 0 0 33.33%; }
            75% { inset: 0 0 33.33% 33.33%; }
            87.5% { inset: 0 0 33.33% 0; }
            100% { inset: 0 33.33% 33.33% 0; }
          }
          .squeeze-element {
            content: "";
            position: absolute;
            background: var(--squeeze-color-1);
            animation: squeeze var(--squeeze-duration) infinite;
          }
          .squeeze-element:nth-child(2) {
            background: var(--squeeze-color-2);
            animation-delay: calc(var(--squeeze-duration) * -0.4167);
            border-radius: 50%;
          }
        `}</style>
        <div className="squeeze-element" />
        <div className="squeeze-element" />
      </div>
    );
  }
);

SqueezeLoader.displayName = 'SqueezeLoader';

export default SqueezeLoader;
