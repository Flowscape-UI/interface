"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

/**
 * **TableOfContents** — автоматическая динамическая навигация по заголовкам.
 *
 * Компонент ищет все элементы с атрибутом `data-toc` (например, `<h2 data-toc>`)
 * и формирует из них многоуровневый список якорных ссылок. Текущий заголовок
 * подсвечивается через `IntersectionObserver`.
 *
 * **Ключевые моменты**
 * - Не требует пропсов — подключите в сайдбаре один раз.
 * - Поддерживает любую вложенность (`h2 », h3 », h4 …`).
 * - Sticky-позиционирование (`top-24`) + авто-scroll внутри.
 * - Автоматически генерирует `id` для заголовков по их тексту.
 *
 * ### Пример
 * ```tsx
 * import TableOfContents from "@/components/TableOfContents";
 *
 * export default function DocsPage() {
 *   return (
 *     <div className="mx-auto max-w-4xl lg:grid lg:grid-cols-[1fr_220px] gap-8">
 *       <article>
 *         <h2 data-toc>Installation</h2>
 *         <p>…</p>
 *         <h3 data-toc>Create app</h3>
 *         <p>…</p>
 *         <h2 data-toc>Usage</h2>
 *         <p>…</p>
 *       </article>
 *
 *       <aside className="hidden lg:block">
 *         <TableOfContents />
 *       </aside>
 *     </div>
 *   );
 * }
 * ```
 */
export default function TableOfContents() {
    const pathname = usePathname();
    const [items, setItems] = useState<{ id: string; text: string; level: number }[]>([]);
    const [active, setActive] = useState<string | null>(null);

    // collect headings once client‑side
    useEffect(() => {
        const selector = "[data-toc]";
        const heads = Array.from(document.querySelectorAll<HTMLElement>(selector));
        const mapped = heads.map((el) => {
            // generate/ensure id
            if (!el.id) {
                el.id = el.textContent
                    ?.toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$|/g, "") ?? "heading";
            }
            const level = el.tagName === "H1" ? 1 : el.tagName === "H2" ? 2 : 3;
            return { id: el.id, text: el.textContent || "", level };
        });
        setItems(mapped);

        // intersection observer for active highlight
        const io = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => (a.intersectionRect.top < b.intersectionRect.top ? -1 : 1));
                if (visible[0]) setActive(visible[0].target.id);
            },
            { rootMargin: "-20% 0px -40% 0px" }
        );
        heads.forEach((h) => io.observe(h));
        return () => io.disconnect();
    }, [pathname]);

    if (!items.length) return null;

    return (
        <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 text-sm">
            <h2 className="mb-4 text-sm font-semibold text-white/80">
                On this page
            </h2>
            <ul className="space-y-1 border-l border-white/10 pl-3">
                {items.map(({ id, text, level }) => (
                    <li key={id} className={cn(level === 3 && "pl-4", level === 2 && "pl-2")}>
                        <Link
                            href={`#${id}`}
                            className={cn(
                                "block truncate text-white/60 hover:text-white",
                                active === id && "text-sky-400"
                            )}
                        >
                            {text}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
