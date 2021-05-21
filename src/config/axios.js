import axios from 'axios'
import { removeItem } from '@/config/utils'
import router from '@/router'

export const HTTP = axios.create({
  baseURL: `https://realestate.bdata.asia/`
})

HTTP.interceptors.response.use(
  (response) => {
    if (response.data.is_expire && response.data.is_expire == true) {
      removeItem('user')
      router.push({ path: '/login', name: 'login' })
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
