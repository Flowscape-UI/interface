import * as React from 'react';
import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router';
import { Meta } from '../components/meta';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : React.lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const pathname = useRouterState({ select: (s) => s.location.pathname });

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
        <>
            <Meta />
            <Outlet />
            {/* <TanStackRouterDevtools /> */}
        </>
    );
}
