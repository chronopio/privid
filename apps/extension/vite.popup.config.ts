import { defineConfig } from 'vite';
import { resolve } from 'path';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
    plugins: [wasm(), topLevelAwait()],
    build: {
        rollupOptions: {
            input: {
                popup: resolve(__dirname, 'popup/popup.ts'),
                holonymCallback: resolve(
                    __dirname,
                    'popup/holonym/holonym-callback.ts'
                )
            },
            output: {
                entryFileNames: (chunkInfo) => {
                    if (chunkInfo.name === 'holonymCallback') {
                        return 'popup/holonym/holonym-callback.js';
                    }
                    return 'popup/[name].js';
                }
            }
        },
        outDir: './dist',
        emptyOutDir: true
    }
});
