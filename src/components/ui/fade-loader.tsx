import { cn } from '@/lib/utils';
import { type HTMLAttributes, forwardRef, useMemo } from 'react';

interface FadeLoaderProps extends HTMLAttributes<HTMLDivElement> {
    size?: string | number;
    ringWidth?: string | number;
    color?: string;
    duration?: number;
    shadow?: boolean;
    containerClassName?: string;
    className?: string;
}
export const FadeLoader = forwardRef<HTMLDivElement, FadeLoaderProps>(
    (
        {
            size = '146px',
            ringWidth = '17px',
            color = '#FFFFFF',
            duration = 1.8,
            shadow = true,
            className = '',
            containerClassName = '',
            style,
            ...props
        },
        ref,
    ) => {
        const sizeValue = typeof size === 'number' ? `${size}px` : size;
        const ringWidthValue = typeof ringWidth === 'number' ? `${ringWidth}px` : ringWidth;

        // Generate unique IDs for the animations to prevent conflicts
        const animationIdA = useMemo(
            () => `fadePulseA_${Math.random().toString(36).substr(2, 9)}`,
            [],
        );
        const animationIdB = useMemo(
            () => `fadePulseB_${Math.random().toString(36).substr(2, 9)}`,
            [],
        );

        // Parse color to ensure it's valid
        const parsedColor = useMemo(() => {
            try {
                // If it's a named color or rgb/rgba, use as is
                if (!color.startsWith('#')) return color;

                // Handle hex colors
                let hex = color.replace('#', '');

                // Convert 3-digit hex to 6-digit
                if (hex.length === 3) {
                    hex = hex
                        .split('')
                        .map((c) => c + c)
                        .join('');
                }

                // Convert to rgb
                const r = parseInt(hex.substring(0, 2), 16);
                const g = parseInt(hex.substring(2, 4), 16);
                const b = parseInt(hex.substring(4, 6), 16);

                return `rgb(${r}, ${g}, ${b})`;
            } catch {
                console.warn('Invalid color provided to FadeLoader, using default white');
                return '#FFFFFF';
            }
        }, [color]);

        // Generate CSS for the loader
        const loaderStyles = useMemo(() => {
            const styles: React.CSSProperties & {
                '--loader-size'?: string;
                '--ring-width'?: string;
                '--loader-color'?: string;
                '--animation-duration'?: string;
                '--shadow-color'?: string;
            } = {
                '--loader-size': sizeValue,
                '--ring-width': ringWidthValue,
                '--loader-color': parsedColor,
                '--animation-duration': `${duration}s`,
            };

            if (shadow) {
                styles['--shadow-color'] = parsedColor
                    .replace(')', ', 0.75)')
                    .replace('rgb', 'rgba');
            }

            return styles;
        }, [sizeValue, ringWidthValue, parsedColor, duration, shadow]);

        return (
            <div
                ref={ref}
                className={cn('relative flex items-center justify-center', containerClassName)}
                style={{
                    width: '100%',
                    maxWidth: sizeValue,
                    margin: `calc(${sizeValue} / 2) auto`,
                    ...style,
                }}
                {...props}
            >
                <style>{`
          @keyframes ${animationIdA} {
            0% { 
              box-shadow: inset 0 0 0 var(--ring-width) var(--loader-color);
              opacity: 1;
            }
            50%, 100% { 
              box-shadow: inset 0 0 0 0 var(--loader-color);
              opacity: 0;
            }
          }
          
          @keyframes ${animationIdB} {
            0%, 50% { 
              box-shadow: 0 0 0 0 var(--loader-color);
              opacity: 0;
            }
            100% { 
              box-shadow: 0 0 0 var(--ring-width) var(--loader-color);
              opacity: 1;
            }
          }
          
          .fade-loader {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 100%;
          }
          
          .fade-loader:before,
          .fade-loader:after {
            content: "";
            position: absolute;
            border-radius: 50%;
            animation-duration: var(--animation-duration);
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
            ${shadow ? 'filter: drop-shadow(0 0 calc(var(--ring-width) / 2.25) var(--shadow-color));' : ''}
          }
          
          .fade-loader:before {
            width: 100%;
            padding-bottom: 100%;
            box-shadow: inset 0 0 0 var(--ring-width) var(--loader-color);
            animation-name: ${animationIdA};
            top: 0;
            left: 0;
            transform: translateZ(0);
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          
          .fade-loader:after {
            width: calc(100% - var(--ring-width) * 2);
            padding-bottom: calc(100% - var(--ring-width) * 2);
            box-shadow: 0 0 0 0 var(--loader-color);
            animation-name: ${animationIdB};
            top: var(--ring-width);
            left: var(--ring-width);
            transform: translateZ(0);
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
        `}</style>
                <div className={cn('fade-loader', className)} style={loaderStyles} />
            </div>
        );
    },
);

FadeLoader.displayName = 'FadeLoader';
