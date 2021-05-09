import VueFeather from 'vue-feather'
import Card from '@/components/Card.vue'

import DefaultLayout from '../layouts/Default.vue'
import BlankLayout from '../layouts/Blank.vue'

export default {
  install: (app) => {
    app.component('VueFeather', VueFeather)
    app.component('Card', Card)

    app.component('Default', DefaultLayout)
    app.component('Blank', BlankLayout)
  }
}
