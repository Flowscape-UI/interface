import { AuthPanel } from '@/components/ui/auth-panel';
import { Link, createFileRoute } from '@tanstack/react-router';
import { FaArrowLeft } from 'react-icons/fa6';

export const Route = createFileRoute('/auth/')({
  component: AuthPage,
});

function AuthPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <Link
        to="/docs/installation"
        className="absolute top-4 left-4 flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
      >
        <FaArrowLeft />
        Back to Docs
      </Link>
      <AuthPanel
        title="Join Flowscape"
        description="Sign up using your favorite social provider."
        initialMode="register"
        showSocial
        onRegister={(data) => console.log('Register:', data)}
        onSocialLogin={(provider) => console.log('Social Login:', provider)}
      />
    </div>
  );
}
