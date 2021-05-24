import { removeItem } from '@/config/utils.js'
export default {
    data: () => ({
      mySharedDataProperty: null
    }),
    methods: {
        onLogout(close) {
            removeItem('user')
            window.location = '/login'
            close()
        }
    }
}