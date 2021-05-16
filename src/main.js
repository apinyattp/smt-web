import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/css/index.css'
import '@/assets/scss/sweetalert2.scss'
import components from './plugins/components'
import VueSweetalert2 from 'vue-sweetalert2'
import VueAxios from 'vue-axios'
import axios from 'axios'
import GoogleAuth from '@/config/google_oAuth.js'

const gauthOption = {
  clientId:
    '1084352610940-ok9naiimejuu2eufpuldtg0icvdt1a58.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: ''
}

const swalOptions = {
  confirmButtonColor: '#ffffff',
  cancelButtonColor: '#786A57'
}

const app = createApp(App)
// app.config.globalProperties.$http = () => {}
app.config.productionTip = false

app
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(components)
  .use(GoogleAuth, gauthOption)
  .use(VueSweetalert2, swalOptions)
  .mount('#app')
