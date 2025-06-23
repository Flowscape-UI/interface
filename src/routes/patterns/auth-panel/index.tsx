import { PreviewTabs } from '@/components/preview-tabs';
import PageTitle from '@/components/ui/page-title';
import { MainLayout } from '@/main-layout';
import { createFileRoute } from '@tanstack/react-router';
import { AuthPanel } from '@/components/ui/auth-panel';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';

export const Route = createFileRoute('/patterns/auth-panel/')({
  component: AuthPanelPage,
});

const defaultLoginCode = 'import { AuthPanel } from "@/components/ui/auth-panel";\n\n<AuthPanel onLogin={(data) => console.log("Login:", data)} />';

const registerModeCode = 'import { AuthPanel } from "@/components/ui/auth-panel";\n\n<AuthPanel\n  initialMode="register"\n  onRegister={(data) => console.log("Register:", data)}\n/>';

const withSocialCode = 'import { AuthPanel } from "@/components/ui/auth-panel";\n\n<AuthPanel\n  title="Join Flowscape"\n  description="Sign up using your favorite social provider."\n  initialMode="register"\n  showSocial\n  onRegister={(data) => console.log("Register:", data)}\n  onSocialLogin={(provider) => console.log("Social Login:", provider)}\n/>';

const fullComponentCode = `import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Label } from './label';
import { Input } from './input';
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
  title,
  description,
  onLogin,
  onRegister,
  showSocial = false,
  onSocialLogin,
  className,
}: AuthPanelProps) {
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
  const defaultDescription = mode === 'login' ? 'Enter your email below to login to your account' : 'Enter your email below to create an account';

  return (
    <div className={cn('relative w-full max-w-md rounded-xl border border-neutral-800 bg-neutral-950 p-8 shadow-2xl', className)}>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-white">{title ?? defaultTitle}</h1>
                <p className="text-sm text-neutral-400">{description ?? defaultDescription}</p>
            </div>
            <div className="grid gap-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {mode === 'register' && (
                            <div className="grid gap-2">
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <Input id="confirm-password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                        )}
                        <Button type="submit" className="w-full">{mode === 'login' ? 'Login' : 'Create account'}</Button>
                    </div>
                </form>
                {showSocial && (
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-neutral-700" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-neutral-950 px-2 text-neutral-400">Or continue with</span>
                        </div>
                    </div>
                )}
                {showSocial && (
                    <div className="grid grid-cols-2 gap-4">
                        <SocialButton provider="github" onClick={() => onSocialLogin?.('github')} text="GitHub" />
                        <SocialButton provider="google" onClick={() => onSocialLogin?.('google')} text="Google" />
                    </div>
                )}
            </div>
            <p className="px-8 text-center text-sm text-neutral-400">
                <a href="#" className="underline underline-offset-4 hover:text-primary" onClick={(e) => { e.preventDefault(); setMode(mode === 'login' ? 'register' : 'login'); }}>
                    {mode === 'login' ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                </a>
            </p>
        </div>
    </div>
  );
}`;

const rows: PropsTableRow[] = [
    { prop: "initialMode", type: "'login' | 'register'", required: false, defaultValue: "'login'", description: "Sets the initial state of the panel." },
    { prop: "title", type: "string", required: false, description: "Custom title for the panel. Overrides the default." },
    { prop: "description", type: "string", required: false, description: "Custom description for the panel. Overrides the default." },
    { prop: "onLogin", type: "(data: any) => void", required: false, description: "Callback function fired on login form submission." },
    { prop: "onRegister", type: "(data: any) => void", required: false, description: "Callback function fired on registration form submission." },
    { prop: "showSocial", type: "boolean", required: false, defaultValue: "false", description: "If true, displays social login buttons." },
    { prop: "onSocialLogin", type: "(provider: 'github' | 'google') => void", required: false, description: "Callback for social login button clicks." },
    { prop: "className", type: "string", required: false, description: "Additional classes for the container." },
];

function AuthPanelPage() {
  return (
    <MainLayout>
      <div className="px-6 py-16 w-full">
        <PageTitle>Auth Panel</PageTitle>
        <p className="text-white/60 max-w-xl">
          A flexible and reusable authentication component for handling user login and registration, with optional social logins.
        </p>

        <div className="mt-8 flex flex-col gap-10">
          <PreviewTabs title="Default Login" codeText={defaultLoginCode}>
            <div className="flex justify-center items-center p-8 bg-neutral-900 rounded-lg">
              <AuthPanel onLogin={(data) => console.log('Login:', data)} />
            </div>
          </PreviewTabs>

          <PreviewTabs title="Register Mode" codeText={registerModeCode}>
            <div className="flex justify-center items-center p-8 bg-neutral-900 rounded-lg">
              <AuthPanel
                initialMode="register"
                onRegister={(data) => console.log('Register:', data)}
              />
            </div>
          </PreviewTabs>

          <PreviewTabs title="With Social Logins" codeText={withSocialCode}>
            <div className="flex justify-center items-center p-8 bg-neutral-900 rounded-lg">
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
          description="The complete source code for the AuthPanel component. Use this as a reference for understanding its internal workings."
          code={fullComponentCode}
        />

        <DocsSection
          description={
            <>
              <p className="mb-4">
                <strong>Auth Panel</strong> is a self-contained component for user authentication. It provides a clean UI for both login and registration forms and can be easily extended with social login providers.
              </p>
              <p>
                Switch between login and registration modes seamlessly. The component is built with Tailwind CSS and shadcn/ui components for a consistent and modern look.
              </p>
            </>
          }
          rows={rows}
        />
      </div>
    </MainLayout>
  );
}
