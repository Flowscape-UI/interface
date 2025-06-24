import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { MainLayout } from '@/main-layout';
import { createFileRoute } from '@tanstack/react-router';
import { FaCheck } from 'react-icons/fa6';

export const Route = createFileRoute('/hire/')({
  component: HirePage,
});

const plansByService = {
  web: [
    {
      name: 'Basic',
      price: '$250 - $1500',
      description: 'Perfect for landing pages and small marketing sites.',
      features: [
        'Up to 5 Pages',
        'Responsive Design',
        'Supabase Authentication',
        'Contact Form Integration',
        'Basic SEO Setup',
      ],
      cta: 'Get Started',
      isPopular: false,
      href: 'https://t.me/your_telegram_username',
    },
    {
      name: 'Pro',
      price: '$1500 - $4000',
      description: 'Ideal for complex websites with custom functionality.',
      features: [
        'Up to 15 Pages',
        'Headless CMS Integration',
        'Web3 Wallet Integration',
        'Multilingual Support (i18n)',
        'Advanced Animations & UX',
      ],
      cta: 'Get Started',
      isPopular: true,
      href: 'https://t.me/your_telegram_username',
    },
    {
      name: 'Enterprise',
      price: '$4000+ / month',
      description: 'Full-scale solutions with ongoing support and development.',
      features: [
        'All Pro Features',
        'Custom Component Library',
        'Scalable Backend Architecture',
        '24/7 Priority Support',
        '90-Day Maintenance Included',
      ],
      cta: 'Contact Us',
      isPopular: false,
      href: 'https://t.me/your_telegram_username',
    },
  ],
  mobile: [
    {
      name: 'Basic',
      price: '$250 - $1500',
      description: 'Simple apps and Telegram bots to get you started.',
      features: [
        'Up to 5 App Screens',
        'Telegram Mini App (TMA)',
        'Clean & Modern UI/UX',
        'Push Notification Setup',
        'App Store Submission Help',
      ],
      cta: 'Get Started',
      isPopular: false,
      href: 'https://t.me/your_telegram_username',
    },
    {
      name: 'Pro',
      price: '$1500 - $4000',
      description: 'Feature-rich apps with authentication and integrations.',
      features: [
        'Up to 15 App Screens',
        'Secure User Authentication',
        'Bot with AI Translation',
        'Third-Party API Integrations',
        'In-App Purchases',
      ],
      cta: 'Get Started',
      isPopular: true,
      href: 'https://t.me/your_telegram_username',
    },
    {
      name: 'Enterprise',
      price: '$4000+ / month',
      description: 'Custom solutions with dedicated support and maintenance.',
      features: [
        'All Pro Features',
        'Custom Backend Development',
        'Advanced Analytics',
        '90-Day Maintenance Included',
        'Dedicated Support Channel',
      ],
      cta: 'Contact Us',
      isPopular: false,
      href: 'https://t.me/your_telegram_username',
    },
  ],
  components: [
    {
      name: 'Basic',
      price: '$25',
      description: 'A small set of custom components for your project.',
      features: [
        'Up to 10 Custom Components',
        'Styled with Tailwind CSS',
        'React Components',
        'Basic Documentation',
        'Figma to Code',
      ],
      cta: 'Get Started',
      isPopular: false,
      href: 'https://t.me/your_telegram_username',
    },
    {
      name: 'Pro',
      price: '$75',
      originalPrice: '$100',
      description: 'A complete, turnkey component library for your brand.',
      features: [
        'Unlimited Components',
        'Fully Customizable Theme',
        'Advanced Storybook Docs',
        'Accessibility (WCAG) Ready',
        'Unit & Integration Tests',
      ],
      cta: 'Get Started',
      isPopular: true,
      href: 'https://t.me/your_telegram_username',
    },
    {
      name: 'Enterprise',
      price: '$200 / month',
      description: 'A full library with ongoing support and updates.',
      features: [
        'All Pro Features',
        '90-Day Update & Maintenance',
        'Design System Integration',
        'Performance Optimization',
        'Dedicated Support Channel',
      ],
      cta: 'Contact Us',
      isPopular: false,
      href: 'https://t.me/your_telegram_username',
    },
  ],
};

type Plan = (typeof plansByService.web)[0] & { originalPrice?: string };

interface PricingCardProps {
  plan: Plan;
}

function PricingCard({ plan }: PricingCardProps) {
  return (
    <div
      className={cn(
        'relative flex h-full flex-col rounded-2xl border border-[#303131] bg-slate-900/50 p-6 shadow-lg',
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

      <div className="flex flex-1 flex-col">
        <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
        <p className="mt-2 text-slate-400">{plan.description}</p>

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


        <div className="mt-6 flex items-baseline gap-x-2">
          {plan.originalPrice && (
            <span className="text-2xl font-bold text-slate-500 line-through">
              {plan.originalPrice}
            </span>
          )}
          <span className="text-2xl font-bold text-white">{plan.price}</span>
          {plan.name !== 'Enterprise' && !plan.price.includes('month') && (
            <span className="text-slate-400">/one-time</span>
          )}
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
    </div>
  );
}

function HirePage() {
  return (
    <MainLayout maxWidth="max-w-[1200px]">
<div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Development Services
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-400">
            Choose the perfect plan to bring your ideas to life.
          </p>
        </div>

        <Tabs defaultValue="web" className="mt-10">
          <TabsList className="flex flex-col sm:flex-row gap-2 w-full max-w-lg mx-auto">
            <TabsTrigger value="mobile" className="w-full sm:w-auto flex-1">Mobile & Bots</TabsTrigger>
            <TabsTrigger value="web" className="w-full sm:w-auto flex-1">Web Development</TabsTrigger>
            <TabsTrigger value="components" className="w-full sm:w-auto flex-1">Component Library</TabsTrigger>
          </TabsList>
          <TabsContent value="mobile">
            <div className="mt-16 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
              {plansByService.mobile.map((plan) => (
                <PricingCard key={plan.name} plan={plan} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="web">
            <div className="mt-16 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
              {plansByService.web.map((plan) => (
                <PricingCard key={plan.name} plan={plan} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="components">
            <div className="mt-16 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
              {plansByService.components.map((plan) => (
                <PricingCard key={plan.name} plan={plan} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </MainLayout>
  );
}
