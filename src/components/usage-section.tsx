// components/UsageSection.tsx
"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import { CopyButton } from "./copy-button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface UsageSectionProps {
    /** Markdown / JSX description placed under the title */
    description: React.ReactNode;
    /** Raw code string displayed inside the snippet block */
    code: string;
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
export function UsageSection({
    description,
    code,
    className,
}: UsageSectionProps) {
    return (
        <section className={cn("mt-20 scroll-m-14", className)}>
            {/* Heading */}
            <h1
                data-toc
                className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
                Usage
            </h1>

            {/* Description */}
            <p className="max-w-3xl text-base leading-relaxed text-slate-300">
                {description}
            </p>

            {/* Code snippet */}
            <Card className="mt-9 w-full max-h-[500px] max-w-[738px] mx-auto overflow-clip overflow-y-auto no-scrollbar">
                <CardContent className="relative">
                    {/* Copy button */}
                    <div className="absolute right-8">
                        <CopyButton copyText={code} />
                    </div>

                    <SyntaxHighlighter
                        className="no-scrollbar"
                        language={'tsx'}
                        style={atomDark}
                        customStyle={{
                            margin: 0,
                            padding: 0,
                            background: "transparent",
                            fontSize: "0.875rem",
                        }}
                        wrapLines={true}
                        PreTag="div"
                    >
                        {String(code)}
                    </SyntaxHighlighter>

                </CardContent>
            </Card>
        </section>
    );
}
