<template>
  <div class="flex h-screen">
    <div class="bg-dark-500 h-full w-1/3"></div>
    <div class="flex items-center justify-center bg-gray-700 h-full w-2/3">
      <div class="w-1/3">
        <img
          class="w-full max-w-80 max-h-80"
          src="/img/sherman-tree.svg"
          alt="Sherman Tree Logo"
        />
        <div class="flex flex-col space-y-6 mt-14">
          <button
            class="btn-primary py-4 rounded-full"
            @click.prevent="onFacebookLogin"
          >
            Log in with Facebook
          </button>
          <button
            class="btn-primary py-4 rounded-full"
            @click.prevent="onGoogleLogin"
          >
            Log in with Google
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { initFbsdk } from '@/config/facebook_oAuth.js'
import router from '@/router'
import { HTTP } from '@/config/axios.js'
export default {
  name: 'SocialLogin',
  mounted() {
    initFbsdk()
  },
  methods: {
    onFacebookLogin() {
      window.FB.login((FacebookUser) => {
        this.checkUser(FacebookUser.authResponse.accessToken, 'facebook')
      }, this.params)
    },
    onGoogleLogin() {
      this.$gAuth
        .signIn()
        .then((GoogleUser) => {
          this.checkUser(GoogleUser.getAuthResponse().id_token, '')
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    checkUser(token, type) {
      HTTP.post('user/checkUser', {
        token: token,
        type: type
      }).then((response) => {
        this.$store.commit('setLoginUser', {token: response.data.token})
        router.push('/listing')
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
