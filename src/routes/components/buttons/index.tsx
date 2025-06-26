import { PreviewTabs } from '@/components/preview-tabs';
import PageTitle from '@/components/ui/page-title';
import { cn } from '@/lib/utils';
import { MainLayout } from '@/main-layout';
import { createFileRoute, Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { FaCheck, FaCopy, FaDownload, FaSpinner } from 'react-icons/fa6';
import AnimatedGradientButton from '@/components/ui/animated-gradient-button';
import { DocsSection } from "@/components/docs-section";
import type { PropsTableRow } from "@/components/props-table";
import { UsageSection } from "@/components/usage-section";
import { useTranslation } from '@/hooks/use-translation';

export const Route = createFileRoute('/components/buttons/')({
    component: ButtonsPage,
});

function ButtonsPage() {
  const {t} = useTranslation();
    return (
        <MainLayout>
            <div className="px-4 sm:px-6 py-16">
                <PageTitle>Buttons</PageTitle>
                <p className="text-white/60">
                    {t(`Buttons are used to trigger actions or events. They can be styled in different
                    ways to indicate their purpose. This page showcases various button styles and
                    their usage`)}.
                </p>

                <div className="mt-8 flex flex-col gap-5">
                    <PreviewTabs title="Default Button" codeText={buttonCode}>
                        <Button>Click Me</Button>
                    </PreviewTabs>

                    <PreviewTabs
                        title="Loading Button"
                        codeText={buttonCode}
                    >
                        <Button isLoading>Click Me</Button>
                    </PreviewTabs>

                    <PreviewTabs title="Copy Button" codeText={buttonCode}>
                        <CopyButton textToCopy="Copied!!!">Click Me</CopyButton>
                    </PreviewTabs>

                    <PreviewTabs title="Download Button" codeText={buttonCode}>
                        <DownloadButton href="/example/buttons.tsx" filename="buttons.tsx">
                            Download
                        </DownloadButton>
                    </PreviewTabs>

                    <PreviewTabs title="Animated Gradient Button" codeText={animatedGradientButtonCode}>
                        <AnimatedGradientButton>
                            Animated Gradient Button
                        </AnimatedGradientButton>
                    </PreviewTabs>
                </div>
            </div>
            <UsageSection
                title="Component Code"
                description={
                    `${t('This is a reusable animated gradient button component')}. ${t('It uses')} CSS @property ${t('for smooth animations and can be customized with various props for gradients, colors, and effects')}.`
                }
                code={componentCode}
            />
            <DocsSection
                description={`${t('The following props are available for the')} AnimatedGradientButton ${t('component')}.`}
                rows={rows}
            />
        </MainLayout>
    );
}

const buttonCode = `
import { JSX, useState } from "react";
import { cn } from "@/lib/utils";

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    isLoading?: boolean;
}

const baseStyles = {
    primary: "bg-sky-600 hover:bg-sky-500 text-white",
    secondary: "bg-white/10 hover:bg-white/20 text-slate-100 border border-white/20",
    ghost: "hover:bg-white/10 text-slate-100",
};

export function Button({
    variant = "primary",
    isLoading,
    className,
    disabled,
    children,
    ...props
}: BaseButtonProps) {
    return (
        <button
            className={cn(
                "relative inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60",
                baseStyles[variant],
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <FaSpinner className="size-4 animate-spin" />
            )}
            {children}
        </button>
    );
}

`;

/* -------------------- BaseButton -------------------- */
export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'secondary' | 'ghost';
    isLoading?: boolean;
}

export interface LinkProps extends React.LinkHTMLAttributes<HTMLLinkElement> {
    variant?: 'default' | 'secondary' | 'ghost';
    isLoading?: boolean;
}

const baseStyles = {
    default: 'bg-sky-600 hover:bg-sky-500 text-white',
    secondary: 'bg-white/10 hover:bg-white/20 text-slate-100 border border-white/20',
    ghost: 'hover:bg-white/10 text-slate-100',
};

function Button({
    variant = 'default',
    isLoading,
    className,
    disabled,
    children,
    ...props
}: BaseButtonProps) {
    return (
        <button
            className={cn(
                'relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60',
                baseStyles[variant],
                className,
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <FaSpinner className="size-4 animate-spin" />}
            {children}
        </button>
    );
}

/* -------------------- CopyButton -------------------- */
function CopyButton({ textToCopy, className, ...props }: BaseButtonProps & { textToCopy: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Button
            variant="secondary"
            onClick={handleCopy}
            aria-label="Copy code"
            className={cn('w-28 justify-center', className)}
            {...props}
        >
            <AnimatePresence initial={false} mode="popLayout">
                {copied ? (
                    <motion.span
                        key="copied"
                        initial={{ y: -8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="inline-flex items-center gap-1"
                    >
                        <FaCheck className="h-4 w-4" /> Copied
                    </motion.span>
                ) : (
                    <motion.span
                        key="copy"
                        initial={{ y: 8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="inline-flex items-center gap-1"
                    >
                        <FaCopy className="h-4 w-4" /> Copy
                    </motion.span>
                )}
            </AnimatePresence>
        </Button>
    );
}

type Variant = keyof typeof baseStyles;

/* ----------  ПРОПСЫ  ---------- */
export interface DownloadButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string; // путь к файлу в /public  или абсолютный URL
    filename?: string; // имя при сохранении (download=...)
    variant?: Variant; // стиль из baseStyles
    className?: string; // дополнительные классы
}

/* ----------  КОМПОНЕНТ  ---------- */
export const DownloadButton = React.forwardRef<HTMLAnchorElement, DownloadButtonProps>(
    function DownloadButton(
        { href, filename, variant = 'default', className, children, ...rest },
        ref,
    ) {
        return (
            <Link
                ref={ref}
                to={href}
                download={filename}
                className={cn(
                    'relative inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60',
                    baseStyles[variant],
                    className,
                )}
                {...rest}
            >
                <FaDownload className="h-4 w-4" />
                {children}
            </Link>
        );
    },
);

const animatedGradientButtonCode = `
import React from "react"
import type { CSSProperties } from "react"

interface GradientColor {
  color: string
  size?: number
  transparency?: number
}

interface AnimatedGradientButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  style?: CSSProperties

  // Настройки градиентов
  gradientColors?: GradientColor[]
  animationDuration?: number
  animationEnabled?: boolean

  // Настройки кнопки
  padding?: string
  fontSize?: string
  borderRadius?: string
  backgroundColor?: string
  textColor?: string

  // Настройки эффектов
  hoverBlur?: number
  hoverOpacity?: number
  transitionDuration?: number

  // HTML атрибуты
  type?: "button" | "submit" | "reset"
  "aria-label"?: string
}

const defaultGradientColors: GradientColor[] = [
  { color: "#18346d", size: 5 },
  { color: "purple", size: 5 },
  { color: "red", size: 5 },
  { color: "orange", size: 5 },
  { color: "green", size: 5 },
  { color: "yellow", size: 5 },
]

export default function AnimatedGradientButton({
  children,
  onClick,
  disabled = false,
  className = "",
  style = {},
  gradientColors = defaultGradientColors,
  animationDuration = 10,
  animationEnabled = true,
  padding = "1rem 4rem",
  fontSize = "1rem",
  borderRadius = "999px",
  backgroundColor = "black",
  textColor = "white",
  hoverBlur = 3,
  hoverOpacity = 1,
  transitionDuration = 500,
  type = "button",
  "aria-label": ariaLabel,
  ...props
}: AnimatedGradientButtonProps) {
  // Генерируем уникальный ID для компонента
  const componentId = React.useId().replace(/:/g, "")

  // Генерируем CSS с @property правилами и keyframes
  const generateCSS = () => {
    let css = ""

    // Генерируем @property правила для каждого цвета
    gradientColors.forEach((_, index) => {
      css += \`
        @property --\${componentId}-color-\${index}-x {
          syntax: "<percentage>";
          initial-value: 50%;
          inherits: false;
        }
        @property --\${componentId}-color-\${index}-y {
          syntax: "<percentage>";
          initial-value: 50%;
          inherits: false;
        }
      \`
    })

    // Генерируем keyframes для анимации
    if (animationEnabled) {
      css += \`
        @keyframes \${componentId}-moveGradients {
          0%, 100% {
            --\${componentId}-color-0-x: -40%;
            --\${componentId}-color-0-y: 35%;
            --\${componentId}-color-1-x: 35%;
            --\${componentId}-color-1-y: -10%;
            --\${componentId}-color-2-x: -10%;
            --\${componentId}-color-2-y: -80%;
            --\${componentId}-color-3-x: 50%;
            --\${componentId}-color-3-y: 145%;
            --\${componentId}-color-4-x: 0%;
            --\${componentId}-color-4-y: 80%;
            --\${componentId}-color-5-x: 35%;
            --\${componentId}-color-5-y: 95%;
          }
          25% {
            --\${componentId}-color-0-x: 30%;
            --\${componentId}-color-0-y: -25%;
            --\${componentId}-color-1-x: 5%;
            --\${componentId}-color-1-y: 40%;
            --\${componentId}-color-2-x: 45%;
            --\${componentId}-color-2-y: 150%;
            --\${componentId}-color-3-x: -15%;
            --\${componentId}-color-3-y: 30%;
            --\${componentId}-color-4-x: 45%;
            --\${componentId}-color-4-y: 15%;
            --\${componentId}-color-5-x: -20%;
            --\${componentId}-color-5-y: -40%;
          }
          50% {
            --\${componentId}-color-0-x: 70%;
            --\${componentId}-color-0-y: 50%;
            --\${componentId}-color-1-x: 50%;
            --\${componentId}-color-1-y: 120%;
            --\${componentId}-color-2-x: 35%;
            --\${componentId}-color-2-y: -80%;
            --\${componentId}-color-3-x: 75%;
            --\${componentId}-color-3-y: -75%;
            --\${componentId}-color-4-x: 85%;
            --\${componentId}-color-4-y: 100%;
            --\${componentId}-color-5-x: 50%;
            --\${componentId}-color-5-y: -20%;
          }
          75% {
            --\${componentId}-color-0-x: -25%;
            --\${componentId}-color-0-y: 10%;
            --\${componentId}-color-1-x: 35%;
            --\${componentId}-color-1-y: -45%;
            --\${componentId}-color-2-x: -10%;
            --\${componentId}-color-2-y: 30%;
            --\${componentId}-color-3-x: 20%;
            --\${componentId}-color-3-y: -40%;
            --\${componentId}-color-4-x: -15%;
            --\${componentId}-color-4-y: 50%;
            --\${componentId}-color-5-x: 45%;
            --\${componentId}-color-5-y: -15%;
          }
        }
      \`
    }

    // Стили для кнопки
    css += \`
      .\${componentId}-button {
        padding: \${padding};
        font-size: \${fontSize};
        border: none;
        border-radius: \${borderRadius};
        position: relative;
        color: \${textColor};
        background: \${backgroundColor};
        isolation: isolate;
        overflow: clip;
        z-index: 0;
        cursor: \${disabled ? "not-allowed" : "pointer"};
        opacity: \${disabled ? 0.6 : 1};
        transition: opacity \${transitionDuration}ms ease-in-out;
      }

      .\${componentId}-button:hover {
        --\${componentId}-after-opacity: \${hoverOpacity};
      }

      .\${componentId}-button::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -2;
        border-radius: inherit;
        background-image: \${gradientColors
          .map((gradientColor, index) => {
            const size = gradientColor.size || 5
            const transparency = gradientColor.transparency || 30
            return \`radial-gradient(
            circle at var(--\${componentId}-color-\${index}-x, 50%) var(--\${componentId}-color-\${index}-y, 50%),
            \${gradientColor.color} \${size}%,
            transparent \${transparency}%
          )\`
          })
          .join(", ")};
        background-size: 200% 200%;
        background-repeat: no-repeat;
        \${animationEnabled ? \`animation: \${componentId}-moveGradients \${animationDuration}s linear infinite;\` : ""}
      }

      .\${componentId}-button::after {
        content: "";
        position: absolute;
        inset: 2px;
        border-radius: inherit;
        background: \${backgroundColor};
        z-index: -1;
        backdrop-filter: blur(\${hoverBlur}px);
        transition: opacity \${transitionDuration}ms ease-in-out;
        opacity: var(--\${componentId}-after-opacity, 0);
      }
    \`

    return css
  }

  const buttonStyles: CSSProperties = {
    ...style,
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: generateCSS() }} />
      <button
        type={type}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={\`\${componentId}-button \${className}\`}
        style={buttonStyles}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </button>
    </>
  )
}
`;

const componentCode = `import React from "react"
import type { CSSProperties } from "react"

interface GradientColor {
  color: string
  size?: number
  transparency?: number
}

interface AnimatedGradientButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  style?: CSSProperties

  // Настройки градиентов
  gradientColors?: GradientColor[]
  animationDuration?: number
  animationEnabled?: boolean

  // Настройки кнопки
  padding?: string
  fontSize?: string
  borderRadius?: string
  backgroundColor?: string
  textColor?: string

  // Настройки эффектов
  hoverBlur?: number
  hoverOpacity?: number
  transitionDuration?: number

  // HTML атрибуты
  type?: "button" | "submit" | "reset"
  "aria-label"?: string
}

const defaultGradientColors: GradientColor[] = [
  { color: "#18346d", size: 5 },
  { color: "purple", size: 5 },
  { color: "red", size: 5 },
  { color: "orange", size: 5 },
  { color: "green", size: 5 },
  { color: "yellow", size: 5 },
]

export default function AnimatedGradientButton({
  children,
  onClick,
  disabled = false,
  className = "",
  style = {},
  gradientColors = defaultGradientColors,
  animationDuration = 10,
  animationEnabled = true,
  padding = "1rem 4rem",
  fontSize = "1rem",
  borderRadius = "999px",
  backgroundColor = "black",
  textColor = "white",
  hoverBlur = 3,
  hoverOpacity = 1,
  transitionDuration = 500,
  type = "button",
  "aria-label": ariaLabel,
  ...props
}: AnimatedGradientButtonProps) {
  // Генерируем уникальный ID для компонента
  const componentId = React.useId().replace(/:/g, "")

  // Генерируем CSS с @property правилами и keyframes
  const generateCSS = () => {
    let css = ""

    // Генерируем @property правила для каждого цвета
    gradientColors.forEach((_, index) => {
      css += \`
        @property --\${componentId}-color-\${index}-x {
          syntax: "<percentage>";
          initial-value: 50%;
          inherits: false;
        }
        @property --\${componentId}-color-\${index}-y {
          syntax: "<percentage>";
          initial-value: 50%;
          inherits: false;
        }
      \`
    })

    // Генерируем keyframes для анимации
    if (animationEnabled) {
      css += \`
        @keyframes \${componentId}-moveGradients {
          0%, 100% {
            --\${componentId}-color-0-x: -40%;
            --\${componentId}-color-0-y: 35%;
            --\${componentId}-color-1-x: 35%;
            --\${componentId}-color-1-y: -10%;
            --\${componentId}-color-2-x: -10%;
            --\${componentId}-color-2-y: -80%;
            --\${componentId}-color-3-x: 50%;
            --\${componentId}-color-3-y: 145%;
            --\${componentId}-color-4-x: 0%;
            --\${componentId}-color-4-y: 80%;
            --\${componentId}-color-5-x: 35%;
            --\${componentId}-color-5-y: 95%;
          }
          25% {
            --\${componentId}-color-0-x: 30%;
            --\${componentId}-color-0-y: -25%;
            --\${componentId}-color-1-x: 5%;
            --\${componentId}-color-1-y: 40%;
            --\${componentId}-color-2-x: 45%;
            --\${componentId}-color-2-y: 150%;
            --\${componentId}-color-3-x: -15%;
            --\${componentId}-color-3-y: 30%;
            --\${componentId}-color-4-x: 45%;
            --\${componentId}-color-4-y: 15%;
            --\${componentId}-color-5-x: -20%;
            --\${componentId}-color-5-y: -40%;
          }
          50% {
            --\${componentId}-color-0-x: 70%;
            --\${componentId}-color-0-y: 50%;
            --\${componentId}-color-1-x: 50%;
            --\${componentId}-color-1-y: 120%;
            --\${componentId}-color-2-x: 35%;
            --\${componentId}-color-2-y: -80%;
            --\${componentId}-color-3-x: 75%;
            --\${componentId}-color-3-y: -75%;
            --\${componentId}-color-4-x: 85%;
            --\${componentId}-color-4-y: 100%;
            --\${componentId}-color-5-x: 50%;
            --\${componentId}-color-5-y: -20%;
          }
          75% {
            --\${componentId}-color-0-x: -25%;
            --\${componentId}-color-0-y: 10%;
            --\${componentId}-color-1-x: 35%;
            --\${componentId}-color-1-y: -45%;
            --\${componentId}-color-2-x: -10%;
            --\${componentId}-color-2-y: 30%;
            --\${componentId}-color-3-x: 20%;
            --\${componentId}-color-3-y: -40%;
            --\${componentId}-color-4-x: -15%;
            --\${componentId}-color-4-y: 50%;
            --\${componentId}-color-5-x: 45%;
            --\${componentId}-color-5-y: -15%;
          }
        }
      \`
    }

    // Стили для кнопки
    css += \`
      .\${componentId}-button {
        padding: \${padding};
        font-size: \${fontSize};
        border: none;
        border-radius: \${borderRadius};
        position: relative;
        color: \${textColor};
        background: \${backgroundColor};
        isolation: isolate;
        overflow: clip;
        z-index: 0;
        cursor: \${disabled ? "not-allowed" : "pointer"};
        opacity: \${disabled ? 0.6 : 1};
        transition: opacity \${transitionDuration}ms ease-in-out;
      }

      .\${componentId}-button:hover {
        --\${componentId}-after-opacity: \${hoverOpacity};
      }

      .\${componentId}-button::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -2;
        border-radius: inherit;
        background-image: \${gradientColors
          .map((gradientColor, index) => {
            const size = gradientColor.size || 5
            const transparency = gradientColor.transparency || 30
            return \`radial-gradient(
            circle at var(--\${componentId}-color-\${index}-x, 50%) var(--\${componentId}-color-\${index}-y, 50%),
            \${gradientColor.color} \${size}%,
            transparent \${transparency}%
          )\`
          })
          .join(", ")};
        background-size: 200% 200%;
        background-repeat: no-repeat;
        \${animationEnabled ? \`animation: \${componentId}-moveGradients \${animationDuration}s linear infinite;\` : ""}
      }

      .\${componentId}-button::after {
        content: "";
        position: absolute;
        inset: 2px;
        border-radius: inherit;
        background: \${backgroundColor};
        z-index: -1;
        backdrop-filter: blur(\${hoverBlur}px);
        transition: opacity \${transitionDuration}ms ease-in-out;
        opacity: var(--\${componentId}-after-opacity, 0);
      }
    \`

    return css
  }

  const buttonStyles: CSSProperties = {
    ...style,
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: generateCSS() }} />
      <button
        type={type}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={\`\${componentId}-button \${className}\`}
        style={buttonStyles}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </button>
    </>
  )
}
`;

const rows: PropsTableRow[] = [
    { prop: 'children', type: 'React.ReactNode', required: true, description: 'The content of the button.' },
    { prop: 'disabled', type: 'boolean', required: false, description: 'Whether the button is disabled.' },
    { prop: 'className', type: 'string', required: false, description: 'Additional classes for custom styling.' },
    { prop: 'style', type: 'CSSProperties', required: false, description: 'Inline styles for custom styling.' },
    { prop: 'gradientColors', type: 'GradientColor[]', required: false, description: 'An array of gradient colors.' },
    { prop: 'animationDuration', type: 'number', required: false, description: 'The duration of the animation.' },
    { prop: 'animationEnabled', type: 'boolean', required: false, description: 'Whether the animation is enabled.' },
    { prop: 'padding', type: 'string', required: false, description: 'The padding of the button.' },
    { prop: 'fontSize', type: 'string', required: false, description: 'The font size of the button.' },
    { prop: 'borderRadius', type: 'string', required: false, description: 'The border radius of the button.' },
    { prop: 'backgroundColor', type: 'string', required: false, description: 'The background color of the button.' },
    { prop: 'textColor', type: 'string', required: false, description: 'The text color of the button.' },
    { prop: 'hoverBlur', type: 'number', required: false, description: 'The blur amount for the hover effect.' },
    { prop: 'hoverOpacity', type: 'number', required: false, description: 'The opacity for the hover effect.' },
    { prop: 'transitionDuration', type: 'number', required: false, description: 'The duration of the transition.' },
    { prop: 'type', type: '"button" | "submit" | "reset"', required: false, description: 'The type of the button.' },
    { prop: 'aria-label', type: 'string', required: false, description: 'The accessible label for the button.' },
    { prop: 'onClick', type: '() => void', required: false, description: 'Function to call when the button is clicked.' },
];
