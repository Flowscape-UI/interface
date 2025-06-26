"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { PropsTable, type PropsTableRow } from "./props-table";
import { useTranslation } from "@/hooks/use-translation";

interface UsageSectionProps {
    /** Markdown / JSX description placed under the title */
    description: React.ReactNode;
    /** Raw code string displayed inside the snippet block */
    rows: PropsTableRow[];
    /** Additional className for the wrapping <section> */
    className?: string;
}

/**
 * Renders a reusable documentation “Usage” block:
 *  1. `<h2 data-toc>` – indexed by TableOfContents.
 *  2. description – any React children (markdown, paragraphs, lists…).
 *  3. code snippet – monospace block with optional filename label.
 *
 * ```tsx
 * <UsageSection
 *   title="Usage"
 *   description={
 *     <>The snippet below shows how to wire <code>&lt;Header/&gt;</code> …</>
 *   }
 *   code={`import Header from "@/components/Header";\n// ...`}
 *   fileName="DocsPage.tsx"
 * />
 * ```
 */
export function DocsSection({
    description,
    rows,
    className,
}: UsageSectionProps) {
    const {t} = useTranslation();
    return (
        <section className={cn("mt-20 scroll-m-14", className)}>
            {/* Heading */}
            <h1
                data-toc
                className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
                {t('Docs')}
            </h1>

            {/* Description */}
            <p className="max-w-3xl text-base leading-relaxed text-slate-300">
                {description}
            </p>

            <div className="mt-8">
                <PropsTable rows={rows}/>
            </div>
        </section>
    );
}
