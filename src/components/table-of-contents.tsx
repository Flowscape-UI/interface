import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import { Link, useRouter } from '@tanstack/react-router';

export default function TableOfContents() {
    const pathname = useRouter().state.location.pathname;
    const [items, setItems] = useState<{ id: string; text: string; level: number }[]>([]);
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            const selector = '[data-toc]';
            const heads = Array.from(document.querySelectorAll<HTMLElement>(selector));

            const wrapper = document.getElementById('table-of-contents-wrapper');
            if (wrapper) {
                wrapper.dataset.tocRendered = String(heads.length > 0);
            }

            const mapped = heads.map((el) => {
                if (!el.id) {
                    el.id =
                        el.textContent
                            ?.toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/^-|-$|/g, '') ?? 'heading';
                }
                const level = el.tagName === 'H1' ? 1 : el.tagName === 'H2' ? 2 : 3;
                return { id: el.id, text: el.textContent || '', level };
            });

            setItems(mapped);

            if (heads.length === 0) {
                return;
            }

            const observer = new IntersectionObserver(
                (entries) => {
                    const visible = entries.filter((e) => e.isIntersecting);
                    if (visible.length > 0) {
                        setActive(visible[0].target.id);
                    }
                },
                { rootMargin: '-20% 0px -40% 0px' },
            );

            heads.forEach((h) => observer.observe(h));

            return () => observer.disconnect();
        }, 100);

        return () => clearTimeout(timer);
    }, [pathname]);

    if (items.length === 0) return null;

    return (
        <nav className="sticky top-0 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 text-sm">
            <h2 className="mb-4 text-sm font-semibold text-white/80">On this page</h2>
            <ul className="space-y-1 border-l border-white/10 pl-3">
                {items.map(({ id, text, level }) => (
                    <li key={id} className={cn(level === 3 && 'pl-4', level === 2 && 'pl-2')}>
                        <Link
                            to={pathname as string}
                            hash={id}
                            onClick={() => setActive(id)}
                            className={cn(
                                'block truncate text-white/60 hover:text-white',
                                active === id && 'text-sky-400',
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
