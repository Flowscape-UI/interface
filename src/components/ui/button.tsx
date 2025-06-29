import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { FaSpinner, FaCopy, FaCheck, FaDownload } from 'react-icons/fa6';

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

    // Универсальный рендеринг по mode
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

    // Default
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

export { buttonVariants };
