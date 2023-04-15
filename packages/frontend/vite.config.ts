import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import viteCompression from 'vite-plugin-compression';
import Inspect from 'vite-plugin-inspect';

import svgLoader from 'vite-svg-loader';
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    Components({
      resolvers: [
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        ElementPlusResolver(),
      ],
    }),
    svgLoader(),
    Icons({
      autoInstall: true,
    }),
    viteCompression({
      threshold: 1024000, // 大于1m压缩
    }),
    Inspect(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      // "@components": resolve(__dirname, 'src/components')
    },
  },
  envDir: 'src/config',
  server: {
    port: 5173,
    cors: true,
    proxy: {
      '/v2': {
        target: 'http://0.0.0.0:8888/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 不可以省略rewrite
      },
    },
  },
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
});
