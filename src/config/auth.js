import { removeItem } from '@/config/utils.js'
export default {
    data: () => ({
      mySharedDataProperty: null
    }),
    methods: {
        onLogout(close) {
            removeItem('user')
            this.$router.push({ path: '/login', name: 'login' })
            close()
        }
    }
}