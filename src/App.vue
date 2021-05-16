<template>
  <component :is="layout"></component>
</template>

<script>
export default {
  computed: {
    layout() {
      return this.$route.meta.layout || 'default'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Anuphan', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
