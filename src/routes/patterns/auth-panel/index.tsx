import { PreviewTabs } from '@/components/preview-tabs';
import PageTitle from '@/components/ui/page-title';
import { MainLayout } from '@/main-layout';
import { createFileRoute } from '@tanstack/react-router';
import { AuthPanel } from '@/components/ui/auth-panel';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { useTranslation } from '@/hooks/use-translation';

export const Route = createFileRoute('/patterns/auth-panel/')({
    component: AuthPanelPage,
});

const defaultLoginCode =
    'import { AuthPanel } from "@/components/ui/auth-panel";\n\n<AuthPanel onLogin={(data) => console.log("Login:", data)} />';

const registerModeCode =
    'import { AuthPanel } from "@/components/ui/auth-panel";\n\n<AuthPanel\n  initialMode="register"\n  onRegister={(data) => console.log("Register:", data)}\n/>';

const withSocialCode =
    'import { AuthPanel } from "@/components/ui/auth-panel";\n\n<AuthPanel\n  title="Join Flowscape"\n  description="Sign up using your favorite social provider."\n  initialMode="register"\n  showSocial\n  onRegister={(data) => console.log("Register:", data)}\n  onSocialLogin={(provider) => console.log("Social Login:", provider)}\n/>';

const fullComponentCode = `/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useId } from 'react';
import { Github, Chrome } from 'lucide-react';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as LabelPrimitive from "@radix-ui/react-label"
import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// eslint-disable-next-line react-refresh/only-export-components
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

interface SocialButtonProps {
    provider: 'github' | 'google';
    onClick: () => void;
    text: string;
}

function SocialButton({ provider, onClick, text }: SocialButtonProps) {
    const Icon = provider === 'github' ? Github : Chrome;
    return (
        <Button variant="outline" className="w-full" onClick={onClick}>
            <Icon className="mr-2 h-4 w-4" />
            {text}
        </Button>
    );
}

interface AuthPanelProps {
    initialMode?: 'login' | 'register';
    title?: string;
    description?: string;
    onLogin?: (data: any) => void;
    onRegister?: (data: any) => void;
    showSocial?: boolean;
    onSocialLogin?: (provider: 'github' | 'google') => void;
    className?: string;
}

export function AuthPanel({
    initialMode = 'login',
    title = '',
    description = '',
    onLogin = () => {},
    onRegister = () => {},
    showSocial = false,
    onSocialLogin = () => {},
    className = '',
}: AuthPanelProps) {
    const emailId = useId();
    const passwordId = useId();
    const confirmPasswordId = useId();
    const [mode, setMode] = useState(initialMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'login') {
            onLogin?.({ email, password });
        } else {
            if (password === confirmPassword) {
                onRegister?.({ email, password });
            } else {
                alert('Passwords do not match');
            }
        }
    };

    const defaultTitle = mode === 'login' ? 'Welcome back' : 'Create an account';
    const defaultDescription =
        mode === 'login'
            ? 'Enter your email below to login to your account'
            : 'Enter your email below to create an account';

    return (
        <div
            className={cn(
                'relative w-full max-w-md rounded-xl border border-neutral-800 bg-neutral-950 p-8 shadow-2xl',
                className,
            )}
        >
            <div className="mx-auto flex w-full flex-col justify-center space-y-6">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-white">
                        {title || defaultTitle}
                    </h1>
                    <p className="text-sm text-neutral-400">{description || defaultDescription}</p>
                </div>
                <div className="grid gap-6">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor={emailId}>Email</Label>
                                <Input
                                    id={emailId}
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor={passwordId}>Password</Label>
                                <Input
                                    id={passwordId}
                                    type="password"
                                    required
                                    autoComplete={
                                        mode === 'login' ? 'current-password' : 'new-password'
                                    }
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {mode === 'register' && (
                                <div className="grid gap-2">
                                    <Label htmlFor={confirmPasswordId}>Confirm Password</Label>
                                    <Input
                                        id={confirmPasswordId}
                                        type="password"
                                        required
                                        autoComplete="new-password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            )}
                            <Button type="submit" className="w-full">
                                {mode === 'login' ? 'Login' : 'Create account'}
                            </Button>
                        </div>
                    </form>
                    {showSocial && (
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-neutral-700" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-neutral-950 px-2 text-neutral-400">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                    )}
                    {showSocial && (
                        <div className="grid grid-cols-2 gap-4">
                            <SocialButton
                                provider="github"
                                onClick={() => onSocialLogin?.('github')}
                                text="GitHub"
                            />
                            <SocialButton
                                provider="google"
                                onClick={() => onSocialLogin?.('google')}
                                text="Google"
                            />
                        </div>
                    )}
                </div>
                <p className="px-8 text-center text-sm text-neutral-400">
                    <a
                        href="#"
                        className="hover:text-primary underline underline-offset-4"
                        onClick={(e) => {
                            e.preventDefault();
                            setMode(mode === 'login' ? 'register' : 'login');
                        }}
                    >
                        {mode === 'login'
                            ? "Don't have an account? Sign Up"
                            : 'Already have an account? Sign In'}
                    </a>
                </p>
            </div>
        </div>
    );
}

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
                destructive:
                    'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
                outline:
                    'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
                secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
                link: 'text-primary underline-offset-4 hover:underline',
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

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : 'button';

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}
`;

const rows: PropsTableRow[] = [
    {
        prop: 'initialMode',
        type: "'login' | 'register'",
        required: false,
        defaultValue: "'login'",
        description: 'Sets the initial state of the panel.',
    },
    {
        prop: 'title',
        type: 'string',
        required: false,
        defaultValue: '""',
        description: 'Custom title for the panel. Overrides the default.',
    },
    {
        prop: 'description',
        type: 'string',
        required: false,
        defaultValue: '""',
        description: 'Custom description for the panel. Overrides the default.',
    },
    {
        prop: 'onLogin',
        type: '(data: any) => void',
        required: false,
        defaultValue: '() => {}',
        description: 'Callback function fired on login form submission.',
    },
    {
        prop: 'onRegister',
        type: '(data: any) => void',
        required: false,
        defaultValue: '() => {}',
        description: 'Callback function fired on registration form submission.',
    },
    {
        prop: 'showSocial',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'If true, displays social login buttons.',
    },
    {
        prop: 'onSocialLogin',
        type: "(provider: 'github' | 'google') => void",
        required: false,
        defaultValue: '() => {}',
        description: 'Callback for social login button clicks.',
    },
    {
        prop: 'className',
        type: 'string',
        required: false,
        defaultValue: '""',
        description: 'Additional classes for the container.',
    },
];

function AuthPanelPage() {
    const { t } = useTranslation();
    return (
        <MainLayout>
            <div className="w-full px-6 py-16">
                <PageTitle>Auth Panel</PageTitle>
                <div className="max-w-xl text-white/60">
                    {t(
                        'A flexible and reusable authentication component for handling user login and registration, with optional social logins.',
                    )}
                </div>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs title="Default Login" codeText={defaultLoginCode}>
                        <div className="flex items-center justify-center rounded-lg bg-neutral-900">
                            <AuthPanel onLogin={(data) => console.log('Login:', data)} />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs title="Register Mode" codeText={registerModeCode}>
                        <div className="flex items-center justify-center rounded-lg bg-neutral-900">
                            <AuthPanel
                                initialMode="register"
                                onRegister={(data) => console.log('Register:', data)}
                            />
                        </div>
                    </PreviewTabs>

                    <PreviewTabs title="With Social Logins" codeText={withSocialCode}>
                        <div className="flex items-center justify-center rounded-lg bg-neutral-900">
                            <AuthPanel
                                title="Join Flowscape"
                                description="Sign up using your favorite social provider."
                                initialMode="register"
                                showSocial
                                onRegister={(data) => console.log('Register:', data)}
                                onSocialLogin={(provider) => console.log('Social Login:', provider)}
                            />
                        </div>
                    </PreviewTabs>
                </div>

                <UsageSection
                    title="Component Code"
                    description={t(
                        'The complete source code for the AuthPanel component. Use this as a reference for understanding its internal workings.',
                    )}
                    code={fullComponentCode}
                />

                <DocsSection
                    description={
                        <>
                            <div className="mb-4">
                                <strong>Auth Panel</strong>{' '}
                                {t(
                                    'is a self-contained component for user authentication. It provides a clean UI for both login and registration forms and can be easily extended with social login providers.',
                                )}
                            </div>
                            <div>
                                {t(
                                    'Switch between login and registration modes seamlessly. The component is built with Tailwind CSS & shadcn/ui components for a consistent and modern look.',
                                )}
                            </div>
                        </>
                    }
                    rows={rows}
                />
            </div>
        </MainLayout>
    );
}
