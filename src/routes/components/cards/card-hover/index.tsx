import { PreviewTabs } from '@/components/preview-tabs';
import PageTitle from '@/components/ui/page-title';
import { MainLayout } from '@/main-layout';
import { createFileRoute } from '@tanstack/react-router';
import { HoverCard } from '@/components/ui/hover-card';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { useTranslation } from '@/hooks/use-translation';

export const Route = createFileRoute('/components/cards/card-hover/')({
    component: HoverCardPage,
});

const defaultCode = `import { HoverCard } from '@/components/ui/hover-card';

<HoverCard
  title="Create Coffee Masterpieces"
  description="Learn the art of latte design and transform your everyday brew into something extraordinary"
  imageUrl="https://images.pexels.com/photos/302896/pexels-photo-302896.jpeg"
  imageAlt="Coffee art"
  ctaText="Start Learning"
  ctaHref="#"
/>
`;

const customColorsCode = `import { HoverCard } from '@/components/ui/hover-card';

<HoverCard
  title="Summer Collection"
  description="Discover our new summer collection with vibrant colors and comfortable fabrics"
  imageUrl="https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg"
  imageAlt="Fashion collection"
  ctaText="Shop Now"
  ctaHref="#"
  backgroundColor="#2c3e50"
  titleColor="#ecf0f1"
  descriptionColor="#bdc3c7"
  buttonColor="#e74c3c"
  buttonHoverColor="#c0392b"
  buttonTextColor="#ffffff"
  transitionDuration={0.6}
/>
`;

const smallCardCode = `import { HoverCard } from '@/components/ui/hover-card';

<HoverCard
  title="Quick Tips"
  description="5 minute recipes for busy weeknights"
  imageUrl="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
  imageAlt="Delicious food"
  ctaText="View Recipes"
  ctaHref="#"
  className="w-[250px] h-[350px]"
  containerClassName="w-[250px] h-[350px]"
/>
`;

const rows: PropsTableRow[] = [
    {
        prop: 'title',
        type: 'string',
        required: false,
        defaultValue: '""',
        description: 'Optional title of the card, used if children are not provided.',
    },
    {
        prop: 'description',
        type: 'string',
        required: false,
        defaultValue: '""',
        description: 'Optional description text, used if children are not provided.',
    },
    {
        prop: 'imageUrl',
        type: 'string',
        required: true,
        description: 'The URL of the image to display.',
    },
    {
        prop: 'imageAlt',
        type: 'string',
        required: true,
        description: 'Alternative text for the image.',
    },
    {
        prop: 'ctaText',
        type: 'string',
        required: false,
        defaultValue: '"Read More"',
        description: 'The text for the call-to-action button, used if children are not provided.',
    },
    {
        prop: 'ctaHref',
        type: 'string',
        required: false,
        defaultValue: '"#"',
        description: 'The URL the CTA button should link to, used if children are not provided.',
    },
    {
        prop: 'backgroundColor',
        type: 'string',
        required: false,
        defaultValue: '"rgba(30, 41, 59, 0.95)"',
        description: 'The background color of the card content.',
    },
    {
        prop: 'backgroundOpacity',
        type: 'number',
        required: false,
        defaultValue: '0.95',
        description: 'Background color opacity (0-1).',
    },
    {
        prop: 'titleColor',
        type: 'string',
        required: false,
        defaultValue: '"#f8fafc"',
        description: 'The color of the title text.',
    },
    {
        prop: 'descriptionColor',
        type: 'string',
        required: false,
        defaultValue: '"#e2e8f0"',
        description: 'The color of the description text.',
    },
    {
        prop: 'buttonColor',
        type: 'string',
        required: false,
        defaultValue: '"#38bdf8"',
        description: 'The background color of the CTA button.',
    },
    {
        prop: 'buttonTextColor',
        type: 'string',
        required: false,
        defaultValue: '"#ffffff"',
        description: 'The text color of the CTA button.',
    },
    {
        prop: 'buttonHoverColor',
        type: 'string',
        required: false,
        defaultValue: '"#0ea5e9"',
        description: 'The hover state background color of the CTA button.',
    },
    {
        prop: 'transitionDuration',
        type: 'number',
        required: false,
        defaultValue: '0.4',
        description: 'The transition duration in seconds.',
    },
    {
        prop: 'showOverlayGradient',
        type: 'boolean',
        required: false,
        defaultValue: 'true',
        description: 'Whether to add a subtle overlay gradient.',
    },
    {
        prop: 'containerClassName',
        type: 'string',
        required: false,
        defaultValue: '""',
        description: 'Custom class name for the card container.',
    },
    {
        prop: 'contentClassName',
        type: 'string',
        required: false,
        defaultValue: '""',
        description: 'Custom class name for the content wrapper.',
    },
    {
        prop: 'imageClassName',
        type: 'string',
        required: false,
        defaultValue: '""',
        description: 'Custom class name for the image.',
    },
    {
        prop: 'buttonClassName',
        type: 'string',
        required: false,
        defaultValue: '""',
        description: 'Custom class name for the button.',
    },
    {
        prop: 'children',
        type: 'React.ReactNode',
        required: false,
        description:
            'Custom content to be rendered inside the card. Overrides title, description, and cta button.',
    },
    {
        prop: 'open',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'Controlled open state.',
    },
    {
        prop: 'onOpenChange',
        type: '(open: boolean) => void',
        required: false,
        defaultValue: '() => {}',
        description: 'Event handler for when the open state changes.',
    },
];

const componentCode = `import React, { useState, useEffect, forwardRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useControllableState } from '@/hooks/use-controllable-state';

export interface HoverCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    title?: string;
    description?: string;
    imageUrl: string;
    imageAlt: string;
    ctaText?: string;
    ctaHref?: string;
    backgroundColor?: string;
    backgroundOpacity?: number;
    titleColor?: string;
    descriptionColor?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    buttonHoverColor?: string;
    transitionDuration?: number;
    showOverlayGradient?: boolean;
    containerClassName?: string;
    contentClassName?: string;
    imageClassName?: string;
    buttonClassName?: string;
    children?: React.ReactNode;
    open?: boolean;
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
            title = '',
            description = '',
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
            containerClassName = '',
            contentClassName = '',
            imageClassName = '',
            buttonClassName = '',
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
                return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + backgroundOpacity + ')';
            }
            return backgroundColor;
        }, [backgroundColor, backgroundOpacity]);

        const bgColor = getBackgroundColor();
        const transitionStyle = {
            '--transition-duration': transitionDuration + 's',
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

// Custom hook

interface UseControllableStateParams<T> {
  prop?: T;
  defaultProp?: T;
  onChange?: (state: T) => void;
}

export function useControllableState<T>({
  prop,
  defaultProp,
  onChange = () => {},
}: UseControllableStateParams<T>) {
  const [uncontrolledProp, setUncontrolledProp] = useState(defaultProp);
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;

  const setValue = useCallback(
      (nextValue: T | ((prevState: T) => T)) => {
          const resolvedValue =
              typeof nextValue === 'function'
                  ? (nextValue as (prevState: T) => T)(value as T)
                  : nextValue;
          if (!isControlled) {
              setUncontrolledProp(resolvedValue);
          }
          onChange(resolvedValue);
      },
      [isControlled, onChange, value],
  );

  return [value, setValue] as const;

import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
}`;

function HoverCardPage() {
    const { t } = useTranslation();
    return (
        <MainLayout>
            <div className="w-full px-6 py-16">
                <PageTitle data-toc>Hover Card</PageTitle>
                <p className="max-w-xl text-white/60">
                    {t(
                        'A stylish card with a hover effect that reveals additional content. Perfect for showcasing products, features, or articles',
                    )}
                    .
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs
                        title="Default"
                        codeText={defaultCode}
                        codeSandboxUrl="https://codepen.io/nazaneyn/pen/emNGzmB"
                    >
                        <HoverCard
                            title="Create Coffee Masterpieces"
                            description="Learn the art of latte design and transform your everyday brew into something extraordinary"
                            imageUrl="https://images.pexels.com/photos/302896/pexels-photo-302896.jpeg"
                            imageAlt="Coffee art"
                            ctaText="Start Learning"
                            ctaHref="#"
                        />
                    </PreviewTabs>

                    <PreviewTabs
                        title="Custom Colors"
                        codeText={customColorsCode}
                        codeSandboxUrl="https://codepen.io/nazaneyn/pen/emNGzmB"
                    >
                        <HoverCard
                            title="Summer Collection"
                            description="Discover our new summer collection with vibrant colors and comfortable fabrics"
                            imageUrl="https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg"
                            imageAlt="Fashion collection"
                            ctaText="Shop Now"
                            ctaHref="#"
                            backgroundColor="#2c3e50"
                            titleColor="#ecf0f1"
                            descriptionColor="#bdc3c7"
                            buttonColor="#e74c3c"
                            buttonHoverColor="#c0392b"
                            buttonTextColor="#ffffff"
                            transitionDuration={0.6}
                        />
                    </PreviewTabs>

                    <PreviewTabs
                        title="Small Card"
                        codeText={smallCardCode}
                        codeSandboxUrl="https://codepen.io/nazaneyn/pen/emNGzmB"
                    >
                        <HoverCard
                            title="Quick Tips"
                            description="5 minute recipes for busy weeknights"
                            imageUrl="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
                            imageAlt="Delicious food"
                            ctaText="View Recipes"
                            ctaHref="#"
                        />
                    </PreviewTabs>
                </div>

                <UsageSection
                    title="Component Code"
                    description={`${t('A customizable card with a hover effect that reveals additional content. The component is built with')} CSS ${t('transitions for smooth animations and is fully responsive')}.`}
                    code={componentCode}
                />

                <DocsSection
                    description={
                        <>
                            <p className="mb-4">
                                <strong>Hover Card</strong> —{' '}
                                {t(
                                    'A visually appealing card component that reveals additional content on hover. The card features a smooth slide animation that moves the image to the right while sliding in the content panel from the left',
                                )}
                                .
                            </p>
                            <p className="mb-4">
                                {t(
                                    `The component is highly customizable with props for colors, text, and transition timing. It's built with accessibility in mind and works well on both desktop and mobile devices`,
                                )}
                                .
                            </p>
                            <p className="mb-4">
                                {t(
                                    'On mobile devices, the hover effect is replaced with a tap interaction, making it fully functional on touch screens',
                                )}
                                .
                            </p>
                        </>
                    }
                    rows={rows}
                />
            </div>
        </MainLayout>
    );
}

export default HoverCardPage;
