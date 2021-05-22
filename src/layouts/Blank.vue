<template>
  <div
    class="bg-gradient-to-r from-gray-300 to-dark-700 h-screen overflow-auto"
  >
    <div>
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
