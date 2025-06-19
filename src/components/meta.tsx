import { Helmet } from 'react-helmet-async';

interface MetaProps {
    description?: string;
}

const defaultDescription =
    'Flowscape is a modern, component-on-demand library that blends fluid UI with seamless UX. Install only the blocks you need – buttons, auth panels, interactive backgrounds, dashboard widgets, loaders and more.';

export const Meta = ({ description }: MetaProps) => (
    <Helmet>
        <meta name="description" content={description || defaultDescription} />
        <meta
            name="keywords"
            content="Flowscape, UI library, UX components, React UI kit, Tailwind components, Lottie buttons, Framer Motion, modular design, dashboard blocks, interactive backgrounds"
        />
        <meta name="author" content="Flowscape Team" />
        <link rel="author" href="https://flowscape.dev" />
        <meta name="creator" content="Flowscape" />
        <meta name="publisher" content="Flowscape" />
        <meta name="theme-color" content="#4facfe" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        {/* Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/brand/apple-touch-icon.png" />

        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flowscape.dev" />
        <meta property="og:title" content="Flowscape – Modular UI / UX Library" />
        <meta
            property="og:description"
            content="Install only the UI blocks you need and craft stunning experiences with fluid motion, Lottie icons and Tailwind simplicity."
        />
        <meta property="og:image" content="/brand/og-logo.png" />
        <meta property="og:image:width" content="630" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Flowscape gradient logo on dark background" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@flowscape_ui" />
        <meta name="twitter:creator" content="@flowscape_ui" />
        <meta name="twitter:title" content="Flowscape – Modular UI / UX Library" />
        <meta
            name="twitter:description"
            content="Fluid UI meets seamless UX. Import only what you need: buttons, auth panels, interactive backgrounds and more."
        />
        <meta name="twitter:image" content="/brand/og-logo.png" />
    </Helmet>
);
