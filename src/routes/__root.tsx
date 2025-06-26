import * as React from 'react';
import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router';
import { Meta } from '../components/meta';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const pathname = useRouterState({ select: (s: { location: { pathname: string } }) => s.location.pathname });

    React.useEffect(() => {
        const formatPathToTitle = (path: string) => {
            if (path === '/') {
                return 'Flowscape – Modular UI / UX Library';
            }

            const pathParts = path.split('/').filter(Boolean);
            const lastPart = pathParts[pathParts.length - 1] || '';

            const formattedTitle = lastPart
                .split('-')
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            return `${formattedTitle} | Flowscape`;
        };

        const title = formatPathToTitle(pathname);
        if (document.title !== title) {
            document.title = title;
        }
    }, [pathname]);

    return (
        <QueryClientProvider client={queryClient}>
            <Meta />
            <Outlet />
            {/* <TanStackRouterDevtools /> */}
        </QueryClientProvider>
    );
}
