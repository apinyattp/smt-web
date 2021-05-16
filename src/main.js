import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/css/index.css'
import '@/assets/scss/sweetalert2.scss'
import components from './plugins/components'
import VueSweetalert2 from 'vue-sweetalert2'

const swalOptions = {
  confirmButtonColor: '#ffffff',
  cancelButtonColor: '#786A57'
}

const app = createApp(App)

app
  .use(store)
  .use(router)
  .use(components)
  .use(VueSweetalert2, swalOptions)
  .mount('#app')
