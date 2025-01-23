import { defineConfig } from 'vitest/config';import svgr from "vite-plugin-svgr";


export default defineConfig({  plugins: [
  svgr({svgrOptions: {
    icon: true,
  },}),
],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
  },
});
