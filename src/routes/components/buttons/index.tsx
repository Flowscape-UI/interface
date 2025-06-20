import { PreviewTabs } from '@/components/preview-tabs';
import PageTitle from '@/components/ui/page-title';
import { cn } from '@/lib/utils';
import { MainLayout } from '@/main-layout';
import { createFileRoute, Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { FaCheck, FaCopy, FaDownload, FaSpinner } from 'react-icons/fa6';

export const Route = createFileRoute('/components/buttons/')({
    component: ButtonsPage,
});

function ButtonsPage() {
    return (
        <MainLayout>
            <div className="px-6 py-16">
                <PageTitle>Buttons</PageTitle>
                <p className="text-white/60">
                    Buttons are used to trigger actions or events. They can be styled in different
                    ways to indicate their purpose. This page showcases various button styles and
                    their usage.
                </p>

                <div className="mt-8 flex flex-col gap-5">
                    <PreviewTabs title="Default Button" codeText={buttonCode}>
                        <Button>Click Me</Button>
                    </PreviewTabs>

                    <PreviewTabs
                        title="Default Button with `isLoading` props"
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
                </div>
            </div>
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
