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
            @click="onFacebookLogin"
          >
            Log in with Facebook
          </button>
          <button class="btn-primary py-4 rounded-full" @click="onGoogleLogin">
            Log in with Google
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onFacebookLogin() {},
    onGoogleLogin() {}
  }
}
</script>

<style lang="scss" scoped></style>
