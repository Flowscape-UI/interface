import { PreviewTabs } from '@/components/preview-tabs';
import PageTitle from '@/components/ui/page-title';
import { MainLayout } from '@/main-layout';
import { createFileRoute } from '@tanstack/react-router';
import { LetterGlitchCard } from '@/components/ui/letter-glitch-card';
import { UsageSection } from '@/components/usage-section';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { useTranslation } from '@/hooks/use-translation';

export const Route = createFileRoute('/components/cards/letter-glitch-card/')({
    component: LetterGlitchCardPage,
});

const defaultCode = `import { LetterGlitchCard } from '@/components/ui/letter-glitch-card';

<LetterGlitchCard
    title="Hello World"
    description="This is a card with the default glitch effect."
/>
`;

const fastFuriousCode = `import { LetterGlitchCard } from '@/components/ui/letter-glitch-card';

<LetterGlitchCard
    title="Cyber-Attack"
    description="A very fast and aggressive glitch effect."
    glitchColors={['#ff0000', '#ff7f00', '#ffff00']}
    glitchSpeed={10}
/>
`;

const slowSharpCode = `import { LetterGlitchCard } from '@/components/ui/letter-glitch-card';

<LetterGlitchCard
    title="Old Terminal"
    description="A slow, non-smooth animation for a retro feel."
    glitchColors={['#00ff00', '#008f00', '#003f00']}
    glitchSpeed={400}
    smooth={false}
/>
`;

const withVignetteCode = `import { LetterGlitchCard } from '@/components/ui/letter-glitch-card';

<LetterGlitchCard
    title="Cinematic"
    description="This card has center and outer vignettes enabled for a focused look."
    centerVignette
    outerVignette
/>
`;

const rows: PropsTableRow[] = [
    {
        prop: 'title',
        type: 'string',
        required: false,
        defaultValue: '""',
        description: 'The title of the card.',
    },
    {
        prop: 'description',
        type: 'string',
        required: false,
        defaultValue: '""',
        description: 'The description text of the card.',
    },
    {
        prop: 'className',
        type: 'string',
        required: false,
        defaultValue: '""',
        description: 'Custom classes for the main container.',
    },
    {
        prop: 'children',
        type: 'React.ReactNode',
        required: false,
        defaultValue: 'undefined',
        description: 'Content to be displayed inside the card.',
    },
    {
        prop: 'glitchColors',
        type: 'string[]',
        required: false,
        defaultValue: "['#2b4539', ...]",
        description: 'Controls the colors of the letters rendered in the canvas.',
    },
    {
        prop: 'glitchSpeed',
        type: 'number',
        required: false,
        defaultValue: '50',
        description: 'Controls the speed at which letters scramble in the animation.',
    },
    {
        prop: 'centerVignette',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'When true, renders a radial gradient in the center of the container.',
    },
    {
        prop: 'outerVignette',
        type: 'boolean',
        required: false,
        defaultValue: 'true',
        description:
            'When true, renders an inner radial gradient around the edges of the container.',
    },
    {
        prop: 'smooth',
        type: 'boolean',
        required: false,
        defaultValue: 'true',
        description: 'When true, smoothens the animation of the letters for a more subtle feel.',
    },
];

const componentCode = `import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface LetterGlitchProps {
  glitchColors?: string[];
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const LetterGlitch = ({
  glitchColors = ["#2b4539", "#61dca3", "#61b3dc"],
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  className = "",
  children,
}: LetterGlitchProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const letters = useRef<
    {
      char: string;
      color: string;
      targetColor: string;
      colorProgress: number;
    }[]
  >([]);
  const grid = useRef({ columns: 0, rows: 0 });
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const lastGlitchTime = useRef(Date.now());

  const fontSize = 16;
  const charWidth = 10;
  const charHeight = 20;

  const lettersAndSymbols = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
    "!","@","#","$","&","*","(",")","-","_","+","=","/","[","]","{","}",";",":","<",">",",",
    "0","1","2","3","4","5","6","7","8","9"
  ];

  const getRandomChar = () => {
    return lettersAndSymbols[
      Math.floor(Math.random() * lettersAndSymbols.length)
    ];
  };

  const getRandomColor = () => {
    return glitchColors[Math.floor(Math.random() * glitchColors.length)];
  };

  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\\d])([a-f\\d])([a-f\\d])$/i;
    hex = hex.replace(shorthandRegex, (r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const interpolateColor = (
    start: { r: number; g: number; b: number },
    end: { r: number; g: number; b: number },
    factor: number
  ) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor),
    };
    return \`rgb(\${result.r}, \${result.g}, \${result.b})\`;
  };

  const calculateGrid = (width: number, height: number) => {
    const columns = Math.ceil(width / charWidth);
    const rows = Math.ceil(height / charHeight);
    return { columns, rows };
  };

  const initializeLetters = (columns: number, rows: number) => {
    grid.current = { columns, rows };
    const totalLetters = columns * rows;
    letters.current = Array.from({ length: totalLetters }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1,
    }));
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = \`\${rect.width}px\`;
    canvas.style.height = \`\${rect.height}px\`;

    if (context.current) {
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const { columns, rows } = calculateGrid(rect.width, rect.height);
    initializeLetters(columns, rows);
    drawLetters();
  };

  const drawLetters = () => {
    if (!context.current || letters.current.length === 0) return;
    const ctx = context.current;
    const { width, height } = canvasRef.current!.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
    ctx.font = \`\${fontSize}px monospace\`;
    ctx.textBaseline = "top";

    letters.current.forEach((letter, index) => {
      const x = (index % grid.current.columns) * charWidth;
      const y = Math.floor(index / grid.current.columns) * charHeight;
      ctx.fillStyle = letter.color;
      ctx.fillText(letter.char, x, y);
    });
  };

  const updateLetters = () => {
    if (!letters.current || letters.current.length === 0) return;

    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length);
      if (!letters.current[index]) continue;

      letters.current[index].char = getRandomChar();
      letters.current[index].targetColor = getRandomColor();

      if (!smooth) {
        letters.current[index].color = letters.current[index].targetColor;
        letters.current[index].colorProgress = 1;
      } else {
        letters.current[index].colorProgress = 0;
      }
    }
  };

  const handleSmoothTransitions = () => {
    let needsRedraw = false;
    letters.current.forEach((letter) => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.05;
        if (letter.colorProgress > 1) letter.colorProgress = 1;

        const startRgb = hexToRgb(letter.color);
        const endRgb = hexToRgb(letter.targetColor);
        if (startRgb && endRgb) {
          letter.color = interpolateColor(
            startRgb,
            endRgb,
            letter.colorProgress
          );
          needsRedraw = true;
        }
      }
    });

    if (needsRedraw) {
      drawLetters();
    }
  };

  const animate = () => {
    const now = Date.now();
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters();
      drawLetters();
      lastGlitchTime.current = now;
    }

    if (smooth) {
      handleSmoothTransitions();
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    context.current = canvas.getContext("2d");
    resizeCanvas();
    animate();

    let resizeTimeout: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        cancelAnimationFrame(animationRef.current as number);
        resizeCanvas();
        animate();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glitchSpeed, smooth]);

  return (
    <div className={cn("relative bg-black overflow-hidden", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      {outerVignette && (
        <div
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0)_60%,_rgba(0,0,0,1)_100%)]"
        ></div>
      )}
      {centerVignette && (
        <div
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_0%,_rgba(0,0,0,0)_60%)]"
        ></div>
      )}
      {children && <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center">{children}</div>}
    </div>
  );
};

interface LetterGlitchCardProps extends LetterGlitchProps {
  title?: string;
  description?: string;
  className?: string;
}

export function LetterGlitchCard({
  title,
  description,
  className,
  ...props
}: LetterGlitchCardProps) {
  return (
    <LetterGlitch className={cn('h-[500px] w-80 rounded-lg p-4', className)} {...props}>
      <h3 className="text-2xl font-bold text-white">{title}</h3>
      <p className="mt-2 text-white/70">{description}</p>
    </LetterGlitch>
  );
}

import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

`;

function LetterGlitchCardPage() {
    const { t } = useTranslation();
    return (
        <MainLayout>
            <div className="w-full px-6 py-16">
                <PageTitle>Letter Glitch Card</PageTitle>
                <p className="max-w-xl text-white/60">
                    {t('A card component with a canvas-based animated glitch effect background')}.
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs
                        title="Default"
                        description={`${t('The default settings for the letter glitch card')}.`}
                        codeText={defaultCode}
                        reactBitsUrl="https://www.reactbits.dev/backgrounds/letter-glitch"
                    >
                        <LetterGlitchCard
                            title="Hello World"
                            description="This is a card with the default glitch effect."
                        />
                    </PreviewTabs>
                    <PreviewTabs
                        title="Fast & Furious"
                        description={`${t('A very fast and aggressive glitch effect')}.`}
                        codeText={fastFuriousCode}
                        reactBitsUrl="https://www.reactbits.dev/backgrounds/letter-glitch"
                    >
                        <LetterGlitchCard
                            title="Cyber-Attack"
                            description="A very fast and aggressive glitch effect."
                            glitchColors={['#ff0000', '#ff7f00', '#ffff00']}
                            glitchSpeed={10}
                        />
                    </PreviewTabs>
                    <PreviewTabs
                        title="Slow & Sharp"
                        description={`${t('A slow, non-smooth animation for a retro feel')}.`}
                        codeText={slowSharpCode}
                        reactBitsUrl="https://www.reactbits.dev/backgrounds/letter-glitch"
                    >
                        <LetterGlitchCard
                            title="Old Terminal"
                            description="A slow, non-smooth animation for a retro feel."
                            glitchColors={['#00ff00', '#008f00', '#003f00']}
                            glitchSpeed={400}
                            smooth={false}
                        />
                    </PreviewTabs>
                    <PreviewTabs
                        title="With Vignette"
                        description={`${t('This card has center and outer vignettes enabled for a focused look')}.`}
                        codeText={withVignetteCode}
                        reactBitsUrl="https://www.reactbits.dev/backgrounds/letter-glitch"
                    >
                        <LetterGlitchCard
                            title="Cinematic"
                            description="This card has center and outer vignettes enabled for a focused look."
                            centerVignette
                            outerVignette
                        />
                    </PreviewTabs>
                </div>

                <UsageSection
                    title="Component Code"
                    description={`${t('A component that creates a glitching text effect using an')} HTML canvas. ${t(`It's highly customizable through props`)}.`}
                    code={componentCode}
                />

                <DocsSection
                    description={
                        <>
                            <p className="mb-4">
                                <strong>Letter Glitch Card</strong> &mdash;{' '}
                                {t(
                                    'a customizable card component with a canvas-based animated glitch effect background',
                                )}
                                .
                            </p>
                        </>
                    }
                    rows={rows}
                />
            </div>
        </MainLayout>
    );
}
