import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/css/index.css'
import Card from '@/components/Card.vue'
import VueFeather from 'vue-feather'
// import VueFeather from '@/components/Feather.vue'

const app = createApp(App)

app.component('VueFeather', VueFeather)
app.component('Card', Card)

app.use(store).use(router).mount('#app')
