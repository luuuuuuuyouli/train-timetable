import { defineConfig, ConfigEnv } from 'vite';

import vue from '@vitejs/plugin-vue';

import { resolve } from 'path'

// 当前执行node命令时文件夹的地址（工作目录）
const root = process.cwd()
// 路径查找
function pathResolve(dir: string) {
  return resolve(root, '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ command }: ConfigEnv) => {
  return {
    base: '/train-timetable/',
    plugins: [
      vue(),
    ],
    resolve: {
      alias: [
        {
          find: /\@\//,
          replacement: `${pathResolve('src')}/`
        }
      ]
    },
    css: {
      // css预处理器
      preprocessorOptions: {

      }
    },
    build: {
      terserOptions: {
        compress: {
          drop_console: true
        }
      },
      outDir: 'dist', //指定输出路径
      assetsDir: 'assets' //指定生成静态资源的存放路径
    }
  };
});
