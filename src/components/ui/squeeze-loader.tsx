import { cn } from '@/lib/utils';
import { type HTMLAttributes, forwardRef } from 'react';

interface SqueezeLoaderProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    color1?: string;
    color2?: string;
    duration?: number;
    rotationSpeed?: number;
    className?: string;
}

export const SqueezeLoader = forwardRef<HTMLDivElement, SqueezeLoaderProps>(
    (
        {
            size = 60,
            color1 = '#3498db',
            color2 = '#e74c3c',
            duration = 1200,
            rotationSpeed = 2400,
            className,
            style,
            ...props
        },
        ref,
    ) => {
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
                    'relative flex aspect-square w-[var(--squeeze-size)] items-center justify-center',
                    className,
                )}
                style={loaderStyle}
                {...props}
            >
                <style>{`
                @keyframes squeeze-rect-scale {
                    0%, 100% { transform: scaleY(1); }
                    30% { transform: scaleY(0.65); }
                    60% { transform: scaleY(1.15); }
                }
                @keyframes squeeze-spin {
                    100% { transform: rotate(360deg); }
                }
                .squeeze-spin {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    animation: squeeze-spin var(--squeeze-rotation-speed, 1800ms) linear infinite;
                    will-change: transform;
                }
                .squeeze-rect {
                    display: inline-block;
                    vertical-align: middle;
                }
                .squeeze-rect.red {
                    width: calc(var(--squeeze-size) * 0.45);
                    height: calc(var(--squeeze-size) * 0.85);
                    background: var(--squeeze-color-2);
                    border-radius: calc(var(--squeeze-size) * 0.22);
                    margin-right: calc(var(--squeeze-size) * 0.10);
                    animation: squeeze-rect-scale var(--squeeze-duration, 1200ms) cubic-bezier(.6,0,.4,1) infinite;
                    transform-origin: center;
                }
                .squeeze-rect.blue {
                    width: calc(var(--squeeze-size) * 0.48);
                    height: calc(var(--squeeze-size) * 0.78);
                    background: var(--squeeze-color-1);
                    border-radius: calc(var(--squeeze-size) * 0.10);
                    transform: rotate(8deg);
                    animation: squeeze-rect-scale var(--squeeze-duration, 1200ms) cubic-bezier(.6,0,.4,1) infinite;
                    animation-delay: calc(var(--squeeze-duration, 1200ms) * -0.5);
                    transform-origin: center;
                }
                `}</style>
                <div className="squeeze-spin">
                    <div className="squeeze-rect red" />
                    <div className="squeeze-rect blue" />
                </div>
            </div>
        );
    },
);

SqueezeLoader.displayName = 'SqueezeLoader';

export default SqueezeLoader;
