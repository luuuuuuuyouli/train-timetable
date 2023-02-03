import { createApp } from 'vue'
import './style.css'

// 引入element-plus
import { setupElementPlus } from './plugins/elementPlus'

import App from './App.vue'

// 创建实例
const setupAll = async () => {
    const app = createApp(App)

    setupElementPlus(app)

    app.mount('#app')
}

setupAll()

