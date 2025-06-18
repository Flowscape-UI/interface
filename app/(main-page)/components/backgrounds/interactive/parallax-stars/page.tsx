// app/(docs)/interactive-backgrounds/page.tsx
"use client";
/**
 * ────────────────────────────────────────────────────────────────────────────
 * Interactive Backgrounds — Demo & Docs Page
 * --------------------------------------------------------------------------
 * 📑  What this file does
 *     • Presents several pointer‑aware background components inside
 *       <PreviewTabs>, each with live demo + highlighted source.
 *     • Provides a <UsageSection> (copy‑paste snippet) and a <DocsSection>
 *       (Markdown description + auto Table‑of‑Props).
 *
 *     All headings that should appear in the global Table‑of‑Contents carry the
 *     `data-toc` attribute — no extra config needed for <TableOfContents />.
 *
 * 🛠  How to extend
 *     1. Add a new preview → push another <PreviewTabs> with custom code/demo.
 *     2. Extend the props table → append to `rows` below.
 *     3. Design tweaks    → edit tailwind classes; layout stays responsive.
 * --------------------------------------------------------------------------*/
import React, { useRef, useEffect, useState } from "react";
import PageTitle from "@/components/ui/page-title";
import { PreviewTabs } from "@/components/preview-tabs";
import { cn } from "@/lib/utils";
import { PropsTableRow } from "@/components/props-table";
import { UsageSection } from "@/components/usage-section";
import { DocsSection } from "@/components/docs-section";

/* --------------------------------------------------------------------------
 * ParallaxStarsInteractive — inline component for demo purposes only
 * --------------------------------------------------------------------------*/
interface StarConfig {
    x: number; // 0–100 % horizontally
    y: number; // 0–100 % vertically
    size: number; // px
    depth: number; // 0–1 for parallax strength + opacity
}

interface ParallaxStarsProps {
    className?: string;
    classNameStars?: string;
    count?: number;
    parallax?: number;
    mode?: "normal" | "inverse";
    renderStar?: (star: StarConfig, index: number) => React.ReactNode;
}

/**
 * Lightweight parallax star‑field. Default star is a 1–3 px white dot, but you
 * can pass `renderStar` to supply emoji / SVG / IMG.
 */
function ParallaxStarsInteractive({
    className,
    classNameStars,
    count = 60,
    parallax = 20,
    mode = "normal",
    renderStar,
}: ParallaxStarsProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [stars] = useState<StarConfig[]>(() =>
        Array.from({ length: count }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 1 + Math.random() * 2,
            depth: 0.3 + Math.random() * 0.7,
        }))
    );

    /* pointer‑move → translate children */
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const sign = mode === "inverse" ? 1 : -1;
        const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const rx = (e.clientX - r.left - r.width / 2) / r.width;
            const ry = (e.clientY - r.top - r.height / 2) / r.height;
            stars.forEach((s, i) => {
                const child = el.children[i] as HTMLElement;
                child.style.transform = `translate(${rx * sign * parallax * s.depth}px, ${ry * sign * parallax * s.depth}px)`;
            });
        };
        el.addEventListener("pointermove", move);
        return () => el.removeEventListener("pointermove", move);
    }, [stars, parallax, mode]);

    return (
        <div ref={ref} className={cn("relative h-64 w-full overflow-hidden rounded-lg bg-slate-900", className)}>
            {stars.map((s, i) => {
                const style: React.CSSProperties = {
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    width: s.size,
                    height: s.size,
                    opacity: s.depth,
                    position: "absolute",
                    pointerEvents: "none",
                };
                return (
                    <div key={i} style={style} className={cn(renderStar ? null : "rounded-full bg-white", classNameStars)}>
                        {renderStar?.(s, i)}
                    </div>
                );
            })}
        </div>
    );
}

/* --------------------------------------------------------------------------
 * Demo code snippet (shown in PreviewTabs)
 * --------------------------------------------------------------------------*/
const demoCode = `import ParallaxStarsInteractive from "@/components/ParallaxStarsInteractive";

<ParallaxStarsInteractive parallax={30} mode="inverse" />`;

/* --------------------------------------------------------------------------
 * Props table rows
 * --------------------------------------------------------------------------*/
const rows: PropsTableRow[] = [
    { prop: "count", type: "number", required: false, defaultValue: "60", description: "Total amount of stars." },
    { prop: "parallax", type: "number", required: false, defaultValue: "20", description: "Translation multiplier (px)." },
    { prop: "mode", type: '"normal" | "inverse"', required: false, defaultValue: "\"normal\"", description: "Direction relative to pointer." },
    { prop: "renderStar", type: "(star, i) => ReactNode", required: false, defaultValue: "undefined", description: "Custom star renderer." },
];

/* --------------------------------------------------------------------------
 * Page component
 * --------------------------------------------------------------------------*/
export default function InteractiveBackgroundsPage() {
    return (
        <div className="w-full px-6 py-16">
            <PageTitle data-toc>Interactive backgrounds</PageTitle>
            <p className="max-w-xl text-white/60">
                Sprinkle life behind your content. Below are three lightweight, pointer‑aware backgrounds — no heavy WebGL needed.
            </p>

            {/* Live previews */}
            <div className="mt-8 flex flex-col gap-10">
                <PreviewTabs title="Default star-field" codeText={demoCode}>
                    <ParallaxStarsInteractive className="size-full" />
                </PreviewTabs>

                <PreviewTabs title="Emoji pattern" codeText={demoCode}>
                    <ParallaxStarsInteractive className="size-full" renderStar={(s) => <span style={{ fontSize: s.size * 4 }}>✨</span>} />
                </PreviewTabs>

                <PreviewTabs title="Inverse direction" codeText={demoCode}>
                    <ParallaxStarsInteractive className="size-full" mode="inverse" />
                </PreviewTabs>
            </div>

            {/* Usage snippet */}
            <UsageSection
                description="Drop the component into any hero / header section. Tweak star count, parallax strength or pass an emoji renderer for a playful look."
                code={demoCode}
            />

            {/* Detailed props */}
            <DocsSection
                description="Below is every prop you can tune — all optional, safe defaults provided."
                rows={rows}
            />
        </div>
    );
}
