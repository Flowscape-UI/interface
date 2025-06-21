import { PreviewTabs } from '@/components/preview-tabs';
import PageTitle from '@/components/ui/page-title';
import { MainLayout } from '@/main-layout';
import { createFileRoute } from '@tanstack/react-router';
import { HoverCard } from '@/components/ui/hover-card';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';

export const Route = createFileRoute('/components/cards/card-hover/')({
    component: HoverCardPage,
});

const defaultCode = `import { HoverCard } from '@/components/ui/hover-card';

<HoverCard
  title="Create Coffee Masterpieces"
  description="Learn the art of latte design and transform your everyday brew into something extraordinary"
  imageUrl="https://images.pexels.com/photos/302896/pexels-photo-302896.jpeg"
  imageAlt="Coffee art"
  ctaText="Start Learning"
  ctaHref="#"
/>
`;

const customColorsCode = `import { HoverCard } from '@/components/ui/hover-card';

<HoverCard
  title="Summer Collection"
  description="Discover our new summer collection with vibrant colors and comfortable fabrics"
  imageUrl="https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg"
  imageAlt="Fashion collection"
  ctaText="Shop Now"
  ctaHref="#"
  backgroundColor="#2c3e50"
  titleColor="#ecf0f1"
  descriptionColor="#bdc3c7"
  buttonColor="#e74c3c"
  buttonHoverColor="#c0392b"
  buttonTextColor="#ffffff"
  transitionDuration={0.6}
/>
`;

const smallCardCode = `import { HoverCard } from '@/components/ui/hover-card';

<HoverCard
  title="Quick Tips"
  description="5 minute recipes for busy weeknights"
  imageUrl="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
  imageAlt="Delicious food"
  ctaText="View Recipes"
  ctaHref="#"
  className="w-[250px] h-[350px]"
  containerClassName="w-[250px] h-[350px]"
/>
`;

const rows: PropsTableRow[] = [
  { 
    prop: "title", 
    type: "string", 
    required: true, 
    description: "The title of the card" 
  },
  { 
    prop: "description", 
    type: "string", 
    required: true, 
    description: "The description text" 
  },
  { 
    prop: "imageUrl", 
    type: "string", 
    required: true, 
    description: "URL of the image to display" 
  },
  { 
    prop: "imageAlt", 
    type: "string", 
    required: true, 
    description: "Alternative text for the image" 
  },
  { 
    prop: "ctaText", 
    type: "string", 
    required: false, 
    defaultValue: '"Read More"', 
    description: "Text for the call-to-action button" 
  },
  { 
    prop: "ctaHref", 
    type: "string", 
    required: false, 
    defaultValue: "#", 
    description: "URL the CTA button should link to" 
  },
  { 
    prop: "backgroundColor", 
    type: "string", 
    required: false, 
    defaultValue: '"#3d3b36"', 
    description: "Background color of the card content" 
  },
  { 
    prop: "titleColor", 
    type: "string", 
    required: false, 
    defaultValue: '"#d6bb9a"', 
    description: "Color of the title text" 
  },
  { 
    prop: "descriptionColor", 
    type: "string", 
    required: false, 
    defaultValue: '"#f9eedc"', 
    description: "Color of the description text" 
  },
  { 
    prop: "buttonColor", 
    type: "string", 
    required: false, 
    defaultValue: '"#d6bb9a"', 
    description: "Background color of the CTA button" 
  },
  { 
    prop: "buttonTextColor", 
    type: "string", 
    required: false, 
    defaultValue: '"#1c1c1c"', 
    description: "Text color of the CTA button" 
  },
  { 
    prop: "buttonHoverColor", 
    type: "string", 
    required: false, 
    defaultValue: '"#f9eedc"', 
    description: "Hover state background color of the CTA button" 
  },
  { 
    prop: "transitionDuration", 
    type: "number", 
    required: false, 
    defaultValue: '0.5', 
    description: "Transition duration in seconds" 
  },
  { 
    prop: "className", 
    type: "string", 
    required: false, 
    description: "Custom class name for the card" 
  },
  { 
    prop: "containerClassName", 
    type: "string", 
    required: false, 
    description: "Custom class name for the card container" 
  },
];

const componentCode = `import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface HoverCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  buttonHoverColor?: string;
  transitionDuration?: number;
  containerClassName?: string;
}

export const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(({
  title,
  description,
  imageUrl,
  imageAlt,
  ctaText = "Read More",
  ctaHref = "#",
  backgroundColor = "#3d3b36",
  titleColor = "#d6bb9a",
  descriptionColor = "#f9eedc",
  buttonColor = "#d6bb9a",
  buttonTextColor = "#1c1c1c",
  buttonHoverColor = "#f9eedc",
  transitionDuration = 0.5,
  className,
  containerClassName,
  ...props
}, ref) => {
  return (
    <div 
      ref={ref}
      className={cn(
        'relative w-full max-w-[300px] h-[400px] overflow-hidden rounded-lg shadow-md',
        'group transition-all duration-300 hover:shadow-lg',
        containerClassName
      )}
      {...props}
    >
      <div 
        className={cn(
          'absolute inset-0 w-full h-full transition-transform duration-500',
          'group-hover:translate-x-[300px]',
          className
        )}
      >
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </div>

      <div 
        className={cn(
          'absolute inset-0 w-full h-full transition-transform duration-500',
          'flex flex-col justify-start p-6',
          'translate-x-0 group-hover:translate-x-0',
          'bg-opacity-90',
          className
        )}
        style={{
          backgroundColor,
          transform: 'translateX(-100%)',
          transitionDuration: '\${transitionDuration}s',
        }}
      >
        <h2 
          className="text-2xl font-bold mb-4"
          style={{ color: titleColor }}
        >
          {title}
        </h2>
        <p 
          className="text-sm mb-6"
          style={{ color: descriptionColor }}
        >
          {description}
        </p>
        <a
          href={ctaHref}
          className={cn(
            'mt-auto py-2 px-4 rounded-md text-center font-medium',
            'transition-colors duration-300',
            'w-1/2 group-hover:w-[85%]',
            className
          )}
          style={{
            backgroundColor: buttonColor,
            color: buttonTextColor,
            transitionDuration: '\${transitionDuration}s',
          }}
          onMouseOver={(e) => {
            (e.target as HTMLElement).style.backgroundColor = buttonHoverColor;
          }}
          onMouseOut={(e) => {
            (e.target as HTMLElement).style.backgroundColor = buttonColor;
          }}
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
});

HoverCard.displayName = 'HoverCard';`;

function HoverCardPage() {
  return (
    <MainLayout>
      <div className="px-6 py-16 w-full">
        <PageTitle data-toc>Hover Card</PageTitle>
        <p className="text-white/60 max-w-xl">
          A stylish card with a hover effect that reveals additional content. Perfect for showcasing products, features, or articles.
        </p>

        <div className="mt-8 flex flex-col gap-10">
          <PreviewTabs title="Default" codeText={defaultCode}>
              <HoverCard
                title="Create Coffee Masterpieces"
                description="Learn the art of latte design and transform your everyday brew into something extraordinary"
                imageUrl="https://images.pexels.com/photos/302896/pexels-photo-302896.jpeg"
                imageAlt="Coffee art"
                ctaText="Start Learning"
                ctaHref="#"
              />
          </PreviewTabs>

          <PreviewTabs title="Custom Colors" codeText={customColorsCode}>
              <HoverCard
                title="Summer Collection"
                description="Discover our new summer collection with vibrant colors and comfortable fabrics"
                imageUrl="https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg"
                imageAlt="Fashion collection"
                ctaText="Shop Now"
                ctaHref="#"
                backgroundColor="#2c3e50"
                titleColor="#ecf0f1"
                descriptionColor="#bdc3c7"
                buttonColor="#e74c3c"
                buttonHoverColor="#c0392b"
                buttonTextColor="#ffffff"
                transitionDuration={0.6}
              />
          </PreviewTabs>

          <PreviewTabs title="Small Card" codeText={smallCardCode}>
              <HoverCard
                title="Quick Tips"
                description="5 minute recipes for busy weeknights"
                imageUrl="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
                imageAlt="Delicious food"
                ctaText="View Recipes"
                ctaHref="#"
                className="w-[250px] h-[350px]"
                containerClassName="w-[250px] h-[350px]"
              />
          </PreviewTabs>
        </div>

        <UsageSection
          title="Component Code"
          description="A customizable card with a hover effect that reveals additional content. The component is built with CSS transitions for smooth animations and is fully responsive."
          code={componentCode}
        />

        <DocsSection
          description={
            <>
              <p className="mb-4">
                <strong>Hover Card</strong> — A visually appealing card component that reveals additional content on hover. The card features a smooth slide animation that moves the image to the right while sliding in the content panel from the left.
              </p>
              <p className="mb-4">
                The component is highly customizable with props for colors, text, and transition timing. It's built with accessibility in mind and works well on both desktop and mobile devices.
              </p>
              <p className="mb-4">
                On mobile devices, the hover effect is replaced with a tap interaction, making it fully functional on touch screens.
              </p>
            </>
          }
          rows={rows}
        />
      </div>
    </MainLayout>
  );
}

export default HoverCardPage;
