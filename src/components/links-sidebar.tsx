// components/LinksSidebar.client.tsx
import { useState, useEffect, Fragment } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link, useRouter } from '@tanstack/react-router';

/* --------------------------------------------------
 * Types -------------------------------------------------- */
interface LeafItem {
    label: string;
    href: string;
}
interface BranchItem {
    label: string;
    children: NavItem[];
}
type NavItem = LeafItem | BranchItem;

interface Section {
    section: string;
    children: NavItem[];
}

/* --------------------------------------------------
 * Navigation schema (any depth) --------------------- */
export const nav: Section[] = [
    {
        section: 'Getting Started',
        children: [
            { href: '/docs/installation', label: 'Installation' },
            { href: '/docs/quick-start', label: 'Quick Start' },
            { href: '/docs/philosophy', label: 'Philosophy' },
            { href: '/docs/about-us', label: 'About Us' },
        ],
    },
    {
        section: 'Components',
        children: [
            { href: '/components/buttons', label: 'Buttons' },
            { href: '/components/inputs', label: 'Inputs' },
            { href: '/components/cards', label: 'Cards' },
        ],
    },
    {
        section: 'Patterns',
        children: [
            { href: '/components/auth', label: 'Auth panels' },
            { href: '/components/empty-states', label: 'Empty states' },
        ],
    },
    {
        section: 'Utilities',
        children: [
            {
                label: 'Backgrounds',
                children: [
                    {
                        label: 'Interactive',
                        children: [
                            {
                                href: '/components/backgrounds/interactive/dot-pattern',
                                label: 'Dot pattern',
                            },
                            {
                                href: '/components/backgrounds/interactive/aurora-gradient',
                                label: 'Aurora gradient',
                            },
                            {
                                href: '/components/backgrounds/interactive/parallax-stars',
                                label: 'Parallax stars',
                            },
                        ],
                    },
                    {
                        label: 'Animated',
                        children: [
                            {
                                href: '/components/backgrounds/animated/css-keyframes',
                                label: 'CSS keyframes',
                            },
                            { href: '/components/backgrounds/animated/lottie', label: 'Lottie' },
                        ],
                    },
                    {
                        label: 'Static',
                        children: [
                            {
                                href: '/components/backgrounds/static/gradients',
                                label: 'Gradients',
                            },
                            { href: '/components/backgrounds/static/images', label: 'Images' },
                        ],
                    },
                ],
            },
            { href: '/components/loaders', label: 'Loaders' },
        ],
    },
];

/* --------------------------------------------------
 * Storage helpers ---------------------------------- */
const STORE_KEY = 'sidebar-hidden-v2'; // v2 because key schema changed

const readHidden = (): Set<string> => {
    if (typeof window === 'undefined') return new Set();
    try {
        const raw = localStorage.getItem(STORE_KEY);
        return raw ? new Set<string>(JSON.parse(raw)) : new Set();
    } catch {
        return new Set();
    }
};

const writeHidden = (set: Set<string>) => {
    localStorage.setItem(STORE_KEY, JSON.stringify([...set]));
};

/* --------------------------------------------------
 * Recursive components ------------------------------ */
function SidebarNode({
    item,
    path,
    depth,
    hidden,
    toggle,
    pathname,
}: {
    item: NavItem;
    path: string; // e.g. "0-1-2"
    depth: number;
    hidden: Set<string>;
    toggle: (key: string) => void;
    pathname: string;
}) {
    const indent = depth * 1; // em units for nested padding

    // Leaf node ---------------------------------------
    if ('href' in item) {
        return (
            <li key={path} style={{ paddingLeft: `${indent * 0.75}rem` }}>
                <Link
                    to={item.href}
                    className={cn(
                        'block rounded px-3 py-1.5 text-white/70 transition hover:bg-white/10',
                        pathname.startsWith(item.href) && 'bg-sky-600',
                    )}
                >
                    {item.label}
                </Link>
            </li>
        );
    }

    // Branch node -------------------------------------
    const branchKey = path;
    const isOpen = !hidden.has(branchKey);
    const branchActive = branchContainsPath(item, pathname);

    return (
        <Fragment key={branchKey}>
            <li style={{ paddingLeft: `${indent * 0.75}rem` }}>
                <button
                    onClick={() => toggle(branchKey)}
                    className={cn(
                        'flex w-full items-center justify-between rounded px-2 py-1.5 text-base font-medium md:text-sm',
                        branchActive ? 'text-sky-400' : 'text-white',
                        'hover:text-sky-300',
                    )}
                >
                    {item.label}
                    {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
            </li>
            {isOpen && (
                <ul className="space-y-1">
                    {item.children.map((child, i) => (
                        <SidebarNode
                            key={`${branchKey}-${i}`}
                            item={child}
                            path={`${branchKey}-${i}`}
                            depth={depth + 1}
                            hidden={hidden}
                            toggle={toggle}
                            pathname={pathname}
                        />
                    ))}
                </ul>
            )}
        </Fragment>
    );
}

function branchContainsPath(branch: BranchItem, pathname: string): boolean {
    return branch.children.some((child) => {
        if ('href' in child) return pathname.startsWith(child.href);
        return branchContainsPath(child, pathname);
    });
}

/* --------------------------------------------------
 * Main sidebar component --------------------------- */
export default function LinksSidebar() {
    // const pathname = usePathname();
    const pathname = useRouter().state.location.pathname;
    console.log('pathname', pathname);
    const [hidden, setHidden] = useState<Set<string>>(readHidden);

    // persist on change
    useEffect(() => writeHidden(hidden), [hidden]);

    const toggle = (key: string) =>
        setHidden((prev) => {
            const next = new Set(prev);
            next.has(key) ? next.delete(key) : next.add(key);
            return next;
        });

    return (
        <>
            {nav.map((sec, idx) => {
                const openSection = !hidden.has(String(idx));
                const sectionActive = sec.children.some(
                    (n) =>
                        branchContainsPath({ label: '', children: [n] } as BranchItem, pathname) ||
                        ('href' in n && pathname.startsWith(n.href)),
                );
                return (
                    <div key={sec.section} className="mb-6">
                        <button
                            onClick={() => toggle(String(idx))}
                            className={cn(
                                'flex w-full items-center justify-between text-sm font-semibold tracking-wide uppercase md:text-xs',
                                sectionActive ? 'text-sky-400' : 'text-white',
                                'hover:text-sky-300',
                            )}
                        >
                            {sec.section}
                            {openSection ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>

                        {openSection && (
                            <ul className="mt-3 space-y-1 text-base">
                                {sec.children.map((item, i) => (
                                    <SidebarNode
                                        key={`${idx}-${i}`}
                                        item={item}
                                        path={`${idx}-${i}`}
                                        depth={1}
                                        hidden={hidden}
                                        toggle={toggle}
                                        pathname={pathname}
                                    />
                                ))}
                            </ul>
                        )}
                    </div>
                );
            })}
        </>
    );
}

/* --------------------------------------------------
 * End
 * -------------------------------------------------- */
