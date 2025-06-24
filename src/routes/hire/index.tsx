import { MainLayout } from '@/main-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router';
import { FaCheck } from 'react-icons/fa6';

export const Route = createFileRoute('/hire/')({
  component: HirePage,
});

const plans = [
  {
    name: 'Basic',
    price: '$99',
    description: 'Perfect for small projects and getting started.',
    features: ['1 Page Website', 'Responsive Design', 'Contact Form', '3 Revisions'],
    cta: 'Get Started',
    isPopular: false,
    href: 'https://t.me/your_telegram_username',
  },
  {
    name: 'Pro',
    price: '$299',
    description: 'For growing businesses that need more features.',
    features: [
      'Up to 5 Pages',
      'Custom Design',
      'CMS Integration',
      'Basic SEO',
      'Priority Support',
    ],
    cta: 'Get Started',
    isPopular: true,
    href: 'https://t.me/your_telegram_username',
  },
  {
    name: 'Enterprise',
    price: "Let's Talk",
    description: 'For large-scale applications and custom needs.',
    features: [
      'Unlimited Pages',
      'Advanced Animations',
      'E-commerce',
      'Dedicated Support',
      'API Integrations',
    ],
    cta: 'Contact Us',
    isPopular: false,
    href: 'https://t.me/your_telegram_username',
  },
];

interface PricingCardProps {
  plan: (typeof plans)[0];
}

function PricingCard({ plan }: PricingCardProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border border-[#303131] bg-slate-900/50 p-6 shadow-lg',
        plan.isPopular && 'border-[#49a0f6]/50 bg-slate-900 shadow-[#49a0f6]/10'
      )}
    >
      {plan.isPopular && (
        <Badge
          variant="secondary"
          className="absolute -top-3 right-6 bg-[#3d7af8] text-white"
        >
          Most Popular
        </Badge>
      )}

      <div className="flex-1">
        <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
        <p className="mt-2 text-slate-400">{plan.description}</p>

        <div className="mt-6">
          <span className="text-4xl font-bold text-white">{plan.price}</span>
          {plan.name !== 'Enterprise' && <span className="text-slate-400">/one-time</span>}
        </div>

        <ul className="mt-8 space-y-4">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <FaCheck className="h-5 w-5 text-[#49a0f6]" />
              <span className="text-slate-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <a href={plan.href} target="_blank" rel="noopener noreferrer" className="mt-8 block">
        <Button
          size="lg"
          className={cn(
            'w-full bg-slate-800 text-white hover:bg-slate-700',
            plan.isPopular && 'bg-[#3d7af8] hover:bg-[#49a0f6]'
          )}
        >
          {plan.cta}
        </Button>
      </a>
    </div>
  );
}

function HirePage() {
  return (
    <MainLayout>
      <div className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Flexible Plans for Any Project
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              Choose the perfect plan to bring your ideas to life.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
