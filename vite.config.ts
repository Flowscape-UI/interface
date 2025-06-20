import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tsconfigPaths(),
        tanstackRouter({
            target: 'react',
            autoCodeSplitting: true,
        }),
        react(),
    ],
});
