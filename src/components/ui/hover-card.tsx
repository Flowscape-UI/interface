import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface HoverCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The title of the card
   */
  title: string;
  /**
   * The description text
   */
  description: string;
  /**
   * The URL of the image to display
   */
  imageUrl: string;
  /**
   * Alternative text for the image
   */
  imageAlt: string;
  /**
   * The text for the call-to-action button
   * @default "Read More"
   */
  ctaText?: string;
  /**
   * The URL the CTA button should link to
   * @default "#"
   */
  ctaHref?: string;
  /**
   * The background color of the card content
   * @default "rgba(30, 41, 59, 0.95)"
   */
  backgroundColor?: string;
  /**
   * Background color opacity (0-1)
   * @default 0.95
   */
  backgroundOpacity?: number;
  /**
   * The color of the title text
   * @default "#f8fafc"
   */
  titleColor?: string;
  /**
   * The color of the description text
   * @default "#e2e8f0"
   */
  descriptionColor?: string;
  /**
   * The background color of the CTA button
   * @default "#38bdf8"
   */
  buttonColor?: string;
  /**
   * The text color of the CTA button
   * @default "#ffffff"
   */
  buttonTextColor?: string;
  /**
   * The hover state background color of the CTA button
   * @default "#0ea5e9"
   */
  buttonHoverColor?: string;
  /**
   * The transition duration in seconds
   * @default 0.4
   */
  transitionDuration?: number;
  /**
   * Whether to add a subtle overlay gradient
   * @default true
   */
  showOverlayGradient?: boolean;
  /**
   * Custom class name for the card container
   */
  containerClassName?: string;
  /**
   * Custom class name for the content wrapper
   */
  contentClassName?: string;
  /**
   * Custom class name for the image
   */
  imageClassName?: string;
  /**
   * Custom class name for the button
   */
  buttonClassName?: string;
}

export const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(({
  title,
  description,
  imageUrl,
  imageAlt,
  ctaText = "Read More",
  ctaHref = "#",
  backgroundColor = "rgba(30, 41, 59, 0.95)",
  backgroundOpacity = 0.95,
  titleColor = "#f8fafc",
  descriptionColor = "#e2e8f0",
  buttonColor = "#38bdf8",
  buttonTextColor = "#ffffff",
  buttonHoverColor = "#0ea5e9",
  transitionDuration = 0.4,
  showOverlayGradient = true,
  containerClassName,
  contentClassName,
  imageClassName,
  buttonClassName,
  ...props
}, ref) => {
  // Ensure background color has the correct opacity
  const getBackgroundColor = () => {
    if (backgroundColor.startsWith('rgba')) {
      return backgroundColor;
    }
    if (backgroundColor.startsWith('#')) {
      // Convert hex to rgba with opacity
      const hex = backgroundColor.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${backgroundOpacity})`;
    }
    return backgroundColor;
  };

  const bgColor = getBackgroundColor();
  const transitionStyle = {
    '--transition-duration': `${transitionDuration}s`,
    '--title-color': titleColor,
    '--description-color': descriptionColor,
    '--button-color': buttonColor,
    '--button-text-color': buttonTextColor,
    '--button-hover-color': buttonHoverColor,
  } as React.CSSProperties;

  return (
    <div 
      ref={ref}
      className={cn(
        'relative w-full max-w-[320px] h-[420px]',
        'group hover:shadow-2xl hover:scale-[1.02]',
        'transform-gpu will-change-transform',
        'transition-all duration-300',
        containerClassName
      )}
      style={transitionStyle}
      {...props}
    >
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        {/* Image with overlay */}
        <div 
          className={cn(
            'absolute inset-0 w-full h-full transition-transform duration-500',
            'group-hover:translate-x-[105%]',
            'transform-gpu will-change-transform',
            'rounded-xl',
            'overflow-hidden',
            imageClassName
          )}
        >
          <img
            src={imageUrl}
            alt={imageAlt}
            className={cn(
              'w-full h-full object-cover',
              'transition-transform duration-700 group-hover:scale-110',
              'transform-gpu will-change-transform'
            )}
            loading="lazy"
          />
          {showOverlayGradient && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          )}
        </div>

        {/* Content */}
        <div 
          className={cn(
            'absolute inset-0 w-full h-full flex flex-col justify-between p-6',
            'transition-transform duration-500 ease-in-out',
            'transform -translate-x-[101%] group-hover:translate-x-0',
            'backdrop-blur-sm',
            'transform-gpu will-change-transform',
            'rounded-xl',
            contentClassName
          )}
          style={{
            backgroundColor: bgColor,
            left: '1px', // Ensure full coverage of the right edge
          }}
        >
          <div>
            <h2 
              className={cn(
                'text-2xl md:text-3xl font-bold mb-4 leading-tight',
                'transition-opacity duration-300',
                'text-shadow-sm',
                'opacity-0 group-hover:opacity-100',
                'delay-100'
              )}
              style={{ color: titleColor }}
            >
              {title}
            </h2>
            <p 
              className={cn(
                'text-sm md:text-base mb-6 leading-relaxed',
                'transition-opacity duration-300',
                'text-shadow',
                'opacity-0 group-hover:opacity-100',
                'delay-150'
              )}
              style={{ color: descriptionColor }}
            >
              {description}
            </p>
          </div>

          <div className="relative w-full mt-auto">
            <a
              href={ctaHref}
              className={cn(
                'inline-block py-3 px-6 rounded-lg font-medium',
                'transition-all duration-300 ease-out',
                'shadow-md',
                'opacity-0 group-hover:opacity-100',
                'relative z-10',
                'inline-flex items-center justify-center',
                'hover:shadow-lg',
                buttonClassName
              )}
              style={{
                backgroundColor: buttonColor,
                color: buttonTextColor,
                width: 'fit-content',
                minWidth: '50%',
                maxWidth: '85%',
                transitionDelay: '0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = buttonHoverColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = buttonColor;
              }}
            >
              <span className="relative z-10 whitespace-nowrap">
                {ctaText}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

HoverCard.displayName = 'HoverCard';
