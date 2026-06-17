import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/apple-touch-icon.png'],
      workbox: {
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024, // 4 MiB — corpus growth
        // Make a freshly deployed build take over immediately instead of
        // waiting for every tab to close — this is what stops users (and us)
        // from being stuck on a stale cached version after a deploy.
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
      },
      manifest: {
        name: 'Imam Ali',
        short_name: 'Imam Ali',
        // v44 §73.3 — confirmed primary product description for all
        // external materials (App Store, social media, etc). Superseded
        // the v23 §41 + v24 §47 "spiritual companion guided by" wording.
        description:
          "An AI scholar guided by the authenticated wisdom of Imam Ali ibn Abi Talib (عليه السلام).",
        theme_color: '#0c1a3a',
        background_color: '#0c1a3a',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: '/icons/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})
