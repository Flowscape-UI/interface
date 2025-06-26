import { type PropsWithChildren, useState, useEffect } from 'react';
import { ResizableBox } from 'react-resizable';
import { ChevronLeft, ChevronRight, PanelLeft, PanelRight } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';
import { cn } from './lib/utils';
import { Button } from './components/ui/button';
import { Header } from './components/header';
import LinksSidebar from './components/links-sidebar';
import TableOfContents from './components/table-of-contents';
import Footer from './components/footer';

interface MainLayoutProps extends PropsWithChildren {
    maxWidth?: string;
}

export const MainLayout = ({ children, maxWidth = 'max-w-3xl' }: MainLayoutProps) => {
    const [sidebarWidth, setSidebarWidth] = useState(250);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isRightSidebarOpen, setRightSidebarOpen] = useState(true);
    const [hasToc, setHasToc] = useState(false);

    const isDesktop = useMediaQuery('(min-width: 1675px)');
    const showToggleButton = useMediaQuery(
        '(min-width: 768px) and (max-width: 1674px)',
    );
    const isLargeScreen = useMediaQuery('(min-width: 1024px)');

    useEffect(() => {
        setSidebarOpen(isDesktop);
    }, [isDesktop]);

    useEffect(() => {
        if (!isLargeScreen) {
            setRightSidebarOpen(false);
        }
    }, [isLargeScreen]);

    useEffect(() => {
        const tocWrapper = document.getElementById('table-of-contents-wrapper');

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (
                    mutation.type === 'attributes' &&
                    mutation.attributeName === 'data-toc-rendered'
                ) {
                    const hasTocNow = (mutation.target as HTMLElement).dataset.tocRendered === 'true';
                    setHasToc(hasTocNow);
                }
            }
        });

        if (tocWrapper) {
            observer.observe(tocWrapper, { attributes: true });
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="mx-auto flex min-h-screen w-full flex-col">
            <Header />
            {/* Left sidebar toggle button */}
            {showToggleButton && (
                <Button
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                    variant="outline"
                    size="icon"
                    className="fixed top-1/2 z-1001 h-8 w-8 -translate-y-1/2 rounded-full bg-background transition-all duration-300 ease-in-out"
                    style={{
                        left: isSidebarOpen ? `${sidebarWidth - 16}px` : '1rem',
                    }}
                >
                    {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
                </Button>
            )}

            {/* Right sidebar toggle button */}
            {isLargeScreen && (
                <Button
                    onClick={() => setRightSidebarOpen(!isRightSidebarOpen)}
                    variant="ghost"
                    size="icon"
                    className={cn(
                        'fixed top-[61px] right-4 z-1001 h-8 w-8',
                        !hasToc && 'hidden',
                    )}
                >
                    {isRightSidebarOpen ? <PanelRight /> : <PanelLeft />}
                </Button>
            )}

            <div className="flex flex-1">
                {/* Left Sidebar */}
                <div
                    className={cn(
                        'fixed  top-[61px] bottom-0 left-0 z-1000 hidden md:block transition-transform duration-300 ease-in-out',
                        {
                            'translate-x-0': isSidebarOpen,
                            '-translate-x-full': !isSidebarOpen,
                        },
                    )}
                >
                    <ResizableBox
                        width={sidebarWidth}
                        onResize={(_e, { size }) => setSidebarWidth(size.width)}
                        minConstraints={[250, Infinity]}
                        maxConstraints={[450, Infinity]}
                        axis="x"
                        resizeHandles={['e']}
                        className="h-full"
                    >
                        <aside className="supports-backdrop-blur:bg-background/90 custom-scrollbar h-full w-full overflow-y-auto border-r bg-white/5 p-4 backdrop-blur-lg">
                            <LinksSidebar />
                        </aside>
                    </ResizableBox>
                </div>

                <main className="flex w-full flex-1 flex-col">
                    <div className={cn('mx-auto w-full flex-1 p-4', maxWidth)}>
                        {children}
                    </div>
                    <Footer />
                </main>

                {/* Right Sidebar */}
                <aside
                    id="table-of-contents-wrapper"
                    className={cn(
                        '!fixed  top-[61px] bottom-0 right-0 z-1000 hidden h-full w-64 shrink-0 overflow-y-auto border-l bg-white/5 p-4 backdrop-blur-lg supports-backdrop-blur:bg-background/90 lg:block transition-transform duration-300 ease-in-out',
                        {
                            'translate-x-0': isRightSidebarOpen,
                            'translate-x-full': !isRightSidebarOpen,
                        },
                        !hasToc && 'hidden',
                    )}
                >
                    <TableOfContents />
                </aside>
            </div>
        </div>
    );
};
