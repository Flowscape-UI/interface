import { cn } from '@/lib/utils';
import { type HTMLAttributes, forwardRef, useEffect } from 'react';

interface PreloaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the preloader is visible
   * @default true
   */
  isVisible?: boolean;
  /**
   * Size of the loader in pixels
   * @default 80
   */
  size?: number;
  /**
   * Color of the outer ring
   * @default '#30C032'
   */
  color1?: string;
  /**
   * Color of the middle ring
   * @default '#8f6ed5'
   */
  color2?: string;
  /**
   * Color of the inner ring
   * @default '#2394F2'
   */
  color3?: string;
  /**
   * Animation duration in seconds for the outer ring
   * @default 2
   */
  duration1?: number;
  /**
   * Animation duration in seconds for the middle ring
   * @default 3
   */
  duration2?: number;
  /**
   * Animation duration in seconds for the inner ring
   * @default 1.5
   */
  duration3?: number;
  /**
   * Whether to show the preloader in full screen mode
   * @default true
   */
  fullScreen?: boolean;
  /**
   * Z-index of the preloader
   * @default 999999
   */
  zIndex?: number;
  /**
   * Callback when the preloader is mounted
   */
  onMount?: () => void;
  /**
   * Callback when the preloader is unmounted
   */
  onUnmount?: () => void;
}

/**
 * A customizable preloader with multiple spinning rings.
 */
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
      '--preloader-size': `${size}px`,
      '--preloader-color-1': color1,
      '--preloader-color-2': color2,
      '--preloader-color-3': color3,
      '--preloader-duration-1': `${duration1}s`,
      '--preloader-duration-2': `${duration2}s`,
      '--preloader-duration-3': `${duration3}s`,
      '--preloader-z-index': zIndex,
      ...style,
    } as React.CSSProperties;

    return (
      <div 
        ref={ref}
        className={cn(
          'flex items-center justify-center',
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
          <style>{`
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
          `}</style>
          <div className="preloader-ring ring-outer" />
          <div className="preloader-ring ring-middle" />
          <div className="preloader-ring ring-inner" />
        </div>
      </div>
    );
  }
);

Preloader.displayName = 'Preloader';
