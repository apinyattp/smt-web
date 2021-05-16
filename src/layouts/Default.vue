<template>
  <div class="flex">
    <div class="w-1/6">
      <sidebar />
    </div>
    <div
      class="w-5/6 bg-gradient-to-r from-gray-300 to-dark-700 h-screen overflow-auto"
    >
      <div class="py-12 px-16">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'

export default {
  components: {
    Sidebar
  }
}
</script>

<style lang="scss" scoped></style>
