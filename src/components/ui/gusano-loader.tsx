import { cn } from '@/lib/utils';
import { type HTMLAttributes, forwardRef, useMemo } from 'react';

interface GusanoLoaderProps extends HTMLAttributes<HTMLDivElement> {
    boxSize?: number;
    gutter?: number;
    duration?: number;
    color?: string;
    animateColor?: boolean;
    colors?: string[];
}

export const GusanoLoader = forwardRef<HTMLDivElement, GusanoLoaderProps>(
    (
        {
            boxSize = 15,
            gutter = 5,
            duration = 7,
            color = '#1abc9c',
            animateColor = true,
            colors = [
                '#9b59b6',
                '#2980b9',
                '#c0392b',
                '#16a085',
                '#f39c12',
                '#27ae60',
                '#419fdd',
                '#f1c40f',
                '#1abc9c',
            ],
            className,
            style,
            ...props
        },
        ref,
    ) => {
        const x1 = boxSize + gutter;
        const x2 = x1 * 2;

        const positions = useMemo(
            () => [
                `0px, ${x1}px`,
                `0px, ${x2}px`,
                `${x1}px, ${x2}px`,
                `${x1}px, ${x1}px`,
                `${x2}px, ${x1}px`,
                `${x2}px, 0px`,
                `${x1}px, 0px`,
            ],
            [x1, x2],
        );

        const animationFrames = useMemo(() => {
            const frames = [
                `0px, ${x1}px`,
                '0px, 0px',
                `${x1}px, 0px`,
                `${x2}px, 0px`,
                `${x2}px, ${x1}px`,
                `${x1}px, ${x1}px`,
                `${x1}px, ${x2}px`,
                `0px, ${x2}px`,
                `0px, ${x1}px`,
            ];

            return frames;
        }, [x1, x2]);

        const colorKeyframes = useMemo(() => {
            if (!animateColor) return '';

            const totalColors = colors.length;
            const percentageStep = 100 / (totalColors - 1);

            return colors
                .map((color, index) => {
                    const percent = Math.round(index * percentageStep);
                    return `${percent}% { background-color: ${color}; }`;
                })
                .join('\n');
        }, [animateColor, colors]);

        const containerStyle = {
            '--box-size': `${boxSize}px`,
            '--gutter': `${gutter}px`,
            '--x1': `${x1}px`,
            '--x2': `${x2}px`,
            '--duration': `${duration}s`,
            '--color': color,
            width: `calc(var(--box-size) * 3 + var(--gutter) * 2)`,
            height: `calc(var(--box-size) * 3 + var(--gutter) * 2)`,
            ...style,
        } as React.CSSProperties;

        return (
            <div ref={ref} className={cn('relative', className)} style={containerStyle} {...props}>
                <style>{`
          .gusano-loader {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotateZ(45deg);
            width: 100%;
            height: 100%;
          }
          
          .gusano-box {
            position: absolute;
            top: 0;
            left: 0;
            display: inline-block;
            width: var(--box-size);
            height: var(--box-size);
            border-radius: 3px;
            animation-duration: var(--duration);
            animation-iteration-count: infinite;
            animation-fill-mode: forwards;
            animation-direction: normal;
            animation-timing-function: cubic-bezier(0.75, 0, 0, 0.75);
          }
          
          .gusano-box:before {
            content: "";
            display: inline-block;
            width: 100%;
            height: 100%;
            background-color: var(--color);
            border-radius: 3px;
            ${
                animateColor
                    ? `
              animation-name: gusanoColor;
              animation-duration: ${duration * 4}s;
              animation-iteration-count: infinite;
              animation-direction: normal;
              animation-timing-function: ease-in-out;
            `
                    : ''
            }
          }
          
          ${positions
              .map((pos, i) => {
                  const delay = (duration / positions.length) * (positions.length - 1 - i);
                  return `
              .gusano-box:nth-child(${i + 1}) {
                animation-delay: -${delay}s;
                transform: translate(${pos});
                animation-name: gusanoPos${i + 1};
              }
              
              @keyframes gusanoPos${i + 1} {
                ${animationFrames
                    .map((frame, j) => {
                        const percent = Math.round((j / (animationFrames.length - 1)) * 100);
                        const percent2 = percent + 5;
                        return `
                    ${percent}% { transform: translate(${frame}); }
                    ${percent2}% { transform: translate(${frame}); }
                  `;
                    })
                    .join('')}
              }
            `;
              })
              .join('')}
          
          ${
              colorKeyframes
                  ? `
            @keyframes gusanoColor {
              ${colorKeyframes}
            }
          `
                  : ''
          }
        `}</style>

                <div className="gusano-loader">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="gusano-box" />
                    ))}
                </div>
            </div>
        );
    },
);

GusanoLoader.displayName = 'GusanoLoader';
