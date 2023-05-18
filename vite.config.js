import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { configs } from './configs/config'
import { resolve } from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      /**
       * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
       * @default src/main.js
       */
      entry: '/src/main.js',
      /**
       * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
       * @default index.html
       */
      template: '/index.html',
      /**
       * 需要注入 index.html ejs 模版的数据
       */
      inject: {
        data: {
          title: configs.title,
        },
      },
    })
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, '.'),
      '@': resolve(__dirname, './src'),
      '@configs': resolve(__dirname, './configs')
    }
  },
  server: {
    port: 8090,
    proxy: {
      '/api': {
        target: configs.baseUrl, // 代理地址
        changeOrigin: true, // 开启代理
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
