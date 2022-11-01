import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    eslintPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      workbox: {
        sourcemap: true,
      },
      manifest: {
        name: 'cnotv news',
        short_name: 'cnotv-news',
        description: 'cnotv news description',
        theme_color: '#333',
        icons: [
          {
            src: 'logo.svg',
            sizes: '192x192',
            type: 'image/svg',
          },
          {
            src: 'logo.svg',
            sizes: '512x512',
            type: 'image/svg',
          },
        ],
      },
    }),
  ],
  define: {
    'process.env': process.env,
  },
  build: {
    base: './',
  },
})
