import { cn } from '@/lib/utils';
import { type HTMLAttributes, forwardRef } from 'react';

interface NeonLoaderProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    color?: string;
    duration?: number;
    dotSize?: number;
    strokeWidth?: number;
    backgroundColor?: string;
}

export const NeonLoader = forwardRef<HTMLDivElement, NeonLoaderProps>(
    (
        {
            size = 200,
            color = '#00fff9',
            duration = 2,
            dotSize = 20,
            strokeWidth = 20,
            backgroundColor = '#000000',
            className,
            style,
            ...props
        },
        ref,
    ) => {
        const loaderStyle = {
            '--neon-size': `${size}px`,
            '--neon-color': color,
            '--neon-duration': `${duration}s`,
            '--neon-dot-size': `${dotSize}px`,
            '--neon-stroke-width': `${strokeWidth}px`,
            '--neon-background-color': backgroundColor,
            ...style,
        } as React.CSSProperties;

        return (
            <div
                ref={ref}
                className={cn(
                    'relative h-[calc(var(--neon-size)/2)] w-[var(--neon-size)]',
                    'flex items-center justify-center',
                    className,
                )}
                style={loaderStyle}
                {...props}
            >
                <style>{`
          @keyframes neon-rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .neon-loader {
            position: absolute;
            width: var(--neon-size);
            height: var(--neon-size);
            border-radius: 50%;
            animation: neon-rotate var(--neon-duration) linear infinite;
          }
          
          .neon-loader:before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 50%;
            height: 100%;
            background: linear-gradient(to top, transparent, rgba(var(--neon-color-rgb), 0.4));
            background-size: calc(var(--neon-size) * 0.5) calc(var(--neon-size) * 0.9);
            background-repeat: no-repeat;
            border-top-left-radius: calc(var(--neon-size) * 0.5);
            border-bottom-left-radius: calc(var(--neon-size) * 0.5);
          }
          
          .neon-loader.delayed {
            animation-delay: calc(-1 * var(--neon-duration) / 2);
            filter: hue-rotate(290deg);
          }
          
          .neon-dot {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: var(--neon-dot-size);
            height: var(--neon-dot-size);
            background: var(--neon-color);
            border-radius: 50%;
            z-index: 100;
            box-shadow: 0 0 10px var(--neon-color),
                        0 0 20px var(--neon-color),
                        0 0 30px var(--neon-color),
                        0 0 40px var(--neon-color),
                        0 0 50px var(--neon-color);
          }
          
          .neon-inner {
            position: absolute;
            inset: var(--neon-stroke-width);
            background: var(--neon-background-color);
            border-radius: 50%;
            z-index: 1;
          }
        `}</style>

                <div
                    className="neon-loader"
                    style={
                        {
                            '--neon-color-rgb': color.startsWith('#')
                                ? `${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}`
                                : '0, 255, 249', // Default teal color
                        } as React.CSSProperties
                    }
                >
                    <span className="neon-inner"></span>
                    <i className="neon-dot"></i>
                </div>

                <div
                    className="neon-loader delayed"
                    style={
                        {
                            '--neon-color-rgb': color.startsWith('#')
                                ? `${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}`
                                : '0, 255, 249', // Default teal color
                        } as React.CSSProperties
                    }
                >
                    <span className="neon-inner"></span>
                    <i className="neon-dot"></i>
                </div>
            </div>
        );
    },
);

NeonLoader.displayName = 'NeonLoader';
