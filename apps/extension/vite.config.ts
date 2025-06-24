import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                background: 'background.ts',
                content: 'content.ts',
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
