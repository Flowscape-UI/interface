import React, { useState, useEffect, forwardRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useControllableState } from '../../hooks/use-controllable-state';

export interface HoverCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /**
     * Optional title of the card, used if children are not provided.
     */
    title?: string;
    /**
     * Optional description text, used if children are not provided.
     */
    description?: string;
    /**
     * The URL of the image to display.
     */
    imageUrl: string;
    /**
     * Alternative text for the image.
     */
    imageAlt: string;
    /**
     * The text for the call-to-action button, used if children are not provided.
     * @default "Read More"
     */
    ctaText?: string;
    /**
     * The URL the CTA button should link to, used if children are not provided.
     * @default "#"
     */
    ctaHref?: string;
    /**
     * The background color of the card content.
     * @default "rgba(30, 41, 59, 0.95)"
     */
    backgroundColor?: string;
    /**
     * Background color opacity (0-1).
     * @default 0.95
     */
    backgroundOpacity?: number;
    /**
     * The color of the title text.
     * @default "#f8fafc"
     */
    titleColor?: string;
    /**
     * The color of the description text.
     * @default "#e2e8f0"
     */
    descriptionColor?: string;
    /**
     * The background color of the CTA button.
     * @default "#38bdf8"
     */
    buttonColor?: string;
    /**
     * The text color of the CTA button.
     * @default "#ffffff"
     */
    buttonTextColor?: string;
    /**
     * The hover state background color of the CTA button.
     * @default "#0ea5e9"
     */
    buttonHoverColor?: string;
    /**
     * The transition duration in seconds.
     * @default 0.4
     */
    transitionDuration?: number;
    /**
     * Whether to add a subtle overlay gradient.
     * @default true
     */
    showOverlayGradient?: boolean;
    /**
     * Custom class name for the card container.
     */
    containerClassName?: string;
    /**
     * Custom class name for the content wrapper.
     */
    contentClassName?: string;
    /**
     * Custom class name for the image.
     */
    imageClassName?: string;
    /**
     * Custom class name for the button.
     */
    buttonClassName?: string;
    /**
     * Custom content to be rendered inside the card. Overrides title, description, and cta button.
     */
    children?: React.ReactNode;
    /**
     * Controlled open state.
     */
    open?: boolean;
    /**
     * Event handler for when the open state changes.
     */
    onOpenChange?: (open: boolean) => void;
}

export const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(
    (
        {
            // Base props
            imageUrl,
            imageAlt,
            children,
            // Uncontrolled content props (if children is not provided)
            title,
            description,
            ctaText = 'Read More',
            ctaHref = '#',
            // Styling props
            backgroundColor = 'rgba(30, 41, 59, 0.95)',
            backgroundOpacity = 0.95,
            titleColor = '#f8fafc',
            descriptionColor = '#e2e8f0',
            buttonColor = '#38bdf8',
            buttonTextColor = '#ffffff',
            buttonHoverColor = '#0ea5e9',
            transitionDuration = 0.4,
            showOverlayGradient = true,
            // ClassName props
            containerClassName,
            contentClassName,
            imageClassName,
            buttonClassName,
            // Controlled state props
            open: openProp,
            onOpenChange,
            ...props
        },
        ref,
    ) => {
        const [isMobile, setIsMobile] = useState(false);

        useEffect(() => {
            const checkIsMobile = () => {
                setIsMobile(window.matchMedia('(pointer: coarse)').matches);
            };
            checkIsMobile();
            window.addEventListener('resize', checkIsMobile);
            return () => window.removeEventListener('resize', checkIsMobile);
        }, []);

        const [isOpen, setIsOpen] = useControllableState({
            prop: openProp,
            onChange: onOpenChange,
            defaultProp: false,
        });

        const handleOpen = useCallback(() => setIsOpen(true), [setIsOpen]);
        const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);
        const handleToggle = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);

        const getBackgroundColor = useCallback(() => {
            if (backgroundColor.startsWith('rgba')) return backgroundColor;
            if (backgroundColor.startsWith('#')) {
                const hex = backgroundColor.replace('#', '');
                const r = parseInt(hex.substring(0, 2), 16);
                const g = parseInt(hex.substring(2, 4), 16);
                const b = parseInt(hex.substring(4, 6), 16);
                return `rgba(${r}, ${g}, ${b}, ${backgroundOpacity})`;
            }
            return backgroundColor;
        }, [backgroundColor, backgroundOpacity]);

        const bgColor = getBackgroundColor();
        const transitionStyle = {
            '--transition-duration': `${transitionDuration}s`,
            '--title-color': titleColor,
            '--description-color': descriptionColor,
            '--button-color': buttonColor,
            '--button-text-color': buttonTextColor,
            '--button-hover-color': buttonHoverColor,
        } as React.CSSProperties;

        const containerProps = {
            ref,
            ...props,
            'data-state': isOpen ? 'open' : 'closed',
            className: cn(
                'relative w-full max-w-[320px] h-[420px]',
                'group transform-gpu will-change-transform',
                'transition-all duration-300 data-[state=open]:shadow-2xl data-[state=open]:scale-[1.02]',
                containerClassName,
            ),
            style: { ...props.style, ...transitionStyle },
            onMouseEnter: !isMobile ? handleOpen : undefined,
            onMouseLeave: !isMobile ? handleClose : undefined,
            onClick: isMobile ? handleToggle : props.onClick,
        };

        return (
            <div {...containerProps}>
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                    {/* Image with overlay */}
                    <div
                        className={cn(
                            'absolute inset-0 h-full w-full transition-transform duration-500',
                            'group-data-[state=open]:translate-x-[105%]',
                            'transform-gpu overflow-hidden rounded-xl will-change-transform',
                            imageClassName,
                        )}
                    >
                        <img
                            src={imageUrl}
                            alt={imageAlt}
                            className={cn(
                                'h-full w-full object-cover',
                                'transition-transform duration-700 group-data-[state=open]:scale-110',
                                'transform-gpu will-change-transform',
                            )}
                            loading="lazy"
                        />
                        {showOverlayGradient && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500 group-data-[state=open]:opacity-100" />
                        )}
                    </div>

                    {/* Content */}
                    <div
                        className={cn(
                            'absolute inset-0 transition-transform duration-500 ease-in-out',
                            '-translate-x-[101%] transform group-data-[state=open]:translate-x-0',
                            'transform-gpu will-change-transform',
                        )}
                    >
                        <div
                            className={cn(
                                'flex h-full w-full flex-col justify-between p-6',
                                'rounded-xl backdrop-blur-sm',
                                contentClassName,
                            )}
                            style={{ backgroundColor: bgColor }}
                        >
                            {children || (
                                <>
                                    <div>
                                        <h2
                                            className={cn(
                                                'mb-3 text-2xl font-bold',
                                                'text-[var(--title-color)] transition-colors',
                                            )}
                                        >
                                            {title}
                                        </h2>
                                        <p
                                            className={cn(
                                                'text-base',
                                                'text-[var(--description-color)] transition-colors',
                                            )}
                                        >
                                            {description}
                                        </p>
                                    </div>
                                    <a
                                        href={ctaHref}
                                        className={cn(
                                            'inline-block rounded-lg px-6 py-3 text-center font-semibold',
                                            'transition-colors duration-300',
                                            'bg-[var(--button-color)] text-[var(--button-text-color)]',
                                            'hover:bg-[var(--button-hover-color)]',
                                            'focus:ring-2 focus:ring-[var(--button-hover-color)] focus:ring-offset-2 focus:outline-none',
                                            buttonClassName,
                                        )}
                                    >
                                        {ctaText}
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    },
);

HoverCard.displayName = 'HoverCard';
