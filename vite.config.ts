import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        sourcemap: true
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
            type: 'image/svg'
          },
          {
            src: 'logo.svg',
            sizes: '512x512',
            type: 'image/svg'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
  // define: {
  //   'process.env': process.env,
  // },
  // build: {
  //   base: './',
  // },
})
