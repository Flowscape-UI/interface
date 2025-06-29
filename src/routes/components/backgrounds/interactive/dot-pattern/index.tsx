import { useRef, useEffect, useState, useCallback } from 'react';
import PageTitle from '@/components/ui/page-title';
import { PreviewTabs } from '@/components/preview-tabs';
import { UsageSection } from '@/components/usage-section';
import { cn } from '@/lib/utils';
import { DocsSection } from '@/components/docs-section';
import type { PropsTableRow } from '@/components/props-table';
import { createFileRoute } from '@tanstack/react-router';
import { MainLayout } from '@/main-layout';
import { useTranslation } from '@/hooks/use-translation';

export const Route = createFileRoute('/components/backgrounds/interactive/dot-pattern/')({
    component: DotPatternPage,
});

function DotPatternPage() {
    const { t } = useTranslation();
    return (
        <MainLayout>
            <div className="w-full px-6 py-16">
                <PageTitle data-toc>Interactive backgrounds</PageTitle>
                <p className="max-w-xl text-white/60">
                    {t(
                        'Sprinkle life behind your content. Below are three lightweight, pointer-aware backgrounds you can drop into any section — no heavy WebGL required.',
                    )}
                </p>

                <div className="mt-8 flex flex-col gap-10">
                    <PreviewTabs
                        title="Whole functionality for Dot Pattern"
                        codeText={dotPatternDefaultCode}
                    >
                        <DotPatternInteractive
                            gap={16}
                            baseRadius={1}
                            maxRadius={3}
                            reach={80}
                            staticColor="#64748b"
                            activeColor="#38bdf8"
                            className="absolute inset-0 top-1/2 left-1/2 size-full -translate-x-1/2 -translate-y-1/2"
                            trailing
                            trailLength={20}
                            minTrailLength={1}
                            animate="on-hover"
                            trailingRadius={10}
                            trailingGradient={{ from: '#38bdf8', to: '#FF0000' }}
                            trailingLifetime={50}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-black mask-[radial-gradient(600px_circle_at_center,transparent,black)]" />
                    </PreviewTabs>

                    <PreviewTabs title="Without trailing" codeText={dotPatternWithoutTrailingCode}>
                        <DotPatternInteractive
                            gap={16}
                            baseRadius={1}
                            maxRadius={3}
                            reach={80}
                            staticColor="#64748b"
                            activeColor="#38bdf8"
                            className="absolute inset-0 top-1/2 left-1/2 size-full -translate-x-1/2 -translate-y-1/2"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-black mask-[radial-gradient(600px_circle_at_center,transparent,black)]" />
                    </PreviewTabs>

                    <PreviewTabs
                        title="Only when mouse clicked"
                        codeText={dotPatternWhenMouseClickedCode}
                    >
                        <DotPatternInteractive
                            gap={16}
                            baseRadius={1}
                            maxRadius={3}
                            reach={80}
                            staticColor="#64748b"
                            activeColor="#38bdf8"
                            className="absolute inset-0 top-1/2 left-1/2 size-full -translate-x-1/2 -translate-y-1/2"
                            animate="on-action"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-black mask-[radial-gradient(600px_circle_at_center,transparent,black)]" />
                    </PreviewTabs>
                </div>

                <UsageSection
                    description={
                        <>
                            {t(`A CSS radial gradient that follows the pointer. The gradient is
                        configurable, and you can use it as a background for any element.`)}
                        </>
                    }
                    code={componentCode}
                />

                <DocsSection
                    description={
                        <>
                            <p className="mb-4">
                                <strong>Interactive dot-grid background</strong> &mdash;{' '}
                                {t(`a
                            lightweight `)}
                                <code>&lt;canvas&gt;</code>{' '}
                                {t(`effect with zero external
                            dependencies.`)}
                            </p>
                        </>
                    }
                    rows={rows}
                />
            </div>
        </MainLayout>
    );
}

const rows: PropsTableRow[] = [
    {
        prop: 'gap',
        type: 'number',
        required: false,
        defaultValue: '40',
        description: 'Расстояние между точками сетки.',
    },
    {
        prop: 'baseRadius',
        type: 'number',
        required: false,
        defaultValue: '2',
        description: 'Базовый радиус каждой точки.',
    },
    {
        prop: 'maxRadius',
        type: 'number',
        required: false,
        defaultValue: '6',
        description: 'Максимальный радиус точки при наведении.',
    },
    {
        prop: 'reach',
        type: 'number',
        required: false,
        defaultValue: '150',
        description: 'Радиус области взаимодействия курсора.',
    },
    {
        prop: 'blur',
        type: 'number',
        required: false,
        defaultValue: '0',
        description: 'Размытие точек (CSS blur).',
    },
    {
        prop: 'staticColor',
        type: 'string',
        required: false,
        defaultValue: "'#64748b'",
        description: 'Цвет точек по умолчанию.',
    },
    {
        prop: 'activeColor',
        type: 'string',
        required: false,
        defaultValue: "'#38bdf8'",
        description: 'Цвет точек при наведении.',
    },
    {
        prop: 'trailing',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'Включить хвост за курсором.',
    },
    {
        prop: 'trailLength',
        type: 'number',
        required: false,
        defaultValue: '20',
        description: 'Максимальная длина хвоста.',
    },
    {
        prop: 'minTrailLength',
        type: 'number',
        required: false,
        defaultValue: '4',
        description: 'Минимальная длина хвоста.',
    },
    {
        prop: 'trailingLifetime',
        type: 'number',
        required: false,
        defaultValue: '50',
        description: 'Время жизни хвоста (мс).',
    },
    {
        prop: 'trailingRadius',
        type: 'number',
        required: false,
        defaultValue: '10',
        description: 'Радиус точек хвоста.',
    },
    {
        prop: 'trailingColor',
        type: 'string',
        required: false,
        defaultValue: "'#38bdf8'",
        description: 'Цвет хвоста (если не используется градиент).',
    },
    {
        prop: 'trailingGradient',
        type: '{ from: string; to: string }',
        required: false,
        defaultValue: "{ from: '#38bdf8', to: '#FF0000' }",
        description: 'Градиент цвета хвоста.',
    },
    {
        prop: 'animate',
        type: "'on-hover' | 'on-action'",
        required: false,
        defaultValue: "'on-hover'",
        description: 'Режим анимации: при наведении или при клике.',
    },
    {
        prop: 'drawEffect',
        type: "'normal' | 'fish-eye'",
        required: false,
        defaultValue: "'normal'",
        description: 'Эффект отображения точек: обычный или fish-eye.',
    },
    {
        prop: 'className',
        type: 'string',
        required: false,
        defaultValue: "''",
        description: 'Дополнительные CSS-классы для canvas.',
    },
];

/* --------------------------------------------------
 * 1. DotPatternInteractive — configurable canvas background
 *    (container‑aware ResizeObserver implementation)
 * -------------------------------------------------- */
interface DotPatternProps {
    gap?: number;
    baseRadius?: number;
    maxRadius?: number;
    reach?: number;
    blur?: number;
    staticColor?: string;
    activeColor?: string;
    trailing?: boolean;
    trailLength?: number;
    minTrailLength?: number;
    trailingLifetime?: number;
    trailingRadius?: number;
    trailingColor?: string;
    trailingGradient?: { from: string; to: string };
    animate?: 'on-hover' | 'on-action';
    drawEffect?: 'normal' | 'fish-eye';
    className?: string;
}

function DotPatternInteractive({
    className = '',
    gap = 40,
    baseRadius = 2,
    maxRadius = 6,
    reach = 150,
    blur = 0,
    staticColor = '#64748b',
    activeColor = '#38bdf8',
    trailing = false,
    trailLength = 20,
    minTrailLength = 4,
    trailingLifetime = 50,
    trailingRadius = 10,
    trailingColor = '#38bdf8',
    trailingGradient = { from: '#38bdf8', to: '#FF0000' },
    animate = 'on-hover',
    drawEffect = 'normal',
}: DotPatternProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [dpr, setDpr] = useState(1);
    const trail = useRef<{ x: number; y: number }[]>([]);
    const lastMove = useRef(Date.now());
    const active = useRef(animate === 'on-hover');

    /* ---------- helpers ---------- */
    const lerpColor = (a: string, b: string, t: number) => {
        const ca = parseInt(a.slice(1), 16);
        const cb = parseInt(b.slice(1), 16);
        const ar = (ca >> 16) & 255,
            ag = (ca >> 8) & 255,
            ab = ca & 255;
        const br = (cb >> 16) & 255,
            bg = (cb >> 8) & 255,
            bb = cb & 255;
        return (
            'rgb(' +
            Math.round(ar + (br - ar) * t) +
            ',' +
            Math.round(ag + (bg - ag) * t) +
            ',' +
            Math.round(ab + (bb - ab) * t) +
            ')'
        );
    };

    /* ---------- draw ---------- */
    const draw = useCallback(
        (pointer?: { x: number; y: number }) => {
            const cvs = canvasRef.current;
            if (!cvs) return;
            const ctx = cvs.getContext('2d');
            if (!ctx) return;

            ctx.clearRect(0, 0, cvs.width, cvs.height);
            ctx.filter = blur ? 'blur(' + blur * dpr + 'px)' : 'none';

            const rBase = baseRadius * dpr;
            const rHover = maxRadius * dpr;
            const reachPx = reach * dpr;

            for (let y = gap / 2; y < cvs.height; y += gap) {
                for (let x = gap / 2; x < cvs.width; x += gap) {
                    let r = rBase;
                    let color = staticColor;

                    // fish‑eye only when idle
                    if (!pointer && drawEffect === 'fish-eye') {
                        const cx = cvs.width / 2;
                        const cy = cvs.height / 2;
                        const tLens = 1 - Math.hypot(x - cx, y - cy) / Math.hypot(cx, cy);
                        r *= 0.5 + 0.5 * tLens;
                        color = lerpColor('#000000', staticColor, 0.3 + 0.7 * tLens);
                    }

                    // hover interaction
                    if (pointer) {
                        const d = Math.hypot(pointer.x - x, pointer.y - y);
                        if (d < reachPx) {
                            const t = 1 - d / reachPx;
                            r = rBase + t * (rHover - rBase);
                            color = lerpColor(color, activeColor, t);
                        }
                    }

                    ctx.beginPath();
                    ctx.arc(x, y, r, 0, Math.PI * 2);
                    ctx.fillStyle = color;
                    ctx.fill();
                }
            }

            /* trail */
            if (trailing && trail.current.length > 1) {
                ctx.filter = 'none';
                ctx.lineCap = 'round';
                const head = (trailingRadius ?? maxRadius) * dpr;
                for (let i = 0; i < trail.current.length - 1; i++) {
                    const p1 = trail.current[i];
                    const p2 = trail.current[i + 1];
                    const t = i / (trail.current.length - 1);
                    ctx.lineWidth = head * (1 - t);
                    ctx.strokeStyle = trailingGradient
                        ? lerpColor(trailingGradient.from, trailingGradient.to, t)
                        : (trailingColor ?? activeColor);
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        },
        [
            dpr,
            gap,
            baseRadius,
            maxRadius,
            reach,
            blur,
            staticColor,
            activeColor,
            drawEffect,
            trailing,
            trailingRadius,
            trailingColor,
            trailingGradient,
        ],
    );

    /* ---------- resize (container) ---------- */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const resize = () => {
            const scale = window.devicePixelRatio || 1;
            setDpr(scale);
            canvas.width = canvas.offsetWidth * scale;
            canvas.height = canvas.offsetHeight * scale;
            draw();
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);
        return () => ro.disconnect();
    }, [draw]);

    /* ---------- decay ---------- */
    useEffect(() => {
        if (!trailing) return;
        const tick = () => {
            if (
                Date.now() - lastMove.current > trailingLifetime &&
                trail.current.length > minTrailLength
            ) {
                trail.current.pop();
                draw(trail.current[0]);
            }
            requestAnimationFrame(tick);
        };
        const id = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(id);
    }, [draw, trailing, minTrailLength, trailingLifetime]);

    /* ---------- pointer events ---------- */
    useEffect(() => {
        const cvs = canvasRef.current;
        if (!cvs) return;
        const getPos = (e: PointerEvent) => {
            const rect = cvs.getBoundingClientRect();
            return { x: (e.clientX - rect.left) * dpr, y: (e.clientY - rect.top) * dpr };
        };
        const move = (e: PointerEvent) => {
            if (!active.current) return;
            const pos = getPos(e);
            lastMove.current = Date.now();
            if (trailing) {
                trail.current.unshift(pos);
                if (trail.current.length > trailLength) trail.current.pop();
            }
            draw(pos);
        };
        const down = (e: PointerEvent) => {
            if (animate === 'on-action') {
                active.current = true;
                trail.current = [getPos(e)];
            }
        };
        const clear = () => {
            active.current = animate === 'on-hover';
            trail.current = [];
            draw();
        };
        cvs.addEventListener('pointermove', move);
        cvs.addEventListener('pointerdown', down);
        cvs.addEventListener('pointerup', clear);
        cvs.addEventListener('pointerleave', clear);
        cvs.addEventListener('pointercancel', clear);
        return () => {
            cvs.removeEventListener('pointermove', move);
            cvs.removeEventListener('pointerdown', down);
            cvs.removeEventListener('pointerup', clear);
            cvs.removeEventListener('pointerleave', clear);
            cvs.removeEventListener('pointercancel', clear);
        };
    }, [dpr, draw, trailing, trailLength, animate]);

    return (
        <canvas
            ref={canvasRef}
            style={{ touchAction: 'none' }}
            className={cn('h-64 w-full rounded-lg select-none', className)}
        />
    );
}

/* --------------------------------------------------
 * 3. ParallaxStarsInteractive — star layer parallax on pointer
 * -------------------------------------------------- */
// function ParallaxStarsInteractive() {
//     const ref = useRef<HTMLDivElement | null>(null);

//     // generate star positions once
//     const [stars] = useState(() =>
//         Array.from({ length: 60 }).map(() => ({
//             x: Math.random() * 100,
//             y: Math.random() * 100,
//             size: 1 + Math.random() * 2,
//             depth: 0.3 + Math.random() * 0.7,
//         }))
//     );

//     useEffect(() => {
//         const el = ref.current;
//         if (!el) return;
//         const handle = (e: PointerEvent) => {
//             const rect = el.getBoundingClientRect();
//             const rx = (e.clientX - rect.width / 2) / rect.width;
//             const ry = (e.clientY - rect.height / 2) / rect.height;
//             stars.forEach((s, i) => {
//                 const star = el.children[i] as HTMLDivElement;
//                 star.style.transform = `translate(${rx * -20 * s.depth}px, ${ry * -20 * s.depth}px)`;
//             });
//         };
//         el.addEventListener("pointermove", handle);
//         return () => el.removeEventListener("pointermove", handle);
//     }, [stars]);

//     return (
//         <div ref={ref} className="relative h-64 w-full overflow-hidden rounded-lg bg-slate-900">
//             {stars.map((s, i) => (
//                 <div
//                     key={i}
//                     style={{
//                         left: `${s.x}%`,
//                         top: `${s.y}%`,
//                         width: s.size,
//                         height: s.size,
//                         opacity: s.depth,
//                     }}
//                     className="absolute rounded-full bg-white"
//                 />
//             ))}
//         </div>
//     );
// }

const dotPatternDefaultCode = `
<DotPatternInteractive
    gap={16}
    baseRadius={1}
    maxRadius={3}
    reach={80}
    staticColor="#64748b"
    activeColor="#38bdf8"
    className="absolute inset-0 top-1/2 left-1/2 size-full -translate-x-1/2 -translate-y-1/2"
    trailing
    trailLength={20}
    minTrailLength={1}
    animate="on-hover"
    trailingRadius={10}
    trailingGradient={{ from: '#38bdf8', to: '#FF0000' }}
    trailingLifetime={50}
/>
<div className="pointer-events-none absolute inset-0 bg-black mask-[radial-gradient(600px_circle_at_center,transparent,black)]" />`;

const dotPatternWithoutTrailingCode = `
<DotPatternInteractive
    gap={16}
    baseRadius={1}
    maxRadius={3}
    reach={80}
    staticColor="#64748b"
    activeColor="#38bdf8"
    className="absolute inset-0 top-1/2 left-1/2 size-full -translate-x-1/2 -translate-y-1/2"
/>`;

const dotPatternWhenMouseClickedCode = `
<DotPatternInteractive
    gap={16}
    baseRadius={1}
    maxRadius={3}
    reach={80}
    staticColor="#64748b"
    activeColor="#38bdf8"
    className="absolute inset-0 top-1/2 left-1/2 size-full -translate-x-1/2 -translate-y-1/2"
    animate="on-action"
/>
<div className="pointer-events-none absolute inset-0 bg-black mask-[radial-gradient(600px_circle_at_center,transparent,black)]" />`;

/* --------- Code snippets for PreviewTabs (trimmed for brevity) --------- */
const componentCode = `import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { useCallback, useEffect, useRef, useState } from 'react'
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

interface DotPatternProps {
  gap?: number;
  baseRadius?: number;
  maxRadius?: number;
  reach?: number;
  blur?: number;
  staticColor?: string;
  activeColor?: string;
  trailing?: boolean;
  trailLength?: number;
  minTrailLength?: number;
  trailingLifetime?: number;
  trailingRadius?: number;
  trailingColor?: string;
  trailingGradient?: { from: string; to: string };
  animate?: 'on-hover' | 'on-action';
  drawEffect?: 'normal' | 'fish-eye';
  className?: string;
}

export function DotPatternInteractive({
  className = '',
  gap = 40,
  baseRadius = 2,
  maxRadius = 6,
  reach = 150,
  blur = 0,
  staticColor = '#64748b',
  activeColor = '#38bdf8',
  trailing = false,
  trailLength = 20,
  minTrailLength = 4,
  trailingLifetime = 50,
  trailingRadius = 10,
  trailingColor = '#38bdf8',
  trailingGradient = { from: '#38bdf8', to: '#FF0000' },
  animate = 'on-hover',
  drawEffect = 'normal',
}: DotPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dpr, setDpr] = useState(1);
  const trail = useRef<{ x: number; y: number }[]>([]);
  const lastMove = useRef(Date.now());
  const active = useRef(animate === 'on-hover');

  /* ---------- helpers ---------- */
  const lerpColor = (a: string, b: string, t: number) => {
      const ca = parseInt(a.slice(1), 16);
      const cb = parseInt(b.slice(1), 16);
      const ar = (ca >> 16) & 255,
          ag = (ca >> 8) & 255,
          ab = ca & 255;
      const br = (cb >> 16) & 255,
          bg = (cb >> 8) & 255,
          bb = cb & 255;
      return (
          'rgb(' +
          Math.round(ar + (br - ar) * t) +
          ',' +
          Math.round(ag + (bg - ag) * t) +
          ',' +
          Math.round(ab + (bb - ab) * t) +
          ')'
      );
  };

  /* ---------- draw ---------- */
  const draw = useCallback(
      (pointer?: { x: number; y: number }) => {
          const cvs = canvasRef.current;
          if (!cvs) return;
          const ctx = cvs.getContext('2d');
          if (!ctx) return;

          ctx.clearRect(0, 0, cvs.width, cvs.height);
          ctx.filter = blur ? 'blur(' + blur * dpr + 'px)' : 'none';

          const rBase = baseRadius * dpr;
          const rHover = maxRadius * dpr;
          const reachPx = reach * dpr;

          for (let y = gap / 2; y < cvs.height; y += gap) {
              for (let x = gap / 2; x < cvs.width; x += gap) {
                  let r = rBase;
                  let color = staticColor;

                  // fish‑eye only when idle
                  if (!pointer && drawEffect === 'fish-eye') {
                      const cx = cvs.width / 2;
                      const cy = cvs.height / 2;
                      const tLens = 1 - Math.hypot(x - cx, y - cy) / Math.hypot(cx, cy);
                      r *= 0.5 + 0.5 * tLens;
                      color = lerpColor('#000000', staticColor, 0.3 + 0.7 * tLens);
                  }

                  // hover interaction
                  if (pointer) {
                      const d = Math.hypot(pointer.x - x, pointer.y - y);
                      if (d < reachPx) {
                          const t = 1 - d / reachPx;
                          r = rBase + t * (rHover - rBase);
                          color = lerpColor(color, activeColor, t);
                      }
                  }

                  ctx.beginPath();
                  ctx.arc(x, y, r, 0, Math.PI * 2);
                  ctx.fillStyle = color;
                  ctx.fill();
              }
          }

          /* trail */
          if (trailing && trail.current.length > 1) {
              ctx.filter = 'none';
              ctx.lineCap = 'round';
              const head = (trailingRadius ?? maxRadius) * dpr;
              for (let i = 0; i < trail.current.length - 1; i++) {
                  const p1 = trail.current[i];
                  const p2 = trail.current[i + 1];
                  const t = i / (trail.current.length - 1);
                  ctx.lineWidth = head * (1 - t);
                  ctx.strokeStyle = trailingGradient
                      ? lerpColor(trailingGradient.from, trailingGradient.to, t)
                      : (trailingColor ?? activeColor);
                  ctx.beginPath();
                  ctx.moveTo(p1.x, p1.y);
                  ctx.lineTo(p2.x, p2.y);
                  ctx.stroke();
              }
          }
      },
      [
          dpr,
          gap,
          baseRadius,
          maxRadius,
          reach,
          blur,
          staticColor,
          activeColor,
          drawEffect,
          trailing,
          trailingRadius,
          trailingColor,
          trailingGradient,
      ],
  );

  /* ---------- resize (container) ---------- */
  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const resize = () => {
          const scale = window.devicePixelRatio || 1;
          setDpr(scale);
          canvas.width = canvas.offsetWidth * scale;
          canvas.height = canvas.offsetHeight * scale;
          draw();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);
      return () => ro.disconnect();
  }, [draw]);

  /* ---------- decay ---------- */
  useEffect(() => {
      if (!trailing) return;
      const tick = () => {
          if (
              Date.now() - lastMove.current > trailingLifetime &&
              trail.current.length > minTrailLength
          ) {
              trail.current.pop();
              draw(trail.current[0]);
          }
          requestAnimationFrame(tick);
      };
      const id = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(id);
  }, [draw, trailing, minTrailLength, trailingLifetime]);

  /* ---------- pointer events ---------- */
  useEffect(() => {
      const cvs = canvasRef.current;
      if (!cvs) return;
      const getPos = (e: PointerEvent) => {
          const rect = cvs.getBoundingClientRect();
          return { x: (e.clientX - rect.left) * dpr, y: (e.clientY - rect.top) * dpr };
      };
      const move = (e: PointerEvent) => {
          if (!active.current) return;
          const pos = getPos(e);
          lastMove.current = Date.now();
          if (trailing) {
              trail.current.unshift(pos);
              if (trail.current.length > trailLength) trail.current.pop();
          }
          draw(pos);
      };
      const down = (e: PointerEvent) => {
          if (animate === 'on-action') {
              active.current = true;
              trail.current = [getPos(e)];
          }
      };
      const clear = () => {
          active.current = animate === 'on-hover';
          trail.current = [];
          draw();
      };
      cvs.addEventListener('pointermove', move);
      cvs.addEventListener('pointerdown', down);
      cvs.addEventListener('pointerup', clear);
      cvs.addEventListener('pointerleave', clear);
      cvs.addEventListener('pointercancel', clear);
      return () => {
          cvs.removeEventListener('pointermove', move);
          cvs.removeEventListener('pointerdown', down);
          cvs.removeEventListener('pointerup', clear);
          cvs.removeEventListener('pointerleave', clear);
          cvs.removeEventListener('pointercancel', clear);
      };
  }, [dpr, draw, trailing, trailLength, animate]);

  return (
      <canvas
          ref={canvasRef}
          style={{ touchAction: 'none' }}
          className={cn('h-64 w-full rounded-lg select-none', className)}
      />
  );
}

`;
