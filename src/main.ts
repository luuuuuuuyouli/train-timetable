import { createApp } from 'vue'

// 引入element-plus
import { setupElementPlus } from './plugins/elementPlus'

import 'element-plus/dist/index.css'
// 引入全局样式
import '@/styles/index.less'

import App from './App.vue'

// 创建实例
const setupAll = async () => {
    const app = createApp(App)

    setupElementPlus(app)

    app.mount('#app')
}

setupAll()

