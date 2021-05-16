import { createStore } from 'vuex'
import { setStore, getStore } from '@/config/utils'

const user = getStore('user')
export default createStore({
  state: {
    loginUser: user
  },
  mutations: {
    setLoginUser(state, user) {
      state.loginUser = user
      setStore('user', user)
    }
  },
  actions: {},
  getters: {
    getLoginUserInfo(state) {
      return state.loginUser
    }
  },
  modules: {}
})

