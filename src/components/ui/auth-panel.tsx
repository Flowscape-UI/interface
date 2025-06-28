/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Label } from './label';
import { Input } from './input';
import { useId } from 'react';
import { Github, Chrome } from 'lucide-react';

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
