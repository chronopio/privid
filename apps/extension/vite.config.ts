import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                popup: 'popup/popup.ts'
            },
            output: {
                entryFileNames: '[name].js'
            }
        },
        outDir: 'dist',
        emptyOutDir: true
    }
});
