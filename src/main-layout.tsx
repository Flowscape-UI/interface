import { type PropsWithChildren, useState, useEffect } from 'react';
import { ResizableBox } from 'react-resizable';
import { Header } from './components/header';
import LinksSidebar from './components/links-sidebar';
import TableOfContents from './components/table-of-contents';
import Footer from './components/footer';

export const MainLayout = ({ children }: PropsWithChildren<unknown>) => {
    const [sidebarWidth, setSidebarWidth] = useState(250);
    const [mainStyles, setMainStyles] = useState({});

    useEffect(() => {
        const updateMargins = () => {
            const styles = {
                marginLeft: '0px',
                marginRight: '0px',
            };
            if (window.innerWidth >= 1024) { // lg
                styles.marginLeft = `${sidebarWidth}px`;
                styles.marginRight = '256px'; // 16rem
            } else if (window.innerWidth >= 768) { // md
                styles.marginLeft = `${sidebarWidth}px`;
            }
            setMainStyles(styles);
        };

        updateMargins();
        window.addEventListener('resize', updateMargins);

        return () => window.removeEventListener('resize', updateMargins);
    }, [sidebarWidth]);

    return (
        <div className="mx-auto flex min-h-screen w-full flex-col">
            <Header />
            <div className="flex flex-1">
                {/* Left Sidebar */}
                <ResizableBox
                    width={sidebarWidth}
                    onResize={(_e, { size }) => setSidebarWidth(size.width)}
                    minConstraints={[250, Infinity]}
                    maxConstraints={[450, Infinity]}
                    axis="x"
                    resizeHandles={['e']}
                    className="!fixed top-[53px] bottom-0 left-0 z-1000 hidden md:block"
                >
                    <aside
                        className="supports-backdrop-blur:bg-background/90 custom-scrollbar h-full w-full overflow-y-auto border-r bg-white/5 p-4 backdrop-blur-lg"
                    >
                        <LinksSidebar />
                    </aside>
                </ResizableBox>

                {/* Main Content (Scrollable) */}
                <main className="flex flex-1 flex-col" style={mainStyles}>
                    <div className="mx-auto w-full max-w-3xl flex-1 p-4">
                        {children}
                    </div>
                    <Footer />
                </main>

                {/* Right Sidebar */}
                <aside
                    id="table-of-contents-wrapper"
                    className="!fixed top-[53px] bottom-0 right-0 z-1000 supports-backdrop-blur:bg-background/90 custom-scrollbar hidden h-full w-64 shrink-0 overflow-y-auto border-l bg-white/5 p-4 backdrop-blur-lg lg:block"
                >
                    <TableOfContents />
                </aside>
            </div>
        </div>
    );
};
