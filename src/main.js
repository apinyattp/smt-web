import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/css/index.css'
import components from './plugins/components'

const app = createApp(App)

app.use(store).use(router).use(components).mount('#app')
