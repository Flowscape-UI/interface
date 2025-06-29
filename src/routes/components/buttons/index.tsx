import { PreviewTabs } from '@/components/preview-tabs';
import PageTitle from '@/components/ui/page-title';
import { MainLayout } from '@/main-layout';
import { createFileRoute } from '@tanstack/react-router';
import AnimatedGradientButton from '@/components/ui/animated-gradient-button';
import { Button } from '@/components/ui/button';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { UsageSection } from '@/components/usage-section';
import { useTranslation } from '@/hooks/use-translation';

export const Route = createFileRoute('/components/buttons/')({
    component: ButtonsPage,
});

function ButtonsPage() {
    const { t } = useTranslation();
    return (
        <MainLayout>
            <div className="px-4 py-16 sm:px-6">
                <PageTitle>Buttons</PageTitle>
                <p className="text-white/60">
                    {t(`Buttons are used to trigger actions or events. They can be styled in different
                    ways to indicate their purpose. This page showcases various button styles and
                    their usage`)}
                    .
                </p>

                <div className="mt-8 flex flex-col gap-5">
                    <PreviewTabs title="Default Button" codeText={buttonCode}>
                        <Button>Click Me</Button>
                    </PreviewTabs>

                    <PreviewTabs title="Loading Button" codeText={buttonLoadingCode}>
                        <Button mode="loading">Loading...</Button>
                    </PreviewTabs>

                    <PreviewTabs title="Copy Button" codeText={buttonCopyCode}>
                        <Button mode="copy" copyText="Copied!!!" variant="secondary">
                            Copy Me
                        </Button>
                    </PreviewTabs>

                    <PreviewTabs title="Download Button" codeText={buttonDownloadCode}>
                        <Button
                            mode="download"
                            downloadHref="/favicon.ico"
                            downloadFilename="flowscape-favicon.ico"
                        >
                            Download
                        </Button>
                    </PreviewTabs>

                    <PreviewTabs
                        title="Animated Gradient Button"
                        codeText={animatedGradientButtonExampleCode}
                        codeSandboxUrl="https://codepen.io/cbolson/pen/PwqQwRo"
                    >
                        <AnimatedGradientButton>Animated Gradient Button</AnimatedGradientButton>
                    </PreviewTabs>
                </div>
            </div>
            <UsageSection
                title="Button Component Code"
                description={`${t('This is a button component with different modes & variants')}.`}
                code={buttonComponentCode}
            />
            <DocsSection
                description={`${t('The following props are available for the')} Button ${t('component')}.`}
                rows={buttonRows}
            />
            <UsageSection
                title="AnimatedGradientButton Component Code"
                description={`${t('This is a reusable animated gradient button component')}. ${t('It uses')} CSS @property ${t('for smooth animations and can be customized with various props for gradients, colors, and effects')}.`}
                code={animatedGradientButtonCode}
            />
            <DocsSection
                description={`${t('The following props are available for the')} AnimatedGradientButton ${t('component')}.`}
                rows={rows}
            />
        </MainLayout>
    );
}

const buttonCode = `
import { Button } from '@/components/ui/button';

<Button>Click Me</Button>
`;

const buttonRows: PropsTableRow[] = [
    {
        prop: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'The content of the button.',
    },
    {
        prop: 'variant',
        type: '"default" | "secondary" | "ghost" | "destructive" | "outline" | "link" | "copy" | "download" | "loading"',
        required: false,
        defaultValue: '"default"',
        description: 'Visual style of the button.',
    },
    {
        prop: 'size',
        type: '"default" | "sm" | "lg" | "icon"',
        required: false,
        defaultValue: '"default"',
        description: 'Size of the button.',
    },
    {
        prop: 'mode',
        type: '"default" | "copy" | "download" | "loading"',
        required: false,
        defaultValue: '"default"',
        description: 'Special mode for button behavior (copy, download, loading).',
    },
    {
        prop: 'isLoading',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'Show loading spinner and disable button.',
    },
    {
        prop: 'icon',
        type: 'React.ReactNode',
        required: false,
        description: 'Icon to show before children.',
    },
    {
        prop: 'copyText',
        type: 'string',
        required: false,
        defaultValue: '""',
        description: 'Text to copy to clipboard in copy mode.',
    },
    {
        prop: 'downloadHref',
        type: 'string',
        required: false,
        defaultValue: '""',
        description: 'URL for file download in download mode.',
    },
    {
        prop: 'downloadFilename',
        type: 'string',
        required: false,
        defaultValue: '""',
        description: 'File name for download.',
    },
    {
        prop: 'successLabel',
        type: 'string',
        required: false,
        defaultValue: '"Copied"',
        description: 'Label to show after successful copy.',
    },
    {
        prop: 'copyLabel',
        type: 'string',
        required: false,
        defaultValue: '"Copy"',
        description: 'Label for copy button.',
    },
    {
        prop: 'downloadLabel',
        type: 'string',
        required: false,
        defaultValue: '"Download"',
        description: 'Label for download button.',
    },
    {
        prop: 'asChild',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'Render as child component (for Slot usage).',
    },
    {
        prop: 'className',
        type: 'string',
        required: false,
        defaultValue: '""',
        description: 'Additional classes for custom styling.',
    },
];

const buttonLoadingCode = `
import { Button } from '@/components/ui/button';

<Button mode="loading">Loading...</Button>
`;

const buttonCopyCode = `
import { Button } from '@/components/ui/button';

<Button mode="copy" copyText="Copied!!!" variant="secondary">
    Copy Me
</Button>
`;

const buttonDownloadCode = `
import { Button } from '@/components/ui/button';

<Button mode="download" downloadHref="/favicon.ico" downloadFilename="flowscape-favicon.ico">
    Download
</Button>
`;

const buttonComponentCode = `
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react'
import { Slot } from '@radix-ui/react-slot';
import { toast } from 'sonner';
import { FaSpinner, FaCopy, FaCheck, FaDownload } from 'react-icons/fa6';

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
      variants: {
          variant: {
              default:
                  'bg-[#2280cc] text-white shadow-xs hover:text-white/70 hover:bg-[#2280cc]/70',
              destructive:
                  'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
              outline:
                  'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
              secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
              ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
              link: 'text-primary underline-offset-4 hover:underline',
              copy: 'bg-muted text-foreground hover:bg-muted/80',
              download: 'bg-accent text-accent-foreground hover:bg-accent/80',
              loading: 'bg-primary text-primary-foreground opacity-80',
          },
          size: {
              default: 'h-9 px-4 py-2 has-[>svg]:px-3',
              sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
              lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
              icon: 'size-9',
          },
      },
      defaultVariants: {
          variant: 'default',
          size: 'default',
      },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  mode?: 'default' | 'copy' | 'download' | 'loading';
  isLoading?: boolean;
  icon?: React.ReactNode;
  copyText?: string;
  downloadHref?: string;
  downloadFilename?: string;
  successLabel?: string;
  copyLabel?: string;
  downloadLabel?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
     className = '',
        variant = 'default',
        size = 'default',
        asChild = false,
        mode = 'default',
        isLoading = false,
        icon,
        copyText = '',
        downloadHref = '',
        downloadFilename = '',
        children,
        copyLabel = 'Copy',
        successLabel = 'Copied',
        downloadLabel = 'Download',
        ...props
  },
  ref,
) {
  const [copied, setCopied] = React.useState(false);
  const Comp = asChild ? Slot : 'button';

  // Copy to clipboard logic
  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!copyText) return;
      try {
          await navigator.clipboard.writeText(copyText);
          setCopied(true);
          toast.success(successLabel, { description: copyText });
          setTimeout(() => setCopied(false), 1500);
      } catch {
          toast.error('Copy failed');
      }
  };

  // Download logic
  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!downloadHref) return;
      const link = document.createElement('a');
      link.href = downloadHref;
      if (downloadFilename) link.download = downloadFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(downloadLabel + ' started');
  };

  if (mode === 'copy') {
      return (
          <Comp
              ref={ref}
              data-slot="button"
              type="button"
              aria-label={copyLabel}
              className={cn(
                  buttonVariants({ variant: variant ?? 'copy', size, className }),
                  'w-28 justify-center',
              )}
              onClick={handleCopy}
              {...props}
          >
              {copied ? (
                  <span className="inline-flex items-center gap-1">
                      <FaCheck className="h-4 w-4" /> {successLabel}
                  </span>
              ) : (
                  <span className="inline-flex items-center gap-1">
                      <FaCopy className="h-4 w-4" /> {copyLabel}
                  </span>
              )}
          </Comp>
      );
  }

  if (mode === 'download') {
      return (
          <Comp
              ref={ref}
              data-slot="button"
              type="button"
              aria-label={downloadLabel}
              className={cn(buttonVariants({ variant: variant ?? 'download', size, className }))}
              onClick={handleDownload}
              {...props}
          >
              <FaDownload className="h-4 w-4" />
              {children || downloadLabel}
          </Comp>
      );
  }

  if (mode === 'loading' || isLoading) {
      return (
          <Comp
              ref={ref}
              data-slot="button"
              className={cn(buttonVariants({ variant: 'loading', size, className }))}
              disabled
              {...props}
          >
              <FaSpinner className="size-4 animate-spin" />
              {children}
          </Comp>
      );
  }

  return (
      <Comp
          ref={ref}
          data-slot="button"
          className={cn(buttonVariants({ variant, size, className }))}
          disabled={props.disabled}
          {...props}
      >
          {icon}
          {children}
      </Comp>
  );
});

// eslint-disable-next-line react-refresh/only-export-components
export { buttonVariants };
`;

const animatedGradientButtonExampleCode = `
import AnimatedGradientButton from '@/components/ui/button';
<AnimatedGradientButton>Animated Gradient Button</AnimatedGradientButton>
`;

const animatedGradientButtonCode = `import React from "react"
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
    {
        prop: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'The content of the button.',
    },
    {
        prop: 'onClick',
        type: '() => void',
        required: false,
        description: 'Function to call when the button is clicked.',
    },
    {
        prop: 'disabled',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'Whether the button is disabled.',
    },
    {
        prop: 'className',
        type: 'string',
        required: false,
        defaultValue: '""',
        description: 'Additional classes for custom styling.',
    },
    {
        prop: 'style',
        type: 'CSSProperties',
        required: false,
        defaultValue: '{}',
        description: 'Inline styles for custom styling.',
    },
    {
        prop: 'gradientColors',
        type: 'GradientColor[]',
        required: false,
        defaultValue: 'defaultGradientColors',
        description: 'An array of gradient colors.',
    },
    {
        prop: 'animationDuration',
        type: 'number',
        required: false,
        defaultValue: '10',
        description: 'The duration of the animation (in seconds).',
    },
    {
        prop: 'animationEnabled',
        type: 'boolean',
        required: false,
        defaultValue: 'true',
        description: 'Whether the animation is enabled.',
    },
    {
        prop: 'padding',
        type: 'string',
        required: false,
        defaultValue: '"1rem 4rem"',
        description: 'The padding of the button.',
    },
    {
        prop: 'fontSize',
        type: 'string',
        required: false,
        defaultValue: '"1rem"',
        description: 'The font size of the button.',
    },
    {
        prop: 'borderRadius',
        type: 'string',
        required: false,
        defaultValue: '"999px"',
        description: 'The border radius of the button.',
    },
    {
        prop: 'backgroundColor',
        type: 'string',
        required: false,
        defaultValue: '"black"',
        description: 'The background color of the button.',
    },
    {
        prop: 'textColor',
        type: 'string',
        required: false,
        defaultValue: '"white"',
        description: 'The text color of the button.',
    },
    {
        prop: 'hoverBlur',
        type: 'number',
        required: false,
        defaultValue: '3',
        description: 'The blur amount for the hover effect.',
    },
    {
        prop: 'hoverOpacity',
        type: 'number',
        required: false,
        defaultValue: '1',
        description: 'The opacity for the hover effect.',
    },
    {
        prop: 'transitionDuration',
        type: 'number',
        required: false,
        defaultValue: '500',
        description: 'The duration of the transition (in ms).',
    },
    {
        prop: 'type',
        type: '"button" | "submit" | "reset"',
        required: false,
        defaultValue: '"button"',
        description: 'The type of the button.',
    },
    {
        prop: 'aria-label',
        type: 'string',
        required: false,
        description: 'The accessible label for the button.',
    },
];
