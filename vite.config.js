import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [viteSingleFile()],
  build: {
    assetsInlineLimit: 100000000, // Make sure all assets are inlined
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
  }
});
