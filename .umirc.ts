import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'yf-hooks',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config,
  styles: ['http://unpkg.com/antd/dist/antd.min.css'],
  exportStatic: {},
  publicPath: process.env.NODE_ENV === 'production' ? '/yf-hooks/' : '/',
  hash: true,
  history: {
    type: 'hash',
  },
});
